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
  const [closedToastIds, setClosedToastIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Encontra a notificação mais recente que não foi lida E ainda não foi fechada.
    const latestUnreadToast = notifications.find(
      n => !n.read && !closedToastIds.has(n.id)
    );

    if (latestUnreadToast) {
      // Garante que apenas um toast seja exibido por vez.
      setToasts(prev => {
        if (prev.some(t => t.id === latestUnreadToast.id)) {
          return prev;
        }
        return [latestUnreadToast];
      });
    } else {
      // Limpa os toasts se não houver nenhum novo para mostrar.
      setToasts([]);
    }
  }, [notifications, closedToastIds]);

  const handleCloseToast = (id: number) => {
    // Remove o toast da tela
    setToasts(prev => prev.filter(t => t.id !== id));
    // Adiciona o ID à lista de "fechados" para não reaparecer
    setClosedToastIds(prev => new Set(prev).add(id));
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
