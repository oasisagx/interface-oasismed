import React from 'react';
import { EventProps } from 'react-big-calendar';

interface MyEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: {
    status: string;
    specialty: string;
  };
}

const getStatusColorClass = (status: string) => {
  switch (status) {
    case 'concluída':
      return 'bg-green-500'; // Usando a cor base do Tailwind para sucesso
    case 'cancelado':
    case 're-agendado':
      return 'bg-gray-400'; // Cinza para status neutros/negativos
    case 'agendado':
    default:
      return 'bg-oasis-blue'; // Azul Oasis para agendado
  }
};

const CustomEvent: React.FC<EventProps<MyEvent>> = ({ event }) => {
  if (!event.resource) {
    return <div>{event.title}</div>;
  }

  const colorClass = getStatusColorClass(event.resource.status);

  return (
    <div className="flex items-center h-full text-xs">
      <span className={`w-1 h-full rounded-l-sm mr-2 ${colorClass}`}></span>
      <span className="truncate font-medium text-slate-700">{event.title}</span>
    </div>
  );
};

export default CustomEvent;
