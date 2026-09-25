import React from 'react';
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
  AlertCircle,
  Sparkles,
  Bike,
  XCircle,
  Check
} from 'lucide-react';

export default function OrdersTable({
  orders,
  onSelectOrder,
  onPrintOrder,
  onQuickAdvanceStatus,
  selectedOrderId
}) {
  const getStatusBadge = (status, isUnread) => {
    switch (status) {
      case 'Novo':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
            Novo Pedido
          </span>
        );
      case 'Confirmado':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Check className="w-3 h-3 text-blue-500" />
            Confirmado
          </span>
        );
      case 'Em preparo':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            Em preparo
          </span>
        );
      case 'Pronto':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Pronto
          </span>
        );
      case 'Saiu para entrega':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Bike className="w-3 h-3 text-indigo-500" />
            Saiu para entrega
          </span>
        );
      case 'Entregue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <CheckCircle className="w-3 h-3 text-slate-400" />
            Entregue
          </span>
        );
      case 'Cancelado':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-500" />
            Cancelado
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

  const getQuickAction = (status) => {
    switch (status) {
      case 'Novo': return { label: 'Confirmar', next: 'Confirmado', color: 'emerald' };
      case 'Confirmado': return { label: 'Iniciar Preparo', next: 'Em preparo', color: 'amber' };
      case 'Em preparo': return { label: 'Marcar Pronto', next: 'Pronto', color: 'emerald' };
      case 'Pronto': return { label: 'Despachar', next: 'Saiu para entrega', color: 'indigo' };
      case 'Saiu para entrega': return { label: 'Concluir Entrega', next: 'Entregue', color: 'slate' };
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/90 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <th className="px-4 py-3.5">Pedido</th>
              <th className="px-4 py-3.5">Cliente</th>
              <th className="px-4 py-3.5">Itens</th>
              <th className="px-4 py-3.5">Horário</th>
              <th className="px-4 py-3.5">Valor</th>
              <th className="px-4 py-3.5">Pagamento</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-xs text-slate-400">
                  Nenhum pedido encontrado para os filtros selecionados.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isSelected = selectedOrderId === order.id;
                const quickAction = getQuickAction(order.status);
                const itemsCount = order.items.reduce((acc, curr) => acc + curr.qty, 0);

                return (
                  <tr
                    key={order.id}
                    onClick={() => onSelectOrder(order)}
                    className={`cursor-pointer transition-colors ${
                      order.isUnread
                        ? 'bg-emerald-50/40 hover:bg-emerald-50/70 border-l-4 border-l-emerald-600'
                        : isSelected
                        ? 'bg-slate-100/90'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Pedido */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {order.isUnread && (
                          <span
                            className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"
                            title="Pedido novo não lido"
                          />
                        )}
                        <div>
                          <div className="font-bold text-slate-900 font-mono flex items-center gap-1.5">
                            <span>{order.id}</span>
                            {order.channel === 'WhatsApp IA' && (
                              <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                                IA
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {order.type}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cliente */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">
                        {order.client}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {order.phone}
                      </div>
                    </td>

                    {/* Itens */}
                    <td className="px-4 py-3.5">
                      <div className="text-slate-800 font-medium truncate max-w-[200px]" title={order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}>
                        {order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {itemsCount} {itemsCount > 1 ? 'itens' : 'item'}
                      </div>
                    </td>

                    {/* Horário */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-mono text-slate-700 text-xs font-semibold">
                        {order.time}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {order.date}
                      </div>
                    </td>

                    {/* Valor */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-bold text-slate-900">
                        {order.formattedValue}
                      </div>
                      {order.deliveryFee > 0 && (
                        <div className="text-[10px] text-slate-400">
                          Taxa: R$ {order.deliveryFee.toFixed(2).replace('.', ',')}
                        </div>
                      )}
                    </td>

                    {/* Pagamento */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 text-slate-800 font-medium">
                        {getPaymentIcon(order.paymentMethod)}
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className={`text-[10px] ${
                        order.paymentStatus === 'Pago'
                          ? 'text-emerald-700 font-medium'
                          : 'text-amber-700 font-medium'
                      }`}>
                        {order.paymentStatus}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getStatusBadge(order.status, order.isUnread)}
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {/* Imprimir */}
                        <button
                          onClick={() => onPrintOrder(order)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          title="Imprimir comanda térmica"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        {/* Detalhes */}
                        <button
                          onClick={() => onSelectOrder(order)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          title="Ver detalhes completos"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Quick Status Action Button */}
                        {quickAction && (
                          <button
                            onClick={() => onQuickAdvanceStatus(order.id, quickAction.next)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-md transition-colors ml-1"
                            title={`Avançar para: ${quickAction.next}`}
                          >
                            <span>{quickAction.label}</span>
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
