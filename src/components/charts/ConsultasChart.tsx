import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
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
  { date: "2024-01-01", consultas: 45, procedimentos: 23 },
  { date: "2024-01-02", consultas: 52, procedimentos: 31 },
  { date: "2024-01-03", consultas: 48, procedimentos: 28 },
  { date: "2024-01-04", consultas: 61, procedimentos: 35 },
  { date: "2024-01-05", consultas: 55, procedimentos: 42 },
  { date: "2024-01-06", consultas: 67, procedimentos: 38 },
  { date: "2024-01-07", consultas: 43, procedimentos: 25 },
  { date: "2024-01-08", consultas: 58, procedimentos: 33 },
  { date: "2024-01-09", consultas: 62, procedimentos: 29 },
  { date: "2024-01-10", consultas: 49, procedimentos: 31 },
  { date: "2024-01-11", consultas: 71, procedimentos: 45 },
  { date: "2024-01-12", consultas: 64, procedimentos: 38 },
  { date: "2024-01-13", consultas: 59, procedimentos: 41 },
  { date: "2024-01-14", consultas: 53, procedimentos: 28 },
  { date: "2024-01-15", consultas: 68, procedimentos: 39 },
  { date: "2024-01-16", consultas: 72, procedimentos: 44 },
  { date: "2024-01-17", consultas: 56, procedimentos: 33 },
  { date: "2024-01-18", consultas: 63, procedimentos: 37 },
  { date: "2024-01-19", consultas: 69, procedimentos: 42 },
  { date: "2024-01-20", consultas: 58, procedimentos: 35 },
  { date: "2024-01-21", consultas: 65, procedimentos: 40 },
  { date: "2024-01-22", consultas: 74, procedimentos: 46 },
  { date: "2024-01-23", consultas: 61, procedimentos: 38 },
  { date: "2024-01-24", consultas: 67, procedimentos: 41 },
  { date: "2024-01-25", consultas: 70, procedimentos: 43 },
  { date: "2024-01-26", consultas: 59, procedimentos: 36 },
  { date: "2024-01-27", consultas: 66, procedimentos: 39 },
  { date: "2024-01-28", consultas: 73, procedimentos: 45 },
  { date: "2024-01-29", consultas: 68, procedimentos: 42 },
  { date: "2024-01-30", consultas: 75, procedimentos: 47 },
];

const chartConfig = {
  consultas: {
    label: "Consultas",
    color: "rgb(91, 154, 225)", // oasis-blue
  },
  procedimentos: {
    label: "Procedimentos", 
    color: "rgb(16, 185, 129)", // green-500
  },
} satisfies ChartConfig;

export function ConsultasChart() {
  const [timeRange, setTimeRange] = useState("30d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-01-30");
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
    <Card className="hover-lift">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-border py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg">Consultas e Procedimentos</CardTitle>
          <CardDescription>
            Evolução diária da produtividade da clínica
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg"
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
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
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
                />
              }
            />
            <Area
              dataKey="procedimentos"
              type="natural"
              fill="url(#fillProcedimentos)"
              stroke="rgb(16, 185, 129)"
              stackId="a"
              strokeWidth={2}
            />
            <Area
              dataKey="consultas"
              type="natural"
              fill="url(#fillConsultas)"
              stroke="rgb(91, 154, 225)"
              stackId="a"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-success">
          Crescimento de 12.5% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparado ao período anterior - {filteredData.length} dias
        </div>
      </CardFooter>
    </Card>
  );
}