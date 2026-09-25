import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Calendar as CalendarIcon,
  Printer,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { reservationStatusBadges } from './ReservationsList';

export default function ReservationsCalendar({
  reservations,
  onPrintReservation,
  onSelectDay
}) {
  const [selectedDate, setSelectedDate] = useState('25/09/2026');
  const [currentMonth, setCurrentMonth] = useState('Setembro 2026');

  // Days in September 2026
  // Sept 1st 2026 is Tuesday (2nd day of week)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const formattedDay = `${String(dayNum).padStart(2, '0')}/09/2026`;
    const count = reservations.filter(r => r.date === formattedDay && r.status !== 'Cancelada').length;
    return {
      day: dayNum,
      dateString: formattedDay,
      count
    };
  });

  const selectedDayReservations = reservations
    .filter(r => r.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* 1. Interactive Calendar Grid (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
        {/* Month Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-slate-900 text-sm">{currentMonth}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => alert('Visualização do mês anterior')}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedDate('25/09/2026')}
              className="px-2 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded hover:bg-emerald-100"
            >
              Hoje
            </button>
            <button
              onClick={() => alert('Visualização do próximo mês')}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <span>Dom</span>
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sáb</span>
        </div>

        {/* Month Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 py-1">
          {/* Offset for Tuesday (2 blank days: Sun, Mon) */}
          <div />
          <div />

          {daysInMonth.map((d) => {
            const isSelected = selectedDate === d.dateString;
            const isToday = d.dateString === '25/09/2026';

            return (
              <button
                key={d.day}
                onClick={() => setSelectedDate(d.dateString)}
                className={`h-16 p-1.5 rounded-xl border flex flex-col justify-between items-start transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs'
                    : isToday
                    ? 'border-slate-300 bg-slate-50/80 hover:border-emerald-400'
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold ${
                    isSelected ? 'text-emerald-900' : isToday ? 'text-emerald-700' : 'text-slate-700'
                  }`}>
                    {d.day}
                  </span>
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  )}
                </div>

                {d.count > 0 && (
                  <div className={`w-full text-left text-[10px] font-bold px-1 py-0.2 rounded truncate ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {d.count} res.
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Clique em qualquer data para inspecionar os horários de reservas</span>
          <span className="font-semibold text-slate-700">Data ativa: {selectedDate}</span>
        </div>
      </div>

      {/* 2. Selected Day Timeline / Schedule (5 cols) */}
      <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Reservas em {selectedDate}
              </h2>
              <p className="text-xs text-slate-500">
                Linha do tempo diária de ocupação
              </p>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-800 rounded-full">
              {selectedDayReservations.length} agendadas
            </span>
          </div>

          {/* Timeline List */}
          <div className="mt-4 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {selectedDayReservations.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Nenhuma reserva agendada para esta data.
              </div>
            ) : (
              selectedDayReservations.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-xl border border-slate-200/90 hover:border-emerald-300 hover:bg-slate-50/60 transition-all text-xs space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    {/* Exemplo solicitado: 18:00 — Mesa 04 — 4 pessoas */}
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="font-mono text-emerald-800">{res.time}</span>
                      <span>—</span>
                      <span className="text-slate-800">{res.table}</span>
                      <span>—</span>
                      <span className="text-slate-600 font-medium">{res.people} pessoas</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${reservationStatusBadges[res.status] || 'bg-slate-100'}`}>
                      {res.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-800">{res.client}</span>
                      <span>•</span>
                      <span>{res.space}</span>
                    </div>

                    <button
                      onClick={() => onPrintReservation(res)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Imprimir</span>
                    </button>
                  </div>

                  {res.notes && (
                    <div className="text-[10px] text-amber-800 bg-amber-50/80 px-2 py-1 rounded border border-amber-200/50">
                      Obs: {res.notes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Horário de funcionamento: 18h às 23h45</span>
          <span className="font-semibold text-emerald-800">Forno a Lenha Ativo</span>
        </div>
      </div>
    </div>
  );
}
