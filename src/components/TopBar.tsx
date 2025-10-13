import React from 'react';
import { Settings, User, Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationPanel from './NotificationPanel';

const TopBar: React.FC = () => {
  const { isOpen, toggle, unreadCount } = useNotifications();

  return (
    <div className="h-14 px-6 flex items-center justify-between bg-slate-50 relative">
      {/* Logo OASIS + MED FIXO no canto ABSOLUTO da tela */}
      <div className="fixed top-0 left-0 flex items-center z-50 pr-2 pb-1 pt-[19px] pl-[7px]">
        <div className="w-16 h-10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://www.oasisagx.com/images/logos/oasis-logo.svg" 
            alt="OASIS" 
            className="w-full h-auto object-contain max-h-full"
          />
        </div>
        <span className="text-xs font-medium -ml-1 text-oasis-blue">MED</span>
      </div>

      {/* Right side - controls */}
      <div className="flex items-center space-x-2 ml-auto">
        <button 
          onClick={toggle}
          className="p-2.5 hover:bg-white rounded-lg transition-colors group relative"
        >
          <Bell className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
          {unreadCount > 0 && (
            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 border-2 border-slate-50"></div>
          )}
        </button>
        <button 
          className="p-2.5 hover:bg-white rounded-lg transition-colors group"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
        </button>
        
        <div className="h-6 w-px bg-slate-200"></div>
        
        <button 
          className="flex items-center space-x-2 p-2.5 hover:bg-white rounded-lg transition-colors group"
          aria-label="User profile"
        >
          <div className="w-7 h-7 bg-oasis-blue rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>

      {isOpen && <NotificationPanel onClose={toggle} />}
    </div>
  );
};

export default TopBar;
