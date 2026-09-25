import React from 'react';
import {
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function ReservationsTable({
  reservations,
  onCheckInReservation
}) {
  const getReservationBadge = (status) => {
    switch (status) {
      case 'Em atendimento':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Em atendimento
          </span>
        );
      case 'Confirmada':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-500" />
            Confirmada
          </span>
        );
      case 'Aguardando':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500" />
            Aguardando
          </span>
        );
      case 'Concluída':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-500">
            Concluída
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Reservas de Hoje
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-full">
              {reservations.length} agendadas
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Organização de mesas e espaços para eventos
          </p>
        </div>

        <button
          onClick={() => alert("Modal de nova reserva manual aberto")}
          className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors"
        >
          + Nova reserva
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="px-4 py-3">Horário</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Pessoas</th>
              <th className="px-4 py-3">Mesa / Espaço</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reservations.map((res) => (
              <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                {/* Horário */}
                <td className="px-4 py-3 font-mono font-medium text-slate-800">
                  {res.time}
                </td>

                {/* Cliente */}
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">
                    {res.client}
                  </div>
                  {res.notes && (
                    <div className="text-[11px] text-slate-500 truncate max-w-[200px]" title={res.notes}>
                      {res.notes}
                    </div>
                  )}
                </td>

                {/* Pessoas */}
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-1 font-medium text-slate-700">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{res.people} pessoas</span>
                  </div>
                </td>

                {/* Mesa/Espaço */}
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-1.5 text-slate-800 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{res.space}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  {getReservationBadge(res.status)}
                </td>

                {/* Ação */}
                <td className="px-4 py-3 text-right">
                  {res.status === 'Confirmada' ? (
                    <button
                      onClick={() => onCheckInReservation(res.id)}
                      className="px-2 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      Check-in
                    </button>
                  ) : res.status === 'Aguardando' ? (
                    <button
                      onClick={() => onCheckInReservation(res.id)}
                      className="px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                    >
                      Confirmar
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400">Ok</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
