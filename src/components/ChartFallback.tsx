import React from 'react';
import { Loader2 } from 'lucide-react';

interface ChartFallbackProps {
  height?: string;
  className?: string;
}

const ChartFallback: React.FC<ChartFallbackProps> = ({ 
  height = "h-64", 
  className = "" 
}) => (
  <div className={`${height} bg-slate-50 rounded-xl border flex items-center justify-center ${className}`}>
    <div className="flex flex-col items-center space-y-2">
      <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      <span className="text-sm text-slate-500">Carregando gráfico...</span>
    </div>
  </div>
);

export default ChartFallback;