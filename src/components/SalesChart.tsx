import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartLegend } from './ui/chart';

interface SalesChartProps {
  data?: any[];
  className?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, className = '' }) => {
  const defaultData = [
    { month: 'Jan', consultas: 65, procedimentos: 28 },
    { month: 'Fev', consultas: 59, procedimentos: 48 },
    { month: 'Mar', consultas: 80, procedimentos: 40 },
    { month: 'Abr', consultas: 81, procedimentos: 19 },
    { month: 'Mai', consultas: 56, procedimentos: 86 },
    { month: 'Jun', consultas: 55, procedimentos: 27 },
    { month: 'Jul', consultas: 40, procedimentos: 90 },
  ];

  const chartData = data || defaultData;

  return (
    <div className={`h-64 ${className}`}>
      <ChartContainer>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorConsultas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorProcedimentos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'rgb(var(--border))' }}
            tickLine={{ stroke: 'rgb(var(--border))' }}
          />
          <YAxis 
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'rgb(var(--border))' }}
            tickLine={{ stroke: 'rgb(var(--border))' }}
          />
          <ChartTooltip />
          <Area 
            type="monotone" 
            dataKey="consultas" 
            stroke="rgb(var(--primary))" 
            fillOpacity={1} 
            fill="url(#colorConsultas)" 
            strokeWidth={2}
            name="Consultas"
          />
          <Area 
            type="monotone" 
            dataKey="procedimentos" 
            stroke="#10B981" 
            fillOpacity={1} 
            fill="url(#colorProcedimentos)" 
            strokeWidth={2}
            name="Procedimentos"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default SalesChart;