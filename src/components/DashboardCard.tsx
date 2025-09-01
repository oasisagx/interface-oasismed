import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  change?: number;
  sparklineData?: number[];
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  trend, 
  change, 
  sparklineData,
  className 
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-8 h-8 text-oasis-blue" />;
      case 'down':
        return <TrendingDown className="w-8 h-8 text-red-500" />;
      default:
        return <Minus className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-oasis-blue';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn("bg-card rounded-xl shadow-oasis border border-border p-6 hover-lift transition-all", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </h3>
        <div className="icon-container bg-transparent">
          {getTrendIcon()}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <p className={cn("text-sm font-medium mt-1", getTrendColor())}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        
        {sparklineData && (
          <div className="w-20 h-10 flex items-end space-x-1">
            {sparklineData.map((value, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-300 hover-lift"
                style={{ 
                  height: `${(value / Math.max(...sparklineData)) * 100}%`,
                  backgroundColor: trend === 'up' ? 'rgb(91, 154, 225)' : trend === 'down' ? 'rgb(239, 68, 68)' : 'rgb(156, 163, 175)'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
