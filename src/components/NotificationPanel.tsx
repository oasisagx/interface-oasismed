import React from 'react';
import { useNotifications, Notification } from '../hooks/useNotifications';
import { Check, X } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="absolute top-14 right-6 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
      <div className="flex items-center justify-between p-3 border-b border-slate-100">
        <h3 className="font-semibold text-sm text-slate-800">Notificações</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b border-slate-100 ${!notification.read ? 'bg-blue-50' : ''}`}
          >
            <p className="text-sm text-slate-700 mb-1">{notification.message}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{notification.timestamp}</span>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Marcar como lida
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 text-center border-t border-slate-100">
        <button className="text-sm text-blue-600 hover:underline">
          Ver todas as notificações
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
