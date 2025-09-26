import React from 'react';
import { useNavigate } from 'react-router-dom';
import AssistantCard from '../components/AssistantCard';
import { Mic, Wand2 } from 'lucide-react';

const Assistentes: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/assistentes/transcricao');
  };

  return (
    <div className="flex-1 bg-background p-8 pt-32">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AssistantCard
            title="Transcrição de Consulta"
            description="Transcreva áudio de consultas em texto estruturado."
            status="active"
            icon={Mic}
            onClick={handleCardClick}
          />
          <AssistantCard
            title="Análise de Exames"
            description="Em breve"
            status="coming-soon"
            icon={Wand2}
          />
          <AssistantCard
            title="Sugestão de Diagnóstico"
            description="Em breve"
            status="coming-soon"
            icon={Wand2}
          />
        </div>
      </div>
    </div>
  );
};

export default Assistentes;
