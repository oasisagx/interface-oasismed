import React from 'react';
import { Clock, TrendingUp, type LucideIcon as LucideIconType } from 'lucide-react';

interface SubHeaderStat {
  label: string;
  value: string;
  trend?: string;
  icon?: LucideIconType;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
}

interface SubHeaderProps {
  title: string;
  description: string;
  version?: string;
  status?: {
    label: string;
    type: 'online' | 'updating' | 'offline';
  };
  stats?: SubHeaderStat[];
  actions?: React.ReactNode;
  className?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  description,
  version,
  status,
  stats = [],
  actions,
  className = ''
}) => {
  const getStatusColor = (type: string) => {
    switch (type) {
      case 'online':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30';
      case 'updating':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30';
      case 'offline':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIndicator = (type: string) => {
    switch (type) {
      case 'online':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />;
      case 'updating':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />;
      case 'offline':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return null;
    }
  };

  const getStatColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-gradient-to-r from-oasis-blue-light to-oasis-blue-5 border-oasis-blue/20 text-oasis-blue';
      case 'green':
        return 'bg-gradient-to-r from-green-50 to-emerald-25 border-green-200 text-green-600 dark:from-green-900/20 dark:to-emerald-800/10 dark:border-green-800/30 dark:text-green-400';
      case 'yellow':
        return 'bg-gradient-to-r from-yellow-50 to-orange-25 border-yellow-200 text-yellow-600 dark:from-yellow-900/20 dark:to-orange-800/10 dark:border-yellow-800/30 dark:text-yellow-400';
      case 'red':
        return 'bg-gradient-to-r from-red-50 to-pink-25 border-red-200 text-red-600 dark:from-red-900/20 dark:to-pink-800/10 dark:border-red-800/30 dark:text-red-400';
      case 'purple':
        return 'bg-gradient-to-r from-purple-50 to-violet-25 border-purple-200 text-purple-600 dark:from-purple-900/20 dark:to-violet-800/10 dark:border-purple-800/30 dark:text-purple-400';
      default:
        return 'bg-background border-border text-muted-foreground hover:border-oasis-blue hover:text-oasis-blue';
    }
  };

  return (
    <div className={`bg-gradient-to-r from-background to-muted/30 border-b border-border ${className}`}>
      {/* Main Header */}
      <div className="px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h2 className="text-xl font-bold text-foreground">{title}</h2>
                  {version && (
                    <span className="px-2 py-1 text-xs bg-oasis-blue-light text-oasis-blue rounded-md font-medium border border-oasis-blue/20">
                      v{version}
                    </span>
                  )}
                  {status && (
                    <div className={`flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(status.type)}`}>
                      {getStatusIndicator(status.type)}
                      <span>{status.label}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-medium">{description}</p>
              </div>
            </div>
            {actions && (
              <div className="flex items-center space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {stats.length > 0 && (
        <div className="px-8 py-4 bg-muted/20 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all hover-lift ${getStatColor(stat.color)}`}
                >
                  {stat.icon && <stat.icon className="w-4 h-4 flex-shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate opacity-75">{stat.label}</p>
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-bold truncate">{stat.value}</p>
                      {stat.trend && (
                        <span className="text-xs font-medium flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                          {stat.trend}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Timestamp */}
      <div className="px-8 py-2 bg-muted/10 border-t border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Atualizado em {new Date().toLocaleTimeString('pt-BR')}</span>
            </div>
          </div>
          <div>
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'short', 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;