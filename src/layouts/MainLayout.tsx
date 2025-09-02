import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import NotificationToast from '../components/NotificationToast';
import { useNotifications, Notification } from '../hooks/useNotifications';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { notifications } = useNotifications();
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [shownToastIds, setShownToastIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read);
    let delay = 0;

    unreadNotifications.forEach(notification => {
      if (!shownToastIds.has(notification.id)) {
        // Adiciona um delay para cada nova notificação, para parecer mais real
        setTimeout(() => {
          setToasts(prev => {
            if (prev.some(t => t.id === notification.id)) {
              return prev;
            }
            return [...prev, notification];
          });
        }, delay);
        
        delay += 1000; // Aumenta o delay para a próxima notificação

        setShownToastIds(prev => new Set(prev).add(notification.id));
      }
    });
    
  }, [notifications, shownToastIds]);

  const handleCloseToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    // A notificação NÃO é marcada como lida ao fechar o toast,
    // conforme a nova diretriz. O usuário deve fazer isso no painel.
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <div className="fixed top-6 right-6 z-50 space-y-2">
        {toasts.map(toast => (
          <NotificationToast 
            key={toast.id}
            message={toast.message} 
            timestamp={toast.timestamp}
            onClose={() => handleCloseToast(toast.id)} 
          />
        ))}
      </div>
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 p-2">
          <main className="h-full overflow-auto bg-white rounded-lg border border-slate-200/60 shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
