import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-oasis-blue shadow-oasis' : 'bg-muted'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Message */}
        <div className={`rounded-lg p-4 ${
          isUser 
            ? 'bg-oasis-blue text-white shadow-oasis' 
            : 'bg-muted text-muted-foreground'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <p className={`text-xs mt-2 ${
            isUser ? 'text-white/70' : 'text-muted-foreground/70'
          }`}>
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;