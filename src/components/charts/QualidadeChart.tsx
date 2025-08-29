import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
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
  { metrica: "Satisfação pelo\nAtendimento", valor: 92 },
  { metrica: "Satisfação pela\nConsulta", valor: 85 },
  { metrica: "Satisfação pelo\nTratamento", valor: 96 },
  { metrica: "Clareza na\nComunicação", valor: 88 },
  { metrica: "Taxa de\nRetorno", valor: 94 },
  { metrica: "Pontualidade das\nConsultas", valor: 90 },
];

const chartConfig = {
  valor: {
    label: "Score",
    color: "rgb(91, 154, 225)", // oasis-blue
  },
} satisfies ChartConfig;

// Componente customizado para o label do eixo (tick)
const CustomPolarAngleAxisTick = ({ payload, x, y, textAnchor, ...rest }: any) => {
  const parts = payload.value.split('\n');
  return (
    <g transform={`translate(${x},${y})`}>
      <text {...rest} textAnchor={textAnchor} y={-12} dy={0}>
        <tspan x="0" dy="0.5em">{parts[0]}</tspan>
        {parts[1] && <tspan x="0" dy="1.2em">{parts[1]}</tspan>}
      </text>
    </g>
  );
};

export function QualidadeChart() {
  return (
    <Card className="hover-lift h-full flex flex-col border-slate-100">
      <CardHeader className="items-center">
        <CardTitle className="text-lg">Experiência do Paciente</CardTitle>
        <CardDescription>
          Indicadores de Satisfação
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <RadarChart data={chartData} margin={{ top: 20, right: 60, bottom: 20, left: 60 }}>
            <ChartTooltip 
              cursor={false} 
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => value.replace('\n', ' ')}
                />
              } 
            />
            <PolarAngleAxis 
              dataKey="metrica" 
              tick={
                <CustomPolarAngleAxisTick 
                  fill='rgb(107, 114, 128)' 
                  fontSize={11}
                  fontWeight={500}
                />
              }
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
