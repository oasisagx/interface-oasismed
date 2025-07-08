import React from 'react';
import ClaudeChatInput from '../components/ui/claude-style-ai-input';
import { useChat } from '../hooks/useChat';
import { FileWithPreview, PastedContent } from '../components/ui/claude-style-ai-input';
import { User, Bot, RefreshCw, Archive } from 'lucide-react';

const MedChat: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();

  // Saudação contextual baseada no horário - EXATO como no feedback
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  // Sugestões médicas específicas e práticas - REFINADAS
  const suggestions = [
    "Análise de exame laboratorial",
    "Diagnóstico diferencial",
    "Dosagem medicamentosa", 
    "Interpretação de imagem"
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
      
      {/* Chat Header - quando há mensagens */}
      {messages.length > 0 && (
        <div className="border-b border-slate-100 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Assistente Médico</h3>
                <p className="text-xs text-slate-500">Online • Responde em segundos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleNewChat}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Nova conversa</span>
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Archive className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Container */}
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-slate-900' 
                    : 'bg-slate-100'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                
                {/* Message */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {message.content}
                  <div className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-slate-600" />
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Welcome Screen - Estilo Claude PERFEITO */
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
          
          {/* Greeting - EXATO como pedido no feedback */}
          <div className="text-center mb-12 max-w-2xl">
            <h1 className="text-4xl font-light text-slate-800 mb-3">
              {getGreeting()}, doutor!
            </h1>
            <p className="text-xl text-slate-600 font-light">Como posso te ajudar hoje?</p>
          </div>

          {/* Suggestion Cards - Estilo Claude REFINADO */}
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion, [], [])}
                className="p-5 text-left text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-sm group"
              >
                <span className="group-hover:text-slate-900 transition-colors font-medium">
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area - Claude Style PERFEITO */}
      <div className="px-6 py-6">
        <ClaudeChatInput
          onSendMessage={handleSendMessage}
          placeholder="Descreva o caso clínico ou faça sua pergunta..."
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default MedChat;