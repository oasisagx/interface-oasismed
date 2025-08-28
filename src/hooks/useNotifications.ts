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
    message: 'O paciente Daniel Souza agendou o retorno para o dia 12/11/2025 às 10:00.',
    read: false,
    timestamp: '12/11/2025 09:30'
  },
  {
    id: 3,
    message: 'O paciente João Santos cancelou a consulta do dia 10/11/2025 às 14:30.',
    read: false,
    timestamp: '10/11/2025 08:15'
  },
  {
    id: 2,
    message: 'Lembrete: 5 consultas agendadas para hoje.',
    read: true,
    timestamp: '28/08/2025 17:00'
  },
  {
    id: 4,
    message: 'Nova Primeira Consulta agendada para Maria Silva no dia 15/11/2025 às 14:00.',
    read: false,
    timestamp: '15/11/2025 11:20'
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
