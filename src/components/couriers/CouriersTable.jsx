import React from 'react';
import {
  Bike,
  Phone,
  Edit2,
  CheckCircle2,
  Clock,
  Star,
  Check,
  Power
} from 'lucide-react';

export default function CouriersTable({
  couriers,
  onEditCourier,
  onToggleStatus
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Disponível':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Disponível
          </span>
        );
      case 'Em entrega':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Bike className="w-3 h-3 text-indigo-600" />
            Em entrega
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
            <Power className="w-3 h-3 text-slate-400" />
            Offline
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100">{status}</span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/90 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <th className="px-4 py-3.5">Nome & Veículo</th>
              <th className="px-4 py-3.5">Telefone</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Entregas Realizadas</th>
              <th className="px-4 py-3.5">Em Andamento</th>
              <th className="px-4 py-3.5">Última Atividade</th>
              <th className="px-4 py-3.5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {couriers.map((courier) => (
              <tr key={courier.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Nome & Veículo */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                      {courier.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{courier.name}</span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-600 font-mono">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>{courier.rating}</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {courier.vehicle} • {courier.plate}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Telefone */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1 font-mono text-slate-700">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{courier.phone}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  {getStatusBadge(courier.status)}
                </td>

                {/* Entregas realizadas */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="font-bold text-slate-900 text-sm">
                    {courier.completedToday} entregas
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Finalizadas hoje
                  </div>
                </td>

                {/* Entregas em andamento */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  {courier.activeDeliveries > 0 ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800">
                      {courier.activeDeliveries} ativa
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Nenhuma
                    </span>
                  )}
                </td>

                {/* Última atividade */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{courier.lastActive}</span>
                  </div>
                </td>

                {/* Ações */}
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5 justify-end">
                    {/* Toggle Status */}
                    <button
                      onClick={() =>
                        onToggleStatus(
                          courier.id,
                          courier.status === 'Disponível'
                            ? 'Offline'
                            : courier.status === 'Offline'
                            ? 'Disponível'
                            : 'Disponível'
                        )
                      }
                      className="px-2 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      title="Alternar disponibilidade"
                    >
                      {courier.status === 'Offline' ? 'Ficar Online' : 'Pausar'}
                    </button>

                    {/* Editar */}
                    <button
                      onClick={() => onEditCourier(courier)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                      title="Editar dados cadastrais"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
