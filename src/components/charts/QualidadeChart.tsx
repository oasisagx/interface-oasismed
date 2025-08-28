import React from 'react';
import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
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
  { metrica: "Satisfação do Paciente", valor: 92 },
  { metrica: "Tempo de Atendimento", valor: 85 },
  { metrica: "Qualidade do Diagnóstico", valor: 96 },
  { metrica: "Eficiência Operacional", valor: 88 },
  { metrica: "Taxa de Retorno", valor: 94 },
  { metrica: "Pontualidade", valor: 90 },
];

const chartConfig = {
  valor: {
    label: "Score",
    color: "rgb(91, 154, 225)", // oasis-blue
  },
} satisfies ChartConfig;

export function QualidadeChart() {
  return (
    <Card className="hover-lift h-full flex flex-col">
      <CardHeader className="items-center">
        <CardTitle className="text-lg">Métricas de Qualidade</CardTitle>
        <CardDescription>
          Indicadores de Performance da Clinica
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <RadarChart data={chartData} margin={{ top: 10, right: 60, bottom: 10, left: 60 }}>
            <ChartTooltip 
              cursor={false} 
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => value}
                />
              } 
            />
            <PolarAngleAxis 
              dataKey="metrica" 
              tick={{ 
                fill: 'rgb(107, 114, 128)', 
                fontSize: 11,
                fontWeight: 500
              }}
            />
            <PolarGrid 
              stroke="rgb(229, 231, 235)"
              strokeDasharray="2 2"
            />
            <Radar
              dataKey="valor"
              fill="rgb(91, 154, 225)"
              fillOpacity={0.2}
              stroke="rgb(91, 154, 225)"
              strokeWidth={2}
              dot={{
                r: 4,
                fillOpacity: 1,
                fill: "rgb(91, 154, 225)",
                strokeWidth: 2,
                stroke: "rgb(255, 255, 255)"
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
