import React, { useState, useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
} from '../ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Requirement: Data must be for October 2025
const originalData = [
  { date: "2025-10-01", contatos: 45, agendamentos: 13 },
  { date: "2025-10-02", contatos: 52, agendamentos: 15 },
  { date: "2025-10-03", contatos: 48, agendamentos: 15 },
  { date: "2025-10-04", contatos: 61, agendamentos: 19 },
  { date: "2025-10-05", contatos: 55, agendamentos: 18 },
  { date: "2025-10-06", contatos: 67, agendamentos: 23 },
  { date: "2025-10-07", contatos: 43, agendamentos: 16 },
  { date: "2025-10-08", contatos: 58, agendamentos: 22 },
  { date: "2025-10-09", contatos: 62, agendamentos: 25 },
  { date: "2025-10-10", contatos: 49, agendamentos: 21 },
  { date: "2025-10-11", contatos: 71, agendamentos: 30 },
  { date: "2025-10-12", contatos: 64, agendamentos: 28 },
  { date: "2025-10-13", contatos: 59, agendamentos: 27 },
  { date: "2025-10-14", contatos: 53, agendamentos: 25 },
  { date: "2025-10-15", contatos: 68, agendamentos: 33 },
  { date: "2025-10-16", contatos: 72, agendamentos: 36 },
  { date: "2025-10-17", contatos: 56, agendamentos: 29 },
  { date: "2025-10-18", contatos: 63, agendamentos: 33 },
  { date: "2025-10-19", contatos: 69, agendamentos: 37 },
  { date: "2025-10-20", contatos: 58, agendamentos: 32 },
  { date: "2025-10-21", contatos: 65, agendamentos: 36 },
  { date: "2025-10-22", contatos: 74, agendamentos: 41 },
  { date: "2025-10-23", contatos: 61, agendamentos: 35 },
  { date: "2025-10-24", contatos: 67, agendamentos: 39 },
  { date: "2025-10-25", contatos: 70, agendamentos: 42 },
  { date: "2025-10-26", contatos: 59, agendamentos: 36 },
  { date: "2025-10-27", contatos: 66, agendamentos: 41 },
  { date: "2025-10-28", contatos: 73, agendamentos: 45 },
  { date: "2025-10-29", contatos: 68, agendamentos: 43 },
  { date: "2025-10-30", contatos: 75, agendamentos: 45 },
  { date: "2025-10-31", contatos: 70, agendamentos: 42 },
];

// Requirement: All values must be divided by 2
const chartData = originalData.map(item => {
  const agendamentos = Math.round(item.agendamentos / 2);
  return {
    date: item.date,
    contatos: Math.round(item.contatos / 2),
    agendamentos: agendamentos,
    consultas: Math.round(agendamentos * 0.8),
  };
});

const chartConfig = {
  contatos: { label: "Contatos", color: "rgb(91, 154, 225)" },
  agendamentos: { label: "Agendamentos", color: "rgb(16, 185, 129)" },
  consultas: { label: "Consultas", color: "rgb(236, 72, 153)" },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const formattedLabel = new Date(label + "T00:00:00Z").toLocaleDateString("pt-BR", {
      day: "numeric", month: "long",
    });
    return (
      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-lg">
        <p className="label text-base font-bold text-slate-800 mb-2">{formattedLabel}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pld.color }} />
            <p className="text-sm text-slate-600">{`${pld.name}:`}</p>
            <p className="text-sm font-semibold text-slate-900">{pld.value}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ConsultasChart() {
  const [timeRange, setTimeRange] = useState("30d");

  const filteredData = useMemo(() => {
    const endDate = new Date("2025-10-31T00:00:00Z");
    let daysToSubtract = 30;
    if (timeRange === "7d") {
      daysToSubtract = 6; // 7 days total including end date
    } else if (timeRange === "90d") {
      daysToSubtract = 89; // 90 days total
    } else {
      // Default to 30d, showing the whole month
      return chartData;
    }
    
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - daysToSubtract);
    
    return chartData.filter((item) => {
      const itemDate = new Date(item.date + "T00:00:00Z");
      return itemDate >= startDate && itemDate <= endDate;
    });
  }, [timeRange]);

  // Requirement: Y-Axis must be 0-40
  const yDomain = [0, 40];
  const yAxisTicks = [0, 10, 20, 30, 40];
  
  // Requirement: X-Axis labels must be 1, 4, 7...
  const xAxisTicks = useMemo(() => {
    return filteredData.map(d => d.date).filter((_, i) => i % 3 === 0);
  }, [filteredData]);

  return (
    <Card className="hover-lift border-slate-100">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg">Conversão de Pacientes</CardTitle>
        </div>
        {/* Requirement: Selector must be enabled */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg border-slate-200" aria-label="Selecionar período">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">Últimos 7 dias</SelectItem>
            <SelectItem value="30d" className="rounded-lg">Últimos 30 dias</SelectItem>
            <SelectItem value="90d" className="rounded-lg">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillContatos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(91, 154, 225)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(91, 154, 225)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="fillAgendamentos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="fillConsultas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(236, 72, 153)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(236, 72, 153)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgb(229, 231, 235)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              ticks={xAxisTicks}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['dataMin', 'dataMax']}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value + "T00:00:00Z");
                const day = date.getDate();
                const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
                return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}`;
              }}
            />
            <YAxis
              domain={yDomain}
              ticks={yAxisTicks}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
              width={30}
            />
            <Tooltip cursor={false} content={<CustomTooltip />}/>
            <Area dataKey="contatos" type="linear" fill="url(#fillContatos)" stroke="rgb(91, 154, 225)" strokeWidth={2} name="Contatos" activeDot={{ r: 6 }}/>
            <Area dataKey="agendamentos" type="linear" fill="url(#fillAgendamentos)" stroke="rgb(16, 185, 129)" strokeWidth={2} name="Agendamentos" activeDot={{ r: 6 }}/>
            <Area dataKey="consultas" type="linear" fill="url(#fillConsultas)" stroke="rgb(236, 72, 153)" strokeWidth={2} name="Consultas" activeDot={{ r: 6 }}/>
          </AreaChart>
        </ChartContainer>
        <div className="flex justify-center items-center space-x-6 pt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(91, 154, 225)' }} />
            <span className="text-sm text-muted-foreground font-medium">Contatos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(16, 185, 129)' }} />
            <span className="text-sm text-muted-foreground font-medium">Agendamentos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(236, 72, 153)' }} />
            <span className="text-sm text-muted-foreground font-medium">Consultas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
