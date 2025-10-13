// Classe utilitária para ocultar elementos visualmente, mas mantê-los acessíveis para screen readers
export const visuallyHiddenClass = 'visually-hidden';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative bg-white rounded-xl border border-border shadow-xl w-full animate-in fade-in-0 zoom-in-95",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 text-muted-foreground hover:bg-secondary"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export const ModalHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("p-6 pb-4 border-b border-border", className)}>
    <h2 className="text-lg font-semibold text-foreground">{children}</h2>
  </div>
);

export const ModalContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("p-6", className)}>{children}</div>
);

export const ModalFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex justify-end p-4 bg-slate-50 border-t border-border rounded-b-xl", className)}>
    {children}
  </div>
);

export default Modal;
