oimport React from 'react';
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
        'w-full max-w-xs p-4 border border-slate-200 rounded-lg transition-colors',
        isActive
          ? 'cursor-pointer hover:border-slate-300 hover:bg-slate-50'
          : 'cursor-not-allowed bg-slate-50 opacity-60'
      )}
    >
      <CardHeader className="p-0">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
          <Icon className={cn('h-5 w-5', isActive ? 'text-slate-600' : 'text-slate-400')} />
        </div>
        <CardTitle className={cn(
          'text-base font-semibold',
          isActive ? 'text-slate-900' : 'text-slate-500'
        )}>
          {title}
        </CardTitle>
        <CardDescription className={cn(
          'text-sm mt-1',
          isActive ? 'text-slate-600' : 'text-slate-400'
        )}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AssistantCard;
