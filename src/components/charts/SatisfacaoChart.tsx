import { TrendingUp } from 'lucide-react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
  { mes: "Ago", satisfacao: 4.2, nps: 65 },
  { mes: "Set", satisfacao: 4.4, nps: 68 },
  { mes: "Out", satisfacao: 4.6, nps: 72 },
  { mes: "Nov", satisfacao: 4.5, nps: 70 },
  { mes: "Dez", satisfacao: 4.7, nps: 75 },
  { mes: "Jan", satisfacao: 4.8, nps: 78 },
];

const chartConfig = {
  satisfacao: {
    label: "Satisfação (1-5)",
    color: "rgb(91, 154, 225)", // oasis-blue
  },
  nps: {
    label: "NPS Score",
    color: "rgb(16, 185, 129)", // green-500
  },
} satisfies ChartConfig;

export function SatisfacaoChart() {
  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="text-lg">Evolução da Satisfação</CardTitle>
        <CardDescription>
          Acompanhamento da satisfação dos pacientes e NPS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="aspect-auto h-[240px] w-full">
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid 
              vertical={false} 
              stroke="rgb(229, 231, 235)" 
              strokeDasharray="3 3" 
            />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
              domain={[4.0, 5.0]}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => `${value}/2024`}
                  config={chartConfig}
                />
              }
            />
            <Line
              dataKey="satisfacao"
              type="monotone"
              stroke="rgb(91, 154, 225)"
              strokeWidth={3}
              dot={{
                fill: "rgb(91, 154, 225)",
                strokeWidth: 2,
                stroke: "rgb(255, 255, 255)",
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: "rgb(91, 154, 225)",
                stroke: "rgb(255, 255, 255)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-success">
          Crescimento sustentado de 14.3% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meta de 4.8/5 atingida - Excelência no atendimento
        </div>
      </CardFooter>
    </Card>
  );
}