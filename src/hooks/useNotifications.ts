import { useState, useMemo } from 'react';
import { useDashboard } from './useDashboard';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1, // Daniel Souza
    message: 'Retorno de Daniel Souza confirmado para o dia 12/11 às 09h30.',
    read: false,
    timestamp: 'há 5 minutos'
  },
  {
    id: 3, // João Santos
    message: 'A consulta de João Santos do dia 10/11 às 08h15 foi cancelada.',
    read: false,
    timestamp: 'há 1 hora'
  },
  {
    id: 2, // Lembrete
    message: 'Lembrete: Você tem {consultasAtivas} consultas ativas para hoje.', // Placeholder
    read: true,
    timestamp: 'há 5 horas'
  },
  {
    id: 4, // Maria Silva
    message: 'Primeira consulta de Maria Silva confirmada para 15/11 às 11h20.',
    read: true,
    timestamp: 'ontem'
  }
];

export const useNotifications = () => {
  const { agendaHoje } = useDashboard();

  const processedNotifications = useMemo(() => {
    const consultasAtivas = agendaHoje.filter(a => a.status !== 'cancelado').length;
    return mockNotifications.map(notification => {
      if (notification.message.includes('{consultasAtivas}')) {
        return {
          ...notification,
          message: notification.message.replace('{consultasAtivas}', consultasAtivas.toString()),
        };
      }
      return notification;
    });
  }, [agendaHoje]);

  const [notifications, setNotifications] = useState<Notification[]>(processedNotifications);
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
