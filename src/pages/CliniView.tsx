import React, { useState, Suspense } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import ScheduleModal from '../components/ScheduleModal';
import ChartFallback from '../components/ChartFallback';
import { 
  Loader2, 
  Calendar,
  Users,
  Activity,
  TrendingUp,
  Heart
} from 'lucide-react';

// Lazy load charts para melhor performance
const ConsultasChart = React.lazy(() => import('../components/charts/ConsultasChart').then(module => ({ default: module.ConsultasChart })));
const EspecialidadeChart = React.lazy(() => import('../components/charts/EspecialidadeChart').then(module => ({ default: module.EspecialidadeChart })));
const QualidadeChart = React.lazy(() => import('../components/charts/QualidadeChart').then(module => ({ default: module.QualidadeChart })));

const CliniView: React.FC = () => {
  const { metrics, agendaHoje, statusSistema, isLoading } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (_status: string) => {
    return 'bg-slate-100 text-slate-600';
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

      <div className="px-6 pt-6 pb-6">
        {/* Métricas que mudam em tempo real */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
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
            <Suspense fallback={<ChartFallback />}>
              <ConsultasChart />
            </Suspense>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Suspense fallback={<ChartFallback height="h-48" />}>
                <EspecialidadeChart />
              </Suspense>
              <Suspense fallback={<ChartFallback height="h-48" />}>
                <QualidadeChart />
              </Suspense>
            </div>
          </div>

          {/* Sidebar com dados em tempo real */}
          <div className="space-y-6">
            
            {/* Agenda do dia - dados dinâmicos */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-900">Agenda de Hoje</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
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

            {/* Status de Ocupação */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Status de Ocupação</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Salas ocupadas</span>
                  <span className="text-sm font-medium text-slate-900">
                    {statusSistema.salasOcupadas}/{statusSistema.totalSalas}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tempo médio de Consulta</span>
                  <span className="font-medium text-slate-900">{statusSistema.tempoMedio}</span>
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
