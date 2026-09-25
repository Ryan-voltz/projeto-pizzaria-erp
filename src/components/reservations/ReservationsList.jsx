import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Printer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Check,
  RotateCcw,
  Sparkles,
  Phone
} from 'lucide-react';

export const reservationStatusBadges = {
  'Pendente': 'bg-amber-50 text-amber-800 border-amber-200',
  'Confirmada': 'bg-blue-50 text-blue-700 border-blue-200',
  'Em andamento': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Finalizada': 'bg-slate-100 text-slate-600 border-slate-200',
  'Cancelada': 'bg-rose-50 text-rose-700 border-rose-200'
};

export default function ReservationsList({
  reservations,
  onPrintReservation,
  onUpdateStatus,
  onCancelReservation
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = reservations.filter(res => {
    if (filterStatus !== 'ALL' && res.status !== filterStatus) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = res.client.toLowerCase().includes(q);
      const matchPhone = res.phone.includes(q);
      const matchTable = res.table?.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchTable) return false;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    const badgeClass = reservationStatusBadges[status] || 'bg-slate-100 text-slate-700';

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badgeClass}`}>
        {status === 'Em andamento' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
        {status === 'Confirmada' && <Check className="w-3 h-3 text-blue-600" />}
        {status === 'Pendente' && <Clock className="w-3 h-3 text-amber-600" />}
        {status === 'Finalizada' && <CheckCircle2 className="w-3 h-3 text-slate-500" />}
        {status === 'Cancelada' && <XCircle className="w-3 h-3 text-rose-500" />}
        {status}
      </span>
    );
  };

  const getNextAction = (res) => {
    switch (res.status) {
      case 'Pendente':
        return { label: 'Confirmar', next: 'Confirmada', color: 'blue' };
      case 'Confirmada':
        return { label: 'Check-in (Entrou)', next: 'Em andamento', color: 'emerald' };
      case 'Em andamento':
        return { label: 'Finalizar', next: 'Finalizada', color: 'slate' };
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header Filter Row */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'Todas' },
            { id: 'Confirmada', label: 'Confirmadas' },
            { id: 'Em andamento', label: 'Em andamento' },
            { id: 'Pendente', label: 'Pendentes' },
            { id: 'Finalizada', label: 'Finalizadas' },
            { id: 'Cancelada', label: 'Canceladas' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filterStatus === f.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar por cliente, fone ou mesa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/90 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <th className="px-4 py-3.5">Cliente</th>
              <th className="px-4 py-3.5">Data & Horário</th>
              <th className="px-4 py-3.5">Pessoas</th>
              <th className="px-4 py-3.5">Mesa / Espaço</th>
              <th className="px-4 py-3.5">Tipo</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-xs text-slate-400">
                  Nenhuma reserva encontrada para os filtros selecionados.
                </td>
              </tr>
            ) : (
              filtered.map((res) => {
                const nextAction = getNextAction(res);

                return (
                  <tr key={res.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cliente */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">
                        {res.client}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{res.phone}</span>
                      </div>
                      {res.notes && (
                        <div className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded mt-1 border border-amber-200/60 truncate max-w-[220px]" title={res.notes}>
                          {res.notes}
                        </div>
                      )}
                    </td>

                    {/* Data & Horário */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-mono text-xs font-bold text-slate-900">
                        {res.time}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {res.date}
                      </div>
                    </td>

                    {/* Quantidade de pessoas */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1 font-semibold text-slate-800">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{res.people} pessoas</span>
                      </div>
                    </td>

                    {/* Mesa / Espaço */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-emerald-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{res.table}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[160px]" title={res.space}>
                        {res.space}
                      </div>
                    </td>

                    {/* Tipo de reserva */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                        {res.type}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getStatusBadge(res.status)}
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {/* Imprimir reserva */}
                        <button
                          onClick={() => onPrintReservation(res)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors"
                          title="Imprimir comprovante de reserva"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-500" />
                          <span>Imprimir</span>
                        </button>

                        {/* Quick Action Button */}
                        {nextAction && (
                          <button
                            onClick={() => onUpdateStatus(res.id, nextAction.next)}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-md transition-colors"
                          >
                            {nextAction.label}
                          </button>
                        )}

                        {/* Cancel Button */}
                        {res.status !== 'Finalizada' && res.status !== 'Cancelada' && (
                          <button
                            onClick={() => onCancelReservation(res.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Cancelar reserva"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
