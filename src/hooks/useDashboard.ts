import { useState, useEffect } from 'react';

// Dados que simulam tempo real para demonstração
export const useDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [faturamentoDiario, setFaturamentoDiario] = useState(41580);
  const [pacientesAtivos, setPacientesAtivos] = useState(80);
  const [satisfacao, setSatisfacao] = useState(4.9);

  // Dados de agenda em tempo real
  const getAgendaHoje = () => {
    const agenda = [
      { 
        id: 1, 
        time: '09:30', 
        patient: 'Daniel Souza', 
        type: 'Retorno',
        specialty: 'Ortopedia',
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
        specialty: 'Dermatologia',
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
    const agenda = getAgendaHoje();
    const consultasAtivas = agenda.filter(a => a.status !== 'cancelado');
    
    // Simulação: 1 sala ocupada para cada 2 consultas ativas
    const salasOcupadas = Math.ceil(consultasAtivas.length / 2);

    return {
      salasOcupadas: salasOcupadas,
      totalSalas: 10, // Mantemos um número fixo para o total de salas
      tempoMedio: '28 min', // Valor fixo e defensável
    };
  };

  const getProximaConsulta = () => {
    const agenda = getAgendaHoje();
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    for (const consulta of agenda) {
      const [hour, minute] = consulta.time.split(':').map(Number);
      const consultaTime = hour * 60 + minute;
      
      if (consultaTime > currentTime) {
        return consulta.time;
      }
    }
    
    return '16:00'; // Fallback
  };

  const agenda = getAgendaHoje();
  const consultasHoje = agenda.filter(a => a.status !== 'cancelado').length;

  return {
    metrics: [
      { 
        title: 'Consultas Hoje', 
        value: consultasHoje.toString(), 
        change: null, 
        icon: 'Activity',
        color: 'blue' as const
      },
      { 
        title: 'Faturamento Semanal', 
        value: `R$ ${faturamentoDiario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
        change: '+12%',
        icon: 'TrendingUp',
        color: 'green' as const
      },
      { 
        title: 'Pacientes Ativos', 
        value: pacientesAtivos.toLocaleString(), 
        change: null,
        icon: 'Users',
        color: 'purple' as const
      },
      { 
        title: 'Satisfação', 
        value: `${satisfacao.toFixed(1)}★`,
        icon: 'Heart',
        color: 'red' as const
      },
    ],
    agendaHoje: agenda,
    statusSistema: getStatusSistema(),
    isLoading: false,
    error: null,
    lastUpdated: currentTime,
    refreshData: () => {
      // Simula refresh instantâneo
      setCurrentTime(new Date());
    }
  };
};
