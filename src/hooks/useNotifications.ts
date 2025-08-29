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

const initializeStore = () => {
  // Evita reinicializar se já tiver dados (ex: HMR)
  if (notificationStore.length > 0) return;

  // Simula a busca inicial do estado de leitura (ex: de um localStorage ou API)
  // Para esta demo, vamos usar um estado inicial fixo.
  notificationStore = mockNotifications.map(n => ({
    ...n,
    // Define um estado inicial de leitura. Ex: as duas primeiras não lidas.
    read: n.id === 2 || n.id === 4 
  }));
};

initializeStore();

const broadcast = () => {
  for (const listener of listeners) {
    listener(notificationStore);
  }
};

const markNotificationAsRead = (id: number) => {
  notificationStore = notificationStore.map(n =>
    n.id === id ? { ...n, read: true } : n
  );
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
