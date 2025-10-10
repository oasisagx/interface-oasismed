import React from 'react';
import ClaudeChatInput from '../components/ui/claude-style-ai-input';
import { useChat } from '../hooks/useChat';
import { FileWithPreview, PastedContent } from '../components/ui/claude-style-ai-input';
import { User, Bot, RefreshCw, Archive } from 'lucide-react';

const MedChat: React.FC = () => {
  const { messages, isLoading, error, sendMessage } = useChat();

  // Saudação contextual baseada no horário - EXATO como no feedback
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  // Sugestões médicas específicas e práticas - REFINADAS
  const suggestions = [
    "Como está o faturamento",
    "Próximas consultas agendadas",
    "Conversões do mês",
    "Principais queixas dos pacientes da semana"
  ];

  const handleSendMessage = (
    message: string,
    files: FileWithPreview[],
    pastedContent: PastedContent[]
  ) => {
    if (message.trim()) {
      sendMessage(message);
    }
  };

  const handleNewChat = () => {
    window.location.reload(); // Simula nova conversa
  };

  return (
    <div className="h-full flex flex-col bg-white">
    </div>
  );
};

export default MedChat;
