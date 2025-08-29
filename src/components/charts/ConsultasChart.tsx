import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '../ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const chartData = [
  // Taxa de conversão ~30% no início
  { date: "2024-10-01", consultas: 45, procedimentos: 14 }, // 31%
  { date: "2024-10-02", consultas: 52, procedimentos: 16 }, // 31%
  { date: "2024-10-03", consultas: 48, procedimentos: 15 }, // 31%
  { date: "2024-10-04", consultas: 61, procedimentos: 20 }, // 33%
  { date: "2024-10-05", consultas: 55, procedimentos: 18 }, // 33%
  { date: "2024-10-06", consultas: 67, procedimentos: 23 }, // 34%
  { date: "2024-10-07", consultas: 43, procedimentos: 15 }, // 35%
  { date: "2024-10-08", consultas: 58, procedimentos: 21 }, // 36%
  { date: "2024-10-09", consultas: 62, procedimentos: 23 }, // 37%
  { date: "2024-10-10", consultas: 49, procedimentos: 18 }, // 37%
  { date: "2024-10-11", consultas: 71, procedimentos: 27 }, // 38%
  { date: "2024-10-12", consultas: 64, procedimentos: 25 }, // 39%
  { date: "2024-10-13", consultas: 59, procedimentos: 23 }, // 39%
  { date: "2024-10-14", consultas: 53, procedimentos: 21 }, // 40%
  { date: "2024-10-15", consultas: 68, procedimentos: 28 }, // 41%
  { date: "2024-10-16", consultas: 72, procedimentos: 30 }, // 42%
  { date: "2024-10-17", consultas: 56, procedimentos: 24 }, // 43%
  { date: "2024-10-18", consultas: 63, procedimentos: 27 }, // 43%
  { date: "2024-10-19", consultas: 69, procedimentos: 30 }, // 43%
  { date: "2024-10-20", consultas: 58, procedimentos: 26 }, // 45%
  { date: "2024-10-21", consultas: 65, procedimentos: 29 }, // 45%
  { date: "2024-10-22", consultas: 74, procedimentos: 34 }, // 46%
  { date: "2024-10-23", consultas: 61, procedimentos: 28 }, // 46%
  { date: "2024-10-24", consultas: 67, procedimentos: 31 }, // 46%
  { date: "2024-10-25", consultas: 70, procedimentos: 33 }, // 47%
  { date: "2024-10-26", consultas: 59, procedimentos: 28 }, // 47%
  { date: "2024-10-27", consultas: 66, procedimentos: 32 }, // 48%
  { date: "2024-10-28", consultas: 73, procedimentos: 36 }, // 49%
  { date: "2024-10-29", consultas: 68, procedimentos: 34 }, // 50%
  // Taxa de conversão ~50% no final
  { date: "2024-10-30", consultas: 75, procedimentos: 38 }, // 51%
];

const chartConfig = {
  consultas: {
    label: "Aquisição",
    color: "rgb(91, 154, 225)", // oasis-blue
  },
  procedimentos: {
    label: "Conversão", 
    color: "rgb(16, 185, 129)", // green-500
  },
} satisfies ChartConfig;

export function ConsultasChart() {
  const [timeRange, setTimeRange] = useState("30d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-10-29");
    let daysToSubtract = 30;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "90d") {
      daysToSubtract = 90;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="hover-lift border-slate-100">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg">Aquisição e Conversão</CardTitle>
          <CardDescription>
            Demanda adquirida de pacientes e consultas agendadas
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg border-slate-200"
            aria-label="Selecionar período"
          >
            <SelectValue placeholder="Último mês" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Últimos 90 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillConsultas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgb(91, 154, 225)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="rgb(91, 154, 225)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProcedimentos" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgb(16, 185, 129)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="rgb(16, 185, 129)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgb(229, 231, 235)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                const day = date.getDate();
                return `${day} Out`;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                  config={chartConfig}
                />
              }
            />
            <Legend content={<ChartLegendContent />} />
            <Area
              dataKey="procedimentos"
              type="linear"
              fill="url(#fillProcedimentos)"
              stroke="rgb(16, 185, 129)"
              stackId="a"
              strokeWidth={2}
              name="Conversão"
            />
            <Area
              dataKey="consultas"
              type="linear"
              fill="url(#fillConsultas)"
              stroke="rgb(91, 154, 225)"
              stackId="a"
              strokeWidth={2}
              name="Aquisição"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-success">
          Crescimento de 12.5%
        </div>
        <div className="text-muted-foreground leading-none">
          Comparado ao período anterior de {filteredData.length} dias
        </div>
      </CardFooter>
    </Card>
  );
}
