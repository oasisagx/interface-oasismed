import { useState } from 'react';

// Dados que simulam tempo real para demonstração
export const useDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [faturamentoDiario] = useState(41580);
  const [pacientesAtivos] = useState(80);
  const [satisfacao] = useState(4.9);

  // Dados de agenda em tempo real
  const getAgendaHoje = () => {
    const agenda = [
      { 
        id: 1, 
        time: '09:30', 
        patient: 'Daniel Souza', 
        type: 'Retorno',
        specialty: 'Clínica Geral',
        status: 'agendado'
      },
      { 
        id: 2, 
        time: '11:20', 
        patient: 'Maria Silva', 
        type: 'Primeira Consulta',
        specialty: 'Cardiologia',
        status: 'agendado'
      },
      { 
        id: 3, 
        time: '08:15', 
        patient: 'João Santos', 
        type: 'Primeira Consulta',
        specialty: 'Clínica Geral',
        status: 'cancelado'
      },
      { 
        id: 4, 
        time: '15:00', 
        patient: 'Ana Costa', 
        type: 'Retorno',
        specialty: 'Cardiologia',
        status: 'agendado'
      },
      { 
        id: 5, 
        time: '15:30', 
        patient: 'Carlos Lima', 
        type: 'Primeira Consulta',
        specialty: 'Pediatria',
        status: 're-agendado'
      }
    ];
    return agenda.sort((a, b) => a.time.localeCompare(b.time));
  };

  // Status do sistema em tempo real
  const getStatusSistema = () => {
    const salasOcupadas = 2; // Valor fixo para "otimismo"

    return {
      salasOcupadas: salasOcupadas,
      totalSalas: 3, 
      tempoMedio: '28 min',
    };
  };

  const agenda = getAgendaHoje();
  const consultasHoje = agenda.filter(a => a.status !== 'cancelado').length;

  return {
    metrics: [
      { 
        title: 'Consultas Restantes do Dia', 
        value: consultasHoje.toString(), 
        change: null, 
        icon: 'Activity',
        color: 'blue' as const
      },
      { 
        title: 'Pacientes Ativos', 
        value: pacientesAtivos.toLocaleString(), 
        change: null,
        icon: 'Users',
        color: 'purple' as const
      },
      { 
        title: 'Satisfação do Paciente', 
        value: satisfacao.toFixed(1),
        icon: 'Heart',
        color: 'red' as const
      },
      { 
        title: 'Faturamento da Semana', 
        value: `R$ ${faturamentoDiario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
        change: '+12%',
        icon: 'TrendingUp',
        color: 'green' as const
      },
    ],
    agendaHoje: agenda,
    statusSistema: getStatusSistema(),
    isLoading: false,
    error: null,
    lastUpdated: currentTime,
    refreshData: () => {
      setCurrentTime(new Date());
    }
  };
};
