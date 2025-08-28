import React, { useState } from 'react';
import { ConsultasChart } from '../components/charts/ConsultasChart';
import { EspecialidadeChart } from '../components/charts/EspecialidadeChart';
import { QualidadeChart } from '../components/charts/QualidadeChart';
import { useDashboard } from '../hooks/useDashboard';
import ScheduleModal from '../components/ScheduleModal';
import { 
  Loader2, 
  RefreshCw, 
  Calendar,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Heart,
  Wifi
} from 'lucide-react';

const CliniView: React.FC = () => {
  const { metrics, agendaHoje, statusSistema, isLoading, refreshData, lastUpdated } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-green-100 text-green-700';
      case 're-agendado': return 'bg-yellow-100 text-yellow-700';
      case 'cancelado': return 'bg-red-100 text-red-700';
      case 'andamento': return 'bg-blue-100 text-blue-700';
      case 'concluída': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      'agendado': 'Agendado',
      're-agendado': 'Re-agendado',
      'cancelado': 'Cancelado',
      'andamento': 'Em atendimento',
      'concluída': 'Concluída'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getIconForMetric = (iconName: string) => {
    const icons = {
      'Activity': Activity,
      'TrendingUp': TrendingUp,
      'Users': Users,
      'Heart': Heart
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Activity;
    return <IconComponent className="w-5 h-5 text-slate-500" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-auto">
      {isModalOpen && <ScheduleModal onClose={() => setIsModalOpen(false)} />}

      {/* Thin divider instead of header */}
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500">
              Atualizado às {lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Métricas que mudam em tempo real */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                {getIconForMetric(metric.icon)}
                {metric.change && (
                  <span className="text-xs text-green-600 font-medium">{metric.change}</span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {metric.title === 'Satisfação' ? metric.value.replace('★', '') : metric.value}
                </p>
                <p className="text-sm text-slate-600">{metric.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Gráficos principais */}
          <div className="xl:col-span-2 space-y-6">
            <ConsultasChart />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EspecialidadeChart />
              <QualidadeChart />
            </div>
          </div>

          {/* Sidebar com dados em tempo real */}
          <div className="space-y-6">
            
            {/* Agenda do dia - dados dinâmicos */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-900">Agenda de Hoje</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {agendaHoje.length} consultas
                </span>
              </div>
              
              <div className="space-y-3">
                {agendaHoje.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900">{appointment.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <p className="font-medium text-slate-800">{appointment.patient}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-slate-600">{appointment.type}</span>
                      <span className="text-xs text-slate-500">{appointment.specialty}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-3 py-2 text-sm text-oasis-blue hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Ver agenda completa
              </button>
            </div>

            {/* Status do sistema em tempo real */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Status da Clínica</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-700">Sistema Online</span>
                  </div>
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Salas ocupadas</span>
                  <span className="text-sm font-medium text-slate-900">
                    {statusSistema.salasOcupadas}/{statusSistema.totalSalas}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Próxima consulta</span>
                  <span className="text-sm font-medium text-oasis-blue">
                    {statusSistema.proximaConsulta}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${statusSistema.horarioFuncionamento ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm text-slate-600">
                      {statusSistema.horarioFuncionamento ? 'Horário comercial' : 'Fora do horário'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo rápido */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-semibold text-slate-900 mb-3">Resumo do Dia</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Taxa de ocupação</span>
                  <span className="font-medium text-slate-900">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Consultas restantes</span>
                  <span className="font-medium text-slate-900">
                    {agendaHoje.filter(a => a.status === 'agendado').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tempo médio</span>
                  <span className="font-medium text-slate-900">28 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CliniView;
