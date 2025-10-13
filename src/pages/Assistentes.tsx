import React from 'react';
import { useNavigate } from 'react-router-dom';
import AssistantCard from '../components/AssistantCard';
import { Mic, Bot } from 'lucide-react';

const Assistentes: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/assistentes/transcricao');
  };

  return (
    <div className="flex-1 bg-background p-8 pt-32">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-[-180px]">
          <AssistantCard
            title="Transcrição de Consulta"
            description="Grave e transcreva suas consultas para diversos formatos de texto"
            status="active"
            icon={Mic}
            onClick={handleCardClick}
          />
          <AssistantCard
            title="Assistente 02"
            description="Em breve"
            status="coming-soon"
            icon={Bot}
          />
          <AssistantCard
            title="Assistente 03"
            description="Em breve"
            status="coming-soon"
            icon={Bot}
          />
        </div>
      </div>
    </div>
  );
};

export default Assistentes;
