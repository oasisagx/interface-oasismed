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
    id: 1,
    read: false,
    timestamp: '12/11/2025 09:30'
  },
  {
    id: 3,
    read: false,
    timestamp: '10/11/2025 08:15'
  },
  {
    id: 2,
    read: true,
    timestamp: '28/08/2025 17:00'
  },
  {
    id: 4,
    read: false,
    timestamp: '15/11/2025 11:20'
  }
];

export const useNotifications = () => {
  const { agendaHoje } = useDashboard();
  
  const consultasAtivas = agendaHoje.filter(a => a.status !== 'cancelado').length;

  const mockNotifications: Notification[] = baseNotifications.map(n => {
    if (n.id === 1) {
      return { ...n, message: 'Retorno de Daniel Souza confirmado para o dia 12/11.' };
    }
    if (n.id === 3) {
      return { ...n, message: 'Cancelamento: A consulta de João Santos do dia 10/11 foi cancelada.' };
    }
    if (n.id === 2) {
      return { ...n, message: `Lembrete: Você tem ${consultasAtivas} consultas ativas para hoje.` };
    }
    if (n.id === 4) {
      return { ...n, message: 'Primeira consulta de Maria Silva confirmada para 15/11.' };
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
