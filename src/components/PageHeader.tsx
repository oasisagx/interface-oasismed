import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="bg-card px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="icon-container">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground font-medium">{description}</p>
            </div>
          </div>
          {children && (
            <div className="flex items-center space-x-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;