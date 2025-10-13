// eslint-disable no-inline-styles

import React from 'react';
import { ResponsiveContainer } from 'recharts';
import './chart.css';

const getColorClass = (color: string) => {
  if (color === 'rgb(91, 154, 225)') return 'chart-color-oasis-blue';
  if (color === 'rgb(16, 185, 129)') return 'chart-color-green';
  return '';
};

const getBgClass = (color: string) => {
  if (color === 'rgb(91, 154, 225)') return 'chart-bg-oasis-blue';
  if (color === 'rgb(16, 185, 129)') return 'chart-bg-green';
  return '';
};

interface ChartContainerProps {
  children: React.ReactElement;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  children, 
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
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
          <span className={`font-medium ${getColorClass(entry.color)}`}>
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
  formatter?: (value: any, name: any, entry: any) => React.ReactNode;
  indicator?: 'line' | 'dot' | 'dashed';
  config?: any;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ 
  active, 
  payload, 
  label,
  labelFormatter,
  formatter,
  indicator = 'dot',
  config,
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
              className={`w-2 h-2 rounded-full mr-2 ${getBgClass(entry.color)}`}
            />
          )}
          {formatter ? (
            formatter(entry.value, entry.name, entry)
          ) : (
            <>
              <span className={`font-medium ${getColorClass(entry.color)}`}>
                {config?.[entry.dataKey]?.label || entry.name}:
              </span>
              <span className="ml-1 font-semibold text-foreground">{entry.value}</span>
            </>
          )}
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
            className={`w-3 h-3 rounded-full mr-2 ${getBgClass(entry.color)}`}
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
            className={`w-3 h-3 rounded-full ${getBgClass(entry.color)}`}
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
