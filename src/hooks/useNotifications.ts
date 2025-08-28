import { useState } from 'react';
import { useDashboard } from './useDashboard'; // Importar para ter acesso à agenda

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  timestamp: string;
}

const baseNotifications: Omit<Notification, 'message'>[] = [
  {
    id: 1, // Daniel Souza
    read: false,
    timestamp: 'há 5 minutos'
  },
  {
    id: 3, // João Santos
    read: false,
    timestamp: 'há 1 hora'
  },
  {
    id: 2, // Lembrete
    read: true,
    timestamp: 'às 17:00'
  },
  {
    id: 4, // Maria Silva
    read: false,
    timestamp: 'ontem'
  }
];

export const useNotifications = () => {
  const { agendaHoje } = useDashboard();
  
  const consultasAtivas = agendaHoje.filter(a => a.status !== 'cancelado').length;

  const mockNotifications: Notification[] = baseNotifications.map(n => {
    if (n.id === 1) {
      return { ...n, message: 'Retorno de Daniel Souza confirmado para o dia 12/11 às 09h30.' };
    }
    if (n.id === 3) {
      return { ...n, message: 'A consulta de João Santos do dia 10/11 às 08h15 foi cancelada.' };
    }
    if (n.id === 2) {
      return { ...n, message: `Lembrete: Você tem ${consultasAtivas} consultas ativas para hoje.` };
    }
    if (n.id === 4) {
      return { ...n, message: 'Primeira consulta de Maria Silva confirmada para 15/11 às 11h20.' };
    }
    return { ...n, message: '' }; // Fallback
  });

  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggle = () => setIsOpen(!isOpen);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return {
    notifications,
    isOpen,
    unreadCount,
    toggle,
    markAsRead,
  };
};
