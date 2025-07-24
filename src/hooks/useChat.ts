import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://kit-75xsi-n8n.a3.hubai.touk.io/webhook/6b987347-42d1-4104-a8bf-46586acc856a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          userId: 'medchat-user-123', 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "Não recebi uma resposta do assistente.",
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (e) {
      const err = e as Error;
      setError(err);
      let friendlyMessage = `Houve um erro ao contatar o assistente: ${err.message}`;
      if (err.message.includes('Failed to fetch')) {
        friendlyMessage = 'Não foi possível conectar ao servidor. Verifique se o webhook n8n está com o CORS configurado corretamente.';
      }
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: friendlyMessage,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};
