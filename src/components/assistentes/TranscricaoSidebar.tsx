import React from 'react';
import { Button } from '../ui/button';
import { FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Template {
  id: string;
  title: string;
}

interface HistoryItem {
  id: number;
  title: string;
  subtitle: string;
  transcription: string;
}

interface TranscricaoSidebarProps {
  templates: Template[];
  selectedTemplate: string | null;
  onTemplateClick: (template: Template) => void;
  history: HistoryItem[];
  selectedHistory: number | null;
  onHistoryClick: (historyItem: HistoryItem) => void;
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
  onSendClick: () => void;
  isTemplateSelected: boolean;
}

const TranscricaoSidebar: React.FC<TranscricaoSidebarProps> = ({
  templates,
  selectedTemplate,
  onTemplateClick,
  history,
  selectedHistory,
  onHistoryClick,
  isEditing,
  onEditClick,
  onSaveClick,
  onSendClick,
  isTemplateSelected,
}) => {
  return (
    <div className="flex flex-col h-full border-l border-slate-100 p-4">
      <div className="bg-slate-50 rounded-xl border border-slate-100 flex-1 flex flex-col">
        {/* History Section */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-thin">
          <h3 className="text-sm font-semibold text-foreground mb-3">Histórico</h3>
          <div className="space-y-1">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onHistoryClick(item)}
                className={cn(
                  'w-full text-left text-sm p-2 rounded-md hover:bg-secondary',
                  selectedHistory === item.id && 'bg-secondary'
                )}
              >
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 mx-4"></div>

        {/* Templates Section */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Templates</h3>
          <div className="space-y-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onTemplateClick(template)}
                className={cn(
                  'w-full text-left p-3 rounded-lg border transition-colors',
                  selectedTemplate === template.id
                    ? 'bg-primary/10 border-primary/20'
                    : 'bg-card border-slate-200 hover:border-slate-300'
                )}
              >
                <p className="font-semibold text-foreground text-sm">{template.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        {isTemplateSelected && (
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <Button onClick={onSaveClick} className="flex-1">Salvar</Button>
            ) : (
              <Button variant="ghost" onClick={onEditClick} className="flex-1">Editar</Button>
            )}
            <Button onClick={onSendClick} className="flex-1">
              Enviar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscricaoSidebar;
