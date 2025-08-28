import { useState } from 'react';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: 'Nova consulta agendada para Maria Silva às 14:00.',
    read: false,
    timestamp: 'há 5 minutos'
  },
  {
    id: 2,
    message: 'O paciente João Santos cancelou a consulta de amanhã.',
    read: false,
    timestamp: 'há 1 hora'
  },
  {
    id: 3,
    message: 'Relatório de faturamento de Julho está pronto.',
    read: true,
    timestamp: 'ontem'
  },
  {
    id: 4,
    message: 'Lembrete: 5 consultas agendadas para hoje.',
    read: true,
    timestamp: 'ontem'
  }
];

export const useNotifications = () => {
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
