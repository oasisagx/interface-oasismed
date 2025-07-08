import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, BarChart3, FileText, Search, Database, ChevronLeft } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: '/', label: 'MedChat', icon: MessageCircle },
    { to: '/cliniview', label: 'Cliniview', icon: BarChart3 },
    { to: '/promptmd', label: 'PromptMD', icon: FileText },
    { to: '/conhecimento', label: 'Conhecimento', icon: Database },
    { to: '/search', label: 'Busca', icon: Search },
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-48'} bg-slate-50 flex flex-col transition-all duration-300 ease-in-out relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10 group"
      >
        <ChevronLeft className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-all duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-2 pt-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center ${
                isCollapsed ? 'justify-center px-2' : 'px-3'
              } py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`
            }
          >
            <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-200`} />
            {!isCollapsed && (
              <span className="ml-3 transition-all duration-200 opacity-100">
                {item.label}
              </span>
            )}
            
            {/* Tooltip para modo colapsado */}
            {isCollapsed && (
              <div className="absolute left-16 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;