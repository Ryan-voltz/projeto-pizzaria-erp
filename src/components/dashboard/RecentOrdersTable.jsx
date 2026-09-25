import React, { useState } from 'react';
import {
  Printer,
  ChevronRight,
  Clock,
  CreditCard,
  Banknote,
  QrCode,
  Flame,
  CheckCircle,
  Truck,
  RotateCcw,
  Eye,
  Filter
} from 'lucide-react';

export default function RecentOrdersTable({
  orders,
  onPrintOrder,
  onUpdateStatus,
  onViewOrderDetails
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'ACTIVE') return ['Em preparo', 'No forno', 'Em entrega', 'Pronto'].includes(order.status);
    return order.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Em preparo':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
            Em preparo
          </span>
        );
      case 'No forno':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <Flame className="w-3 h-3 text-orange-500" />
            No forno
          </span>
        );
      case 'Pronto':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Pronto
          </span>
        );
      case 'Em entrega':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3 h-3 text-blue-500" />
            Em entrega
          </span>
        );
      case 'Entregue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <CheckCircle className="w-3 h-3 text-slate-400" />
            Entregue
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

  const getPaymentIcon = (method) => {
    if (method.toLowerCase().includes('pix')) return <QrCode className="w-3.5 h-3.5 text-emerald-600" />;
    if (method.toLowerCase().includes('cartão') || method.toLowerCase().includes('card')) return <CreditCard className="w-3.5 h-3.5 text-blue-600" />;
    return <Banknote className="w-3.5 h-3.5 text-slate-600" />;
  };

  const getNextStatus = (current) => {
    switch (current) {
      case 'Em preparo': return 'No forno';
      case 'No forno': return 'Pronto';
      case 'Pronto': return 'Em entrega';
      case 'Em entrega': return 'Entregue';
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header of Table */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Pedidos Recentes
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              {orders.length} hoje
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Fluxo operacional contínuo com envio para forno e entrega
          </p>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'ACTIVE', label: 'Em andamento' },
            { id: 'Em preparo', label: 'Preparo' },
            { id: 'No forno', label: 'Forno' },
            { id: 'Em entrega', label: 'Entrega' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filterStatus === f.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 bg-slate-50 border border-slate-200/60'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Horário</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3">Forma de Pagamento</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-xs text-slate-400">
                  Nenhum pedido encontrado para o filtro selecionado.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const next = getNextStatus(order.status);

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Pedido */}
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{order.id}</span>
                        {order.channel === 'WhatsApp IA' && (
                          <span className="px-1 py-0.2 text-[9px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                            IA
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {order.type}
                      </div>
                    </td>

                    {/* Cliente */}
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {order.client}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[170px]" title={order.items.map(i => i.name).join(', ')}>
                        {order.items.map(i => i.name).join(', ')}
                      </div>
                    </td>

                    {/* Horário */}
                    <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">
                      {order.time}
                    </td>

                    {/* Valor */}
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {order.formattedValue}
                    </td>

                    {/* Forma de Pagamento */}
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center gap-1.5 text-slate-700">
                        {getPaymentIcon(order.paymentMethod)}
                        <span className="text-[11px] font-medium">{order.paymentMethod}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1 justify-end">
                        {/* Print Docket */}
                        <button
                          onClick={() => onPrintOrder(order)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          title="Imprimir comanda térmica"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        {/* View Details */}
                        <button
                          onClick={() => onViewOrderDetails(order)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          title="Ver detalhes do pedido"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Advance Status Button */}
                        {next && (
                          <button
                            onClick={() => onUpdateStatus(order.id, next)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-md transition-colors ml-1"
                            title={`Avançar status para: ${next}`}
                          >
                            <span>{next}</span>
                            <ChevronRight className="w-3 h-3" />
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
