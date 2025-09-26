import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { cn } from '../lib/utils';
import { LucideProps } from 'lucide-react';

interface AssistantCardProps {
  title: string;
  description: string;
  status: 'active' | 'coming-soon';
  icon: React.ComponentType<LucideProps>;
  onClick?: () => void;
}

const AssistantCard: React.FC<AssistantCardProps> = ({ title, description, status, icon: Icon, onClick }) => {
  const isActive = status === 'active';

  return (
    <Card
      onClick={isActive ? onClick : undefined}
      className={cn(
        'w-full max-w-xs rounded-xl bg-card shadow-soft transition-all duration-200 ease-in-out border border-slate-100',
        isActive
          ? 'cursor-pointer hover:border-primary/30 hover:shadow-oasis'
          : 'cursor-not-allowed bg-secondary'
      )}
    >
      <CardHeader className="p-5">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <Icon className={cn('h-5 w-5', isActive ? 'text-foreground' : 'text-muted-foreground/70')} />
        </div>
        <CardTitle className={cn(
          'text-base font-semibold',
          isActive ? 'text-foreground' : 'text-muted-foreground/70'
        )}>
          {title}
        </CardTitle>
        <CardDescription className={cn(
          'text-sm mt-1',
          isActive ? 'text-slate-600' : 'text-muted-foreground/70'
        )}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AssistantCard;
