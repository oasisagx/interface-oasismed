import { useState } from 'react';

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
    timestamp: 'às 17:00'
  },
  {
    id: 4, // Maria Silva
    message: 'Primeira consulta de Maria Silva confirmada para 15/11 às 11h20.',
    read: false,
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
