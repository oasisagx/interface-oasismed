import React from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui/button';
import { X, Send, FileText, FileDown } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcription: string;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  transcription,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Enviar ou Exportar Relatório</h2>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-6 max-h-60 overflow-y-auto scrollbar-thin">
          <div 
            className="prose prose-sm max-w-none whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: transcription.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="recipient-email" className="text-sm font-medium text-foreground">
              Enviar por e-mail
            </label>
            <div className="flex items-center mt-2">
              <input
                id="recipient-email"
                type="email"
                className="flex-1 px-3 py-2 bg-background border border-slate-200 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="ex: medico@email.com"
              />
              <Button className="rounded-l-none">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground">OU</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Exportar como arquivo
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Exportar .txt
              </Button>
              <Button variant="outline">
                <FileDown className="w-4 h-4 mr-2" />
                Exportar .docx
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
