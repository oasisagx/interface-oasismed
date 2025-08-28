import { useState, useEffect } from 'react';

// Dados que simulam tempo real para demonstração
export const useDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [consultasDiarias, setConsultasDiarias] = useState(18);
  const [faturamentoDiario, setFaturamentoDiario] = useState(3850);
  const [pacientesAtivos, setPacientesAtivos] = useState(356);
  const [satisfacao, setSatisfacao] = useState(4.6);

  // Simula mudanças em tempo real para demonstração
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Pequenas variações nos números para parecer tempo real
      setConsultasDiarias(prev => {
        const variation = Math.random() > 0.8 ? 1 : 0;
        return Math.min(prev + variation, 30);
      });
      
      setFaturamentoDiario(prev => {
        const variation = Math.random() * 100 - 50;
        return Math.max(prev + variation, 2500);
      });
      
      setPacientesAtivos(prev => {
        const variation = Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(prev + variation, 350);
      });
    }, 5000); // Atualiza a cada 5 segundos - mais natural

    return () => clearInterval(interval);
  }, []);

  // Dados de agenda em tempo real
  const getAgendaHoje = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const agenda = [
      { 
        id: 1, 
        time: '14:00', 
        patient: 'Maria Silva', 
        type: 'Retorno',
        specialty: 'Cardiologia',
        status: 'concluída'
      },
      { 
        id: 2, 
        time: '14:30', 
        patient: 'João Santos', 
        type: 'Consulta',
        specialty: 'Clínica Geral',
        status: 'cancelado'
      },
      { 
        id: 3, 
        time: '15:00', 
        patient: 'Ana Costa', 
        type: 'Exame',
        specialty: 'Dermatologia',
        status: 'agendado'
      },
      { 
        id: 4, 
        time: '15:30', 
        patient: 'Carlos Lima', 
        type: 'Consulta',
        specialty: 'Pediatria',
        status: 'agendado'
      },
      { 
        id: 5, 
        time: '16:00', 
        patient: 'Fernanda Souza', 
        type: 'Consulta',
        specialty: 'Ginecologia',
        status: 're-agendado'
      }
    ];

    // Lógica para tornar os status dinâmicos baseados na hora atual
    return agenda.map(item => {
      if (item.status === 'cancelado' || item.status === 'concluída' || item.status === 're-agendado') return item;

      const [hour, minute] = item.time.split(':').map(Number);
      const itemTime = hour * 100 + minute;
      const nowTime = currentHour * 100 + currentMinute;

      if (nowTime >= itemTime) {
        return { ...item, status: 'concluída' };
      }
      return item;
    });
  };

  // Status do sistema em tempo real
  const getStatusSistema = () => {
    const now = new Date();
    const isBusinessHours = now.getHours() >= 8 && now.getHours() <= 18;
    
    return {
      sistemaOnline: true,
      salasOcupadas: Math.floor(Math.random() * 3) + 5, // 5-7 salas
      totalSalas: 10,
      proximaConsulta: getProximaConsulta(),
      horarioFuncionamento: isBusinessHours
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

  return {
    metrics: [
      { 
        title: 'Consultas Hoje', 
        value: consultasDiarias.toString(), 
        change: '+8%', 
        icon: 'Activity',
        color: 'blue' as const
      },
      { 
        title: 'Faturamento', 
        value: `R$ ${(faturamentoDiario/1000).toFixed(1)}k`, 
        change: '+12%',
        icon: 'TrendingUp',
        color: 'green' as const
      },
      { 
        title: 'Pacientes Ativos', 
        value: pacientesAtivos.toLocaleString(), 
        change: '+5%',
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
    agendaHoje: getAgendaHoje(),
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
