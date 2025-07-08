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
    <Card className="hover-lift">
      <CardHeader className="items-center">
        <CardTitle className="text-lg">Métricas de Qualidade</CardTitle>
        <CardDescription>
          Indicadores de performance da clínica (%)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <RadarChart data={chartData}>
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-success">
          Média geral de 90.8% de qualidade <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Acima da média do setor - Resultados excepcionais
        </div>
      </CardFooter>
    </Card>
  );
}