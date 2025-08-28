import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import NotificationToast from '../components/NotificationToast';
import { useNotifications, Notification } from '../hooks/useNotifications';
import { useDashboard } from '../hooks/useDashboard';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { notifications } = useNotifications();
  const { agendaHoje } = useDashboard();
  const [toasts, setToasts] = useState<Notification[]>([]);

  useEffect(() => {
    const timeouts: number[] = [];

    // Função para adicionar um toast se ele ainda não estiver sendo exibido
    const addToast = (notification: Notification | undefined) => {
      if (notification && !toasts.some(t => t.id === notification.id)) {
        const notificationCopy = { ...notification };
        // Injeta o dado dinâmico aqui
        if (notificationCopy.message.includes('{consultasAtivas}')) {
          const consultasAtivas = agendaHoje.filter(a => a.status !== 'cancelado').length;
          notificationCopy.message = notificationCopy.message.replace('{consultasAtivas}', consultasAtivas.toString());
        }
        setToasts(prev => [...prev, notificationCopy]);
      }
    };

    // Orquestração da simulação
    const notificationLembrete = notifications.find(n => n.id === 2);
    const notificationCancelamento = notifications.find(n => n.id === 3);
    const notificationAgendamento = notifications.find(n => n.id === 1);
    const notificationNovo = notifications.find(n => n.id === 4);

    timeouts.push(setTimeout(() => addToast(notificationLembrete), 3000));
    timeouts.push(setTimeout(() => addToast(notificationCancelamento), 10000));
    timeouts.push(setTimeout(() => addToast(notificationAgendamento), 18000));
    timeouts.push(setTimeout(() => addToast(notificationNovo), 25000));

    return () => {
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executa apenas uma vez ao montar o componente

  const handleCloseToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
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
      {/* Top Bar - Unified with Sidebar */}
      <TopBar />
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Content Area - OpenAI Style elevated layer */}
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
