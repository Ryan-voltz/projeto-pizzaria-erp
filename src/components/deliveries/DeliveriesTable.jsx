import React, { useState } from 'react';
import {
  Bike,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Navigation,
  Eye,
  Phone
} from 'lucide-react';

export const deliveryStatusBadges = {
  'Aguardando entregador': 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
  'Entregador atribuído': 'bg-blue-50 text-blue-800 border-blue-200 font-semibold',
  'Em rota': 'bg-indigo-50 text-indigo-800 border-indigo-200 font-bold',
  'Entregue': 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
  'Cancelada': 'bg-rose-50 text-rose-700 border-rose-200 font-medium'
};

export default function DeliveriesTable({
  deliveries,
  onOpenCustomerTracking,
  onViewOnMap,
  onAssignCourier,
  onUpdateStatus
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = deliveries.filter(del => {
    if (filterStatus !== 'ALL' && del.status !== filterStatus) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchOrder = del.orderId.toLowerCase().includes(q);
      const matchClient = del.client.toLowerCase().includes(q);
      const matchCourier = del.courier?.toLowerCase().includes(q);
      if (!matchOrder && !matchClient && !matchCourier) return false;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    const badgeClass = deliveryStatusBadges[status] || 'bg-slate-100 text-slate-700';

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] border ${badgeClass}`}>
        {status === 'Em rota' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />}
        {status === 'Aguardando entregador' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
        {status === 'Entregue' && <CheckCircle2 className="w-3 h-3 text-slate-400" />}
        {status === 'Cancelada' && <XCircle className="w-3 h-3 text-rose-500" />}
        {status}
      </span>
    );
  };

  const getQuickAction = (del) => {
    switch (del.status) {
      case 'Aguardando entregador':
        return { label: 'Atribuir motoboy', action: () => onAssignCourier(del) };
      case 'Entregador atribuído':
        return { label: 'Despachar (Em rota)', action: () => onUpdateStatus(del.id, 'Em rota') };
      case 'Em rota':
        return { label: 'Confirmar entrega', action: () => onUpdateStatus(del.id, 'Entregue') };
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Filters Bar */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'Todas' },
            { id: 'Em rota', label: 'Em rota' },
            { id: 'Aguardando entregador', label: 'Aguardando' },
            { id: 'Entregador atribuído', label: 'Atribuídas' },
            { id: 'Entregue', label: 'Entregues' },
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

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar por pedido, cliente ou motoboy..."
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
              <th className="px-4 py-3.5">Pedido</th>
              <th className="px-4 py-3.5">Cliente & Destino</th>
              <th className="px-4 py-3.5">Entregador</th>
              <th className="px-4 py-3.5">Horário</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Tempo de Entrega</th>
              <th className="px-4 py-3.5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-xs text-slate-400">
                  Nenhuma entrega encontrada para os filtros selecionados.
                </td>
              </tr>
            ) : (
              filtered.map((del) => {
                const quickAction = getQuickAction(del);

                return (
                  <tr key={del.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Pedido */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-bold text-slate-900 font-mono">
                        {del.orderId}
                      </div>
                      <div className="text-[11px] text-slate-400 font-semibold">
                        {del.value}
                      </div>
                    </td>

                    {/* Cliente & Destino */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900">
                        {del.client}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-start gap-1 mt-0.5 truncate max-w-[220px]" title={del.address}>
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                        <span>{del.address}</span>
                      </div>
                    </td>

                    {/* Entregador */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {del.courier ? (
                        <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                          <Bike className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{del.courier}</span>
                        </div>
                      ) : (
                        <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 text-[11px]">
                          Não atribuído
                        </span>
                      )}
                    </td>

                    {/* Horário */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-mono text-slate-800 font-semibold text-xs">
                        {del.time}
                      </div>
                      {del.dispatchedAt && (
                        <div className="text-[10px] text-slate-400">
                          Saída: {del.dispatchedAt}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getStatusBadge(del.status)}
                    </td>

                    {/* Tempo de entrega */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-mono text-xs font-semibold text-slate-800">
                        {del.duration}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {del.estimatedArrival}
                      </div>
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {/* Ver no mapa */}
                        <button
                          onClick={() => onViewOnMap(del)}
                          className="p-1.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Destacar no mapa"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                        </button>

                        {/* Rastrear Cliente */}
                        <button
                          onClick={() => onOpenCustomerTracking(del)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors"
                          title="Abrir página de rastreamento do cliente"
                        >
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                          <span>Rastrear</span>
                        </button>

                        {/* Quick action button */}
                        {quickAction && (
                          <button
                            onClick={quickAction.action}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors ml-1"
                          >
                            {quickAction.label}
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
