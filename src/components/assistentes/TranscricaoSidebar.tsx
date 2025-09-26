import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FileText, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

const TranscricaoSidebar: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const history = [
    { id: 1, title: 'Consulta 01', subtitle: '25/09/2025 - João Silva' },
    { id: 2, title: 'Consulta 02', subtitle: '24/09/2025 - Maria Costa' },
    { id: 3, title: 'Consulta 03', subtitle: '23/09/2025 - Pedro Alves' },
  ];

  const templates = [
    { id: 'clinico', title: 'Clínico', description: 'Template para avaliação geral.' },
    { id: 'diagnostico', title: 'Diagnóstico', description: 'Template para hipótese diagnóstica.' },
    { id: 'retorno', title: 'Retorno', description: 'Template para consulta de retorno.' },
    { id: 'encaminhamento', title: 'Encaminhamento', description: 'Template para especialistas.' },
    { id: 'atestado', title: 'Atestado', description: 'Template para emissão de atestado.' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-border p-4 space-y-4">
      {/* History Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Histórico</h3>
        <div className="space-y-1">
          {history.map((item) => (
            <button key={item.id} className="w-full text-left text-sm p-2 rounded-md hover:bg-secondary">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border"></div>

      {/* Templates Section */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <h3 className="text-sm font-semibold text-foreground mb-3">Templates</h3>
        <div className="space-y-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                'w-full text-left p-3 rounded-lg border transition-colors',
                selectedTemplate === template.id
                  ? 'bg-primary/10 border-primary/20'
                  : 'bg-card border-border hover:border-slate-300'
              )}
            >
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">{template.title}</p>
                  <p className="text-xs text-slate-600">{template.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border"></div>

      {/* Action Button */}
      <div>
        <Button className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Editar / Enviar
        </Button>
      </div>
    </div>
  );
};

export default TranscricaoSidebar;
