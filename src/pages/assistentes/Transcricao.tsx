import React, { useState, useMemo, useEffect } from 'react';
import TranscricaoSidebar from '../../components/assistentes/TranscricaoSidebar';
import { AIVoiceInput } from '../../components/ui/AIVoiceInput';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import ExportModal from '../../components/assistentes/ExportModal';

interface Template {
  id: string;
  title: string;
  description: string;
  formatter: (transcription: string) => string;
}

const DUMMY_TRANSCRIPTION = "Paciente relata dor de cabeça persistente há três dias, localizada na região frontal. A dor é pulsátil e piora com a luz. Nega febre ou outros sintomas. Ao exame, apresenta-se em bom estado geral, corado, hidratado. Pressão arterial de 120 por 80. Exame neurológico sem alterações. Hipótese diagnóstica de cefaleia tensional. Prescrito analgésico e repouso.";

const templates: Template[] = [
  {
    id: 'clinico',
    title: 'Clínico',
    description: 'Template para avaliação geral.',
    formatter: (t) => `**RELATÓRIO CLÍNICO**\n\n**Histórico da Doença Atual:**\n${t}\n\n**Exame Físico:**\n- Geral: [...]\n- Específico: [...]\n\n**Impressão Diagnóstica:**\n[...]\n\n**Plano:**\n[...]`
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    description: 'Template para hipótese diagnóstica.',
    formatter: (t) => `**HIPÓTESE DIAGNÓSTICA**\n\n**Queixa Principal:**\n${t.split('.')[0]}.\n\n**História e Exame Físico Relevantes:**\n${t.split('.').slice(1).join('.').trim()}\n\n**Diagnósticos Diferenciais:**\n1. [...]\n2. [...]\n\n**Plano de Investigação:**\n[...]`
  },
  {
    id: 'retorno',
    title: 'Retorno',
    description: 'Template para consulta de retorno.',
    formatter: (t) => `**EVOLUÇÃO - CONSULTA DE RETORNO**\n\n**Intervalo desde a última consulta:**\n[...]\n\n**Evolução Clínica:**\n${t}\n\n**Adesão ao Tratamento:**\n[...]\n\n**Ajustes no Plano:**\n[...]`
  },
  {
    id: 'encaminhamento',
    title: 'Encaminhamento',
    description: 'Template para especialistas.',
    formatter: (t) => `**CARTA DE ENCAMINHAMENTO**\n\n**Prezado(a) Colega,**\n\nEncaminho o(a) paciente [Nome do Paciente], [Idade], para avaliação e acompanhamento devido a:\n\n**Resumo do Caso:**\n${t}\n\n**Motivo do Encaminhamento:**\n[...]\n\nAtenciosamente,\n[Seu Nome]`
  },
  {
    id: 'atestado',
    title: 'Atestado',
    description: 'Template para emissão de atestado.',
    formatter: (t) => `**ATESTADO MÉDICO**\n\nAtesto, para os devidos fins, que o(a) Sr(a). [Nome do Paciente] esteve sob meus cuidados médicos no dia de hoje, necessitando de afastamento de suas atividades laborais por [Número de Dias] dia(s), a partir desta data, por motivo de doença (CID: [...]).\n\n**Observações Adicionais:**\n${t}`
  },
];

// Função para simular a formatação da transcrição
const formatTranscription = (transcription: string, template: Template | null): string => {
  if (!template) {
    return transcription;
  }
  return template.formatter(transcription);
};

const Transcricao: React.FC = () => {
  const [transcription] = useState(DUMMY_TRANSCRIPTION);
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscription, setEditedTranscription] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const formattedTranscription = useMemo(
    () => formatTranscription(transcription, activeTemplate),
    [transcription, activeTemplate]
  );

  useEffect(() => {
    setEditedTranscription(formattedTranscription);
  }, [formattedTranscription]);

  const handleTemplateClick = (templateId: string) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    setActiveTemplate(selectedTemplate || null);
    setIsEditing(false); // Sai do modo de edição ao trocar de template
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Aqui você poderia salvar a `editedTranscription`
  };

  const handleSendClick = () => {
    setIsExportModalOpen(true);
  };

  return (
    <>
      <div className="flex h-full bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 mb-4 overflow-y-auto">
            {isEditing ? (
              <Textarea
                value={editedTranscription}
                onChange={(e) => setEditedTranscription(e.target.value)}
                className="w-full h-full resize-none border-none focus:ring-0"
              />
            ) : (
              <div
                className="prose prose-sm max-w-none whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: editedTranscription.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            )}
          </div>

          {/* Recording Component */}
          <div className="pb-4">
            <AIVoiceInput />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 h-full">
          <TranscricaoSidebar
            templates={templates}
            selectedTemplate={activeTemplate?.id || null}
            onTemplateClick={(template) => handleTemplateClick(template.id)}
            isEditing={isEditing}
            onEditClick={handleEditClick}
            onSaveClick={handleSaveClick}
            onSendClick={handleSendClick}
            isTemplateSelected={!!activeTemplate}
          />
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        transcription={editedTranscription}
      />
    </>
  );
};

export default Transcricao;
