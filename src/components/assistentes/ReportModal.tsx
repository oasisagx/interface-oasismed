import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Mail, FileDown } from 'lucide-react';
import Modal, { ModalHeader, ModalContent, ModalFooter } from '../ui/Modal';
import { Textarea } from '../ui/textarea';

interface Template {
  id: string;
  title: string;
  description: string;
  prompt?: string; // Usaremos isso como o esqueleto do template
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcription: string;
  template: Template | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ 
  isOpen, 
  onClose, 
  transcription,
  template
}) => {
  const DUMMY_SKELETON = `## Histórico do Paciente\n[Detalhes do histórico do paciente aqui]\n\n## Queixa Principal\n[Detalhes da queixa principal aqui]\n\n## Exame Físico\n[Detalhes do exame físico aqui]\n\n## Diagnóstico\n[Diagnóstico aqui]\n\n## Plano de Tratamento\n[Plano de tratamento aqui]`;
  
  const [templateSkeleton, setTemplateSkeleton] = useState(template?.prompt || DUMMY_SKELETON);
  const [formattedPreview, setFormattedPreview] = useState('');

  useEffect(() => {
    if (template) {
      setTemplateSkeleton(template.prompt || DUMMY_SKELETON);
    }
  }, [template]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Simulação de formatação em tempo real
    // Em um caso real, isso poderia ser mais complexo, substituindo placeholders
    const preview = `# Relatório de Consulta: ${template?.title || ''}\n\n${templateSkeleton}\n\n---\n\n### Transcrição Original\n*${transcription}*`;
    setFormattedPreview(preview);
  }, [templateSkeleton, transcription, template]);

  if (!isOpen || !template) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl h-[90vh] flex flex-col">
      <ModalHeader>
        Editor de Relatório: {template.title}
      </ModalHeader>
      
      <ModalContent className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
        {/* Edit Area */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Estrutura do Template</label>
            <Textarea 
                value={templateSkeleton}
                onChange={(e) => setTemplateSkeleton(e.target.value)}
                className="h-full flex-1 resize-none bg-slate-50 border-border"
            />
        </div>

        {/* Preview Area */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Pré-visualização do Relatório</label>
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin border border-border rounded-md p-4 bg-background">
               <div className="text-sm max-w-none text-foreground whitespace-pre-wrap">
                  {formattedPreview}
               </div>
            </div>
        </div>
      </ModalContent>
      
      <ModalFooter>
        <div className="w-full flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pronto para exportar?</span>
            <div className="flex gap-2">
                <Button variant="secondary">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar por Email
                </Button>
                <Button>
                    <FileDown className="w-4 h-4 mr-2" />
                    Exportar como DOCX
                </Button>
            </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ReportModal;
