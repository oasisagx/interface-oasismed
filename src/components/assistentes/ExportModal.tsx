import React from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui/button';

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
          <h2 className="text-lg font-bold text-foreground">Enviar ou Exportar</h2>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-6 max-h-60 overflow-y-auto scrollbar-thin">
          <div 
            className="text-sm max-w-none whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: transcription.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="recipient-email" className="text-sm font-bold text-foreground">
              Enviar por e-mail
            </label>
            <div className="flex items-center mt-2">
              <input
                id="recipient-email"
                type="email"
                className="flex-1 px-3 py-[7px] bg-background border border-slate-300 rounded-l-md text-sm focus:outline-none focus:ring-0 focus:border-slate-300 focus-visible:outline-none [&:focus]:shadow-none"
                placeholder="medico@clinica.com"
              />
              <Button className="rounded-l-none border border-slate-300 py-1.5">
                <span className="font-semibold">Enviar</span>
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-foreground">
              Exportar como arquivo
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button variant="outline" className="border-slate-300">
                Arquivo de Texto
              </Button>
              <Button variant="outline" className="border-slate-300">
                PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
