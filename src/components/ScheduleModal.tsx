import React from 'react';
import { X } from 'lucide-react';

interface ScheduleModalProps {
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="font-semibold text-lg text-slate-800">Agenda Completa</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <p className="text-slate-500">Componente de calendário (Google Agenda) será implementado aqui.</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
