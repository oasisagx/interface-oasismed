import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartLegend } from './ui/chart';

interface DonutChartProps {
  data?: any[];
  className?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, className = '' }) => {
  const defaultData = [
    { name: 'Clínica Geral', value: 35, color: 'rgb(var(--primary))' },
    { name: 'Especialidades', value: 25, color: '#10B981' },
    { name: 'Exames', value: 20, color: '#F59E0B' },
    { name: 'Procedimentos', value: 12, color: '#8B5CF6' },
    { name: 'Outros', value: 8, color: '#EF4444' },
  ];

  const chartData = data || defaultData;
  const COLORS = ['rgb(var(--primary))', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className={`h-64 ${className}`}>
      <ChartContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip />
        </PieChart>
      </ChartContainer>
      <ChartLegend payload={chartData.map((item, index) => ({ value: item.name, color: COLORS[index] }))} />
    </div>
  );
};

export default DonutChart;