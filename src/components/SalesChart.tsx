import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip } from './ui/chart';

interface SalesChartProps {
  data?: any[];
  className?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, className = '' }) => {
  // Dados de exemplo para Outubro (31 dias)
  const defaultData = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    consultas: Math.floor(Math.random() * 70) + 10, // Valores aleatórios entre 10 e 80
    procedimentos: Math.floor(Math.random() * 70) + 10,
  }));

  const chartData = data || defaultData;

  // Processamento dos dados conforme solicitado
  const processedData = chartData.map(item => ({
    ...item,
    consultas: Math.round(item.consultas / 2),
    procedimentos: Math.round(item.procedimentos / 2),
  }));

  const formatXAxis = (tickItem: number) => {
    return `${tickItem} Out`;
  };

  return (
    <div className={`h-64 ${className}`}>
      <ChartContainer>
        <AreaChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            dataKey="day"
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'rgb(var(--border))' }}
            tickLine={{ stroke: 'rgb(var(--border))' }}
            ticks={[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31]}
            tickFormatter={formatXAxis}
          />
          <YAxis 
            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'rgb(var(--border))' }}
            tickLine={{ stroke: 'rgb(var(--border))' }}
            domain={[0, 40]}
            ticks={[10, 20, 30, 40]}
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
