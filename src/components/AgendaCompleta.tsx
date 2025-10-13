import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AgendaCompleta.css';
import { useDashboard } from '../hooks/useDashboard';
import CustomEvent from './CustomEvent';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

// Função para gerar dados mockados consistentes
const generateMockAppointments = (agendaHoje: any[]) => {
  const mockAppointments = [...agendaHoje];
  const today = moment();
  
  // Adiciona os dados de hoje com data/hora corretas
  agendaHoje.forEach(item => {
    const [hour, minute] = item.time.split(':');
    item.start = today.clone().hour(hour).minute(minute).toDate();
    item.end = moment(item.start).add(30, 'minutes').toDate();
  });

  // Adiciona mais dados aleatórios para outros dias
  for (let i = 1; i < 30; i++) {
    const date = today.clone().add(i, 'days');
    const hour = 9 + Math.floor(Math.random() * 8);
    const start = date.clone().hour(hour).minute(0).toDate();
    const end = moment(start).add(30, 'minutes').toDate();
    mockAppointments.push({
      id: 100 + i,
      time: moment(start).format('HH:mm'),
      patient: 'Paciente Aleatório',
      type: 'Consulta',
      specialty: 'Clínica Geral',
      status: 'agendado',
      start,
      end,
    });
  }
  return mockAppointments;
};

const AgendaCompleta: React.FC = () => {
  const [view, setView] = useState<View>(Views.WEEK);
  const { agendaHoje } = useDashboard();

  const allEvents = useMemo(() => {
    const mockData = generateMockAppointments(agendaHoje);
    return mockData.map((a: any) => ({
      id: a.id,
      title: `${a.patient} - ${a.type}`,
      start: a.start,
      end: a.end,
      resource: { status: a.status, specialty: a.specialty },
    }));
  }, [agendaHoje]);

  const handleView = useCallback((newView: View) => setView(newView), [setView]);

  const formats = {
    dateFormat: 'D',
    dayFormat: (date: Date, culture: any, localizer: any) => localizer.format(date, 'dddd', culture),
    dayHeaderFormat: (date: Date, culture: any, localizer: any) => localizer.format(date, 'dddd, D [de] MMMM', culture),
    monthHeaderFormat: (date: Date, culture: any, localizer: any) => localizer.format(date, 'MMMM [de] YYYY', culture),
    dayRangeHeaderFormat: ({ start, end }: { start: Date, end: Date }, culture: any, localizer: any) =>
      `${localizer.format(start, 'D [de] MMMM', culture)} - ${localizer.format(end, 'D [de] MMMM', culture)}`,
  };

  return (
    <div className="h-full flex-1">
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          date: "Data",
          time: "Hora",
          event: "Evento",
          showMore: total => `+${total} mais`,
        }}
        components={{
          event: CustomEvent,
        }}
        view={view}
        onView={handleView}
        formats={formats}
        defaultDate={new Date()}
      />
    </div>
  );
};

export default AgendaCompleta;
