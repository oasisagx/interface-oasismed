import { useState, useMemo, useEffect } from 'react';
import { useDashboard } from './useDashboard';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  timestamp: string;
}

const mockNotifications: Omit<Notification, 'read'>[] = [
  {
    id: 1, // Daniel Souza
    message: 'Retorno de Daniel Souza confirmado para o dia 12/11 às 09h30.',
    timestamp: 'há 5 minutos'
  },
  {
    id: 3, // João Santos
    message: 'A consulta de João Santos do dia 10/11 às 08h15 foi cancelada.',
    timestamp: 'há 1 hora'
  },
  {
    id: 2, // Lembrete
    message: 'Lembrete: Você tem {consultasAtivas} consultas ativas para hoje.', // Placeholder
    timestamp: 'há 5 horas'
  },
  {
    id: 4, // Maria Silva
    message: 'Primeira consulta de Maria Silva confirmada para 15/11 às 11h20.',
    timestamp: 'ontem'
  }
];

// --- Store de Notificações Persistente (Singleton) ---
let notificationStore: Notification[] = [];
let listeners: React.Dispatch<React.SetStateAction<Notification[]>>[] = [];

const STORAGE_KEY = 'read_notifications_v2';

const getReadIdsFromStorage = (): number[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse read notifications from localStorage", error);
    return [];
  }
};

const setReadIdsInStorage = (ids: number[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Failed to save read notifications to localStorage", error);
  }
};

const initializeStore = () => {
  if (notificationStore.length > 0) return;

  let readIds = getReadIdsFromStorage();

  // Se não houver nada no storage, define um estado inicial e salva.
  if (readIds.length === 0) {
    const initialReadIds = mockNotifications
      .filter(n => n.id === 2 || n.id === 3 || n.id === 4)
      .map(n => n.id);
    setReadIdsInStorage(initialReadIds);
    readIds = initialReadIds;
  }

  const readIdSet = new Set(readIds);
  notificationStore = mockNotifications.map(n => ({
    ...n,
    read: readIdSet.has(n.id)
  }));
};

initializeStore();

const broadcast = () => {
  for (const listener of listeners) {
    listener(notificationStore);
  }
};

const markNotificationAsRead = (id: number) => {
  const alreadyRead = notificationStore.find(n => n.id === id)?.read;
  if (alreadyRead) return;

  notificationStore = notificationStore.map(n =>
    n.id === id ? { ...n, read: true } : n
  );
  
  const currentReadIds = getReadIdsFromStorage();
  if (!currentReadIds.includes(id)) {
    setReadIdsInStorage([...currentReadIds, id]);
  }

  broadcast();
};
// --- Fim do Store ---


export const useNotifications = () => {
  const { agendaHoje } = useDashboard();
  const [notifications, setNotifications] = useState(notificationStore);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    listeners.push(setNotifications);
    return () => {
      listeners = listeners.filter(l => l !== setNotifications);
    };
  }, []);

  const processedNotifications = useMemo(() => {
    const consultasAtivas = agendaHoje.filter(a => a.status !== 'cancelado').length;
    return notifications.map(notification => {
      if (notification.message.includes('{consultasAtivas}')) {
        return {
          ...notification,
          message: notification.message.replace('{consultasAtivas}', consultasAtivas.toString()),
        };
      }
      return notification;
    });
  }, [notifications, agendaHoje]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggle = () => setIsOpen(!isOpen);

  const markAsRead = (id: number) => {
    markNotificationAsRead(id);
  };

  return {
    notifications: processedNotifications,
    isOpen,
    unreadCount,
    toggle,
    markAsRead,
  };
};
