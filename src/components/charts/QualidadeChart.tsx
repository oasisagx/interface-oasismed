import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
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
  { metrica: "Satisfação pela\nConsulta", valor: 95 },
  { metrica: "Satisfação pelo\nTratamento", valor: 96 },
  { metrica: "Clareza na\nComunicação", valor: 94 },
  { metrica: "Taxa de\nRetorno", valor: 82 },
  { metrica: "Pontualidade\ndas Consultas", valor: 78 },
];

const chartConfig = {
  valor: {
    label: "Score",
    color: "rgb(91, 154, 225)", // oasis-blue
  },
} satisfies ChartConfig;

const CustomPolarAngleAxisTick = ({ payload, x, y, cx, cy, ...rest }: any) => {
  const parts = String(payload.value).split('\n');
  const angle = Math.atan2(y - cy, x - cx);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  
  // Use a larger padding for side labels, keep top/bottom labels as they are
  let PADDING = 15;
  if (Math.abs(cos) > 0.5) { // Condition to identify side labels
    PADDING = 45;
  }

  const translateX = PADDING * cos;
  const translateY = PADDING * sin;

  const verticalOffset = parts.length > 1 ? "-0.6em" : "0.3em";

  return (
    <g transform={`translate(${x + translateX},${y + translateY})`}>
      <text {...rest} textAnchor="middle" dominantBaseline="middle" className="fill-slate-600" fontSize={12}>
        <tspan x="0" dy={verticalOffset}>{parts[0]}</tspan>
        {parts[1] && <tspan x="0" dy="1.2em">{parts[1]}</tspan>}
      </text>
    </g>
  );
};

export function QualidadeChart() {
  return (
    <Card className="hover-lift h-full flex flex-col border-slate-100">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Experiência do Paciente</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full max-w-[400px] h-[275px]"
        >
          <RadarChart 
            data={chartData} 
            outerRadius="75%"
            margin={{ top: 0, right: 50, bottom: 40, left: 50 }}
          >
            <ChartTooltip 
              cursor={false} 
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => String(value).replace('\n', ' ')}
                />
              } 
            />
            <PolarAngleAxis 
              dataKey="metrica" 
              tick={<CustomPolarAngleAxisTick />}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tickCount={6}
              tick={false} 
              axisLine={false} 
            />
            <PolarGrid 
              stroke="rgb(203, 213, 225)"
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
