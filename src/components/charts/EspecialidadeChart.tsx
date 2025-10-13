import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

const chartData = [
  { especialidade: "Clínica Geral", consultas: 186, receita: 45200 },
  { especialidade: "Cardiologia", consultas: 142, receita: 38500 },
  { especialidade: "Pediatria", consultas: 98, receita: 24700 },
];

export function EspecialidadeChart() {
  return (
    <Card className="hover-lift border-slate-100">
      <CardHeader>
        <CardTitle className="text-lg">Consultas Concluídas no Mês Atual</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="aspect-auto h-[180px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
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
                fontSize={15}
                fontWeight="700"
              />
              <LabelList
                dataKey="consultas"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={14}
                fontWeight="600"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
