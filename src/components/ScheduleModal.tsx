import React from 'react';
import { X } from 'lucide-react';
import AgendaCompleta from './AgendaCompleta';

interface ScheduleModalProps {
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90%] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="font-semibold text-lg text-slate-800">Agenda Completa</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full" aria-label="Fechar modal">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <AgendaCompleta />
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
