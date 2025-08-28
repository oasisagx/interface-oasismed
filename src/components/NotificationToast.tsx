import React, { useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

type NotificationType = 'info' | 'success' | 'error';

interface NotificationToastProps {
  message: string;
  timestamp: string;
  type?: NotificationType;
  onClose: () => void;
}

const notificationConfig = {
  info: {
    icon: Bell,
    iconClass: 'text-oasis-blue',
    bgClass: 'bg-oasis-blue/10',
    barClass: 'bg-oasis-blue',
  },
  success: {
    icon: CheckCircle,
    iconClass: 'text-green-600',
    bgClass: 'bg-green-100',
    barClass: 'bg-green-500',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-red-600',
    bgClass: 'bg-red-100',
    barClass: 'bg-red-500',
  },
};

const NotificationToast: React.FC<NotificationToastProps> = ({ message, timestamp, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // O toast desaparece após 5 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  const config = notificationConfig[type];
  const Icon = config.icon;

  return (
    <div className="w-96 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden animate-slide-in-right">
      <div className="flex items-start p-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", config.bgClass)}>
          <Icon className={cn("w-5 h-5", config.iconClass)} />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-semibold text-sm text-slate-900">Nova Notificação</h4>
          <p className="text-sm text-slate-600 mt-1">{message}</p>
          <p className="text-xs text-slate-500 mt-1">{timestamp}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full ml-4 flex-shrink-0">
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-200">
        <div className={cn("h-1 animate-progress", config.barClass)}></div>
      </div>
    </div>
  );
};

export default NotificationToast;
