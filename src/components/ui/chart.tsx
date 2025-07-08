import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  config?: any;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  children, 
  className = '',
  config 
}) => {
  return (
    <div className={`w-full ${className}`} style={config?.style}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  cursor?: any;
  content?: React.ReactElement;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ 
  active, 
  payload, 
  label,
  content 
}) => {
  if (content) {
    return React.cloneElement(content, { active, payload, label });
  }
  
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-card p-3 border border-border rounded-lg shadow-md">
      <p className="text-sm font-medium text-card-foreground">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm text-muted-foreground">
          <span className="font-medium" style={{ color: entry.color }}>
            {entry.name}:
          </span>{' '}
          {entry.value}
        </p>
      ))}
    </div>
  );
};

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  labelFormatter?: (value: any) => string;
  indicator?: 'line' | 'dot' | 'dashed';
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ 
  active, 
  payload, 
  label,
  labelFormatter,
  indicator = 'dot'
}) => {
  if (!active || !payload || !payload.length) return null;

  const formattedLabel = labelFormatter ? labelFormatter(label) : label;

  return (
    <div className="bg-card p-3 border border-border rounded-lg shadow-oasis">
      {formattedLabel && (
        <p className="text-sm font-medium text-foreground mb-1">{formattedLabel}</p>
      )}
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center text-sm text-muted-foreground">
          {indicator === 'dot' && (
            <div 
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
          )}
          <span className="font-medium" style={{ color: entry.color }}>
            {entry.name}:
          </span>
          <span className="ml-1 font-semibold text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

interface ChartLegendProps {
  payload?: any[];
  content?: React.ReactElement;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ payload, content }) => {
  if (content) {
    return React.cloneElement(content, { payload });
  }
  
  if (!payload) return null;

  return (
    <div className="flex justify-center space-x-6 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

interface ChartLegendContentProps {
  payload?: any[];
}

export const ChartLegendContent: React.FC<ChartLegendContentProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <div className="flex justify-center items-center space-x-6 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// Chart configuration type
export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}