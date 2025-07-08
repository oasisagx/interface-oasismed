import React from 'react';

interface SuggestionCardProps {
  text: string;
  onClick?: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-card hover:bg-oasis-blue-light border border-border hover:border-oasis-blue rounded-lg p-4 text-left transition-all duration-200 w-full shadow-oasis hover:shadow-oasis-lg hover-lift group"
    >
      <p className="text-sm text-muted-foreground leading-relaxed font-medium group-hover:text-oasis-blue">{text}</p>
    </button>
  );
};

export default SuggestionCard;