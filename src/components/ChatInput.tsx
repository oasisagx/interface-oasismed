import React, { useState } from 'react';
import { Plus, Settings, Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false, 
  placeholder = "Pergunte alguma coisa" 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="bg-card border border-border rounded-xl shadow-oasis hover-lift transition-all">
        <div className="flex items-center p-4">
          <button 
            type="button"
            className="p-2 hover:bg-oasis-blue-light hover:text-oasis-blue rounded-lg transition-all mr-2"
            aria-label="Add attachment"
          >
            <Plus className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <input
            type="text"
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 outline-none text-card-foreground placeholder-muted-foreground bg-transparent"
          />
          
          <div className="flex items-center space-x-2 ml-4">
            <button 
              type="button"
              className="p-2 hover:bg-oasis-blue-light hover:text-oasis-blue rounded-lg transition-all"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              type="button"
              className="p-2 hover:bg-oasis-blue-light hover:text-oasis-blue rounded-lg transition-all"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              type="submit"
              disabled={!message.trim() || isLoading}
              className="p-2 bg-oasis-blue hover:bg-oasis-blue-dark text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-oasis"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;