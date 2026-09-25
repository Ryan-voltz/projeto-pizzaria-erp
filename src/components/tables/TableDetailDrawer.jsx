import React, { useState } from 'react';
import {
  X,
  Armchair,
  Users,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  UtensilsCrossed,
  FileText
} from 'lucide-react';

export default function TableDetailDrawer({
  table,
  isOpen,
  onClose,
  onUpdateTableStatus,
  onStartService,
  onFreeTable
}) {
  const [selectedStatus, setSelectedStatus] = useState(table?.status || 'Livre');

  if (!isOpen || !table) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Livre':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Livre</span>;
      case 'Ocupada':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-white">Ocupada</span>;
      case 'Reservada':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Reservada</span>;
      case 'Em atendimento':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Em atendimento</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-11 h-11 rounded-xl text-white font-bold text-sm shadow-xs ${
              table.status === 'Livre'
                ? 'bg-emerald-700'
                : table.status === 'Reservada'
                ? 'bg-amber-600'
                : table.status === 'Em atendimento'
                ? 'bg-blue-600'
                : 'bg-slate-800'
            }`}>
              {table.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{table.name}</h2>
                {getStatusBadge(table.status)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{table.location}</span>
                <span>•</span>
                <span>{table.capacity} lugares</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Active Occupation / Bill Info */}
          {table.currentClient ? (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Ocupação Atual
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {table.currentClient}
                  </div>
                  {table.waiter && (
                    <div className="text-[11px] text-slate-500">
                      Garçom: {table.waiter}
                    </div>
                  )}
                </div>

                {table.currentBill && (
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Total da Comanda</div>
                    <div className="text-base font-bold text-emerald-800">
                      {table.currentBill}
                    </div>
                  </div>
                )}
              </div>

              {table.items && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Consumo lançado: </span>
                  {table.items}
                </div>
              )}

              {table.occupiedSince && (
                <div className="text-[10px] text-slate-400 font-mono">
                  Mesa aberta às {table.occupiedSince}
                </div>
              )}
            </div>
          ) : table.status === 'Reservada' ? (
            <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Reserva Vinculada
              </div>
              <div className="font-bold text-slate-900 text-sm">
                Cliente: {table.currentClient || 'Reserva agendada'}
              </div>
              <div className="text-xs text-amber-900 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Horário previsto: {table.reservationTime || '20:30'} ({table.people || table.capacity} pessoas)</span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-center space-y-1">
              <div className="font-bold text-emerald-950 text-sm">Mesa Disponível</div>
              <p className="text-emerald-800 text-[11px]">
                Pronta para receber clientes imediatamente. Capacidade para até {table.capacity} lugares.
              </p>
            </div>
          )}

          {/* Quick Actions List */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Ações Operacionais
            </div>

            <div className="space-y-2">
              {table.status !== 'Em atendimento' && table.status !== 'Ocupada' && (
                <button
                  onClick={() => onStartService(table.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/80 text-blue-900 font-semibold transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-blue-700" />
                    <span>Iniciar Atendimento</span>
                  </div>
                  <span className="text-[11px] text-blue-700">Ocupar & Abrir comanda</span>
                </button>
              )}

              {table.status !== 'Livre' && (
                <button
                  onClick={() => onFreeTable(table.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/80 text-emerald-900 font-semibold transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Liberar Mesa</span>
                  </div>
                  <span className="text-[11px] text-emerald-700">Fechar comanda e limpar</span>
                </button>
              )}
            </div>
          </div>

          {/* Manual Status Select */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Alterar Status Manualmente
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Livre', 'Ocupada', 'Reservada', 'Em atendimento'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onUpdateTableStatus(table.id, st)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                    table.status === st
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg shadow-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
