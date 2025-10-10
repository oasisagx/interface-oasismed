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
  onNewRecordingClick: () => void;
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
  onNewRecordingClick,
}) => {
  return (
    <div className="flex flex-col h-full border-l border-slate-100 p-4">
      <div className="bg-slate-50 rounded-xl border border-slate-100 flex-1 flex flex-col">
        {/* New Recording Button */}
        {selectedHistory && (
          <div className="p-2 pb-1 border-b border-slate-100">
            <Button variant="secondary" onClick={onNewRecordingClick} className="w-full bg-white">
              Nova Gravação/Transcrição
            </Button>
          </div>
        )}

        {/* History Section */}
        <div className="p-2 overflow-y-auto scrollbar-thin">
          <h3 className="text-base text-center font-semibold text-foreground mb-3">Histórico</h3>
          <div className="space-y-1">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onHistoryClick(item)}
                className={cn(
                  'w-full text-left p-3 rounded-lg border transition-colors',
                  selectedHistory === item.id
                    ? 'bg-primary/10 border-primary/20'
                    : 'bg-card border-slate-200 hover:border-slate-300'
                )}
              >
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 mx-2"></div>

        {/* Templates Section */}
        <div className="p-2">
          <h3 className="text-base text-center font-semibold text-foreground mb-3">Templates</h3>
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

        {/* Action Button */}
        <div className="p-2">
          {isTemplateSelected && (
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <Button variant="secondary" onClick={onSaveClick} className="flex-1 bg-white">Salvar</Button>
              ) : (
                <Button variant="secondary" onClick={onEditClick} className="flex-1 bg-white">Editar</Button>
              )}
              <Button variant="secondary" onClick={onSendClick} className="flex-1 bg-white">
                Enviar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscricaoSidebar;
