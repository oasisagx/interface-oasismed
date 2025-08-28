import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
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
} from '../ui/chart';

const chartData = [
  { especialidade: "Clínica Geral", consultas: 186, receita: 45200 },
  { especialidade: "Cardiologia", consultas: 142, receita: 38500 },
  { especialidade: "Dermatologia", consultas: 128, receita: 32100 },
  { especialidade: "Pediatria", consultas: 98, receita: 24700 },
  { especialidade: "Ortopedia", consultas: 85, receita: 28900 },
  { especialidade: "Ginecologia", consultas: 76, receita: 21800 },
];

const chartConfig = {
  consultas: {
    label: "Consultas",
    color: "rgb(91, 154, 225)", // oasis-blue
  },
  receita: {
    label: "Receita",
    color: "rgb(16, 185, 129)", // green-500
  },
} satisfies ChartConfig;

export function EspecialidadeChart() {
  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="text-lg">Performance por Especialidade</CardTitle>
        <CardDescription>Ranking de consultas realizadas este mês</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} stroke="rgb(229, 231, 235)" />
            <YAxis
              dataKey="especialidade"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
              tickFormatter={(value) => value.slice(0, 8) + '...'}
              hide
            />
            <XAxis 
              dataKey="consultas" 
              type="number" 
              hide 
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  indicator="line"
                  labelFormatter={(value) => `${value}`}
                />
              }
            />
            <Bar
              dataKey="consultas"
              fill="rgb(91, 154, 225)"
              radius={6}
            >
              <LabelList
                dataKey="especialidade"
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={12}
                fontWeight="500"
              />
              <LabelList
                dataKey="consultas"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                fontWeight="600"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-success">
          Aumento de 8.3% na demanda geral
        </div>
      </CardFooter>
    </Card>
  );
}
