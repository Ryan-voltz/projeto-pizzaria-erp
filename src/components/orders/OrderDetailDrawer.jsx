import React, { useState } from 'react';
import {
  X,
  Printer,
  User,
  Phone,
  MapPin,
  CreditCard,
  Clock,
  ShoppingBag,
  Truck,
  Bike,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Check,
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';

const fullTimelineStages = [
  'Pedido recebido',
  'Pedido confirmado',
  'Em preparo',
  'Pronto',
  'Saiu para entrega',
  'Entregue'
];

export default function OrderDetailDrawer({
  order,
  isOpen,
  onClose,
  onPrint,
  onUpdateStatus,
  onOpenAssignCourier,
  onCancelOrder
}) {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || 'Novo');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReasonInput, setCancelReasonInput] = useState('');

  if (!isOpen || !order) return null;

  // Determine stage completion for timeline
  const getStageIndex = (status) => {
    switch (status) {
      case 'Novo': return 0;
      case 'Confirmado': return 1;
      case 'Em preparo': return 2;
      case 'Pronto': return 3;
      case 'Saiu para entrega': return 4;
      case 'Entregue': return 5;
      case 'Cancelado': return -1;
      default: return 0;
    }
  };

  const currentStageIndex = getStageIndex(order.status);
  const isCancelled = order.status === 'Cancelado';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      {/* Drawer content */}
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-700 text-white font-mono font-bold text-sm shadow-xs">
              {order.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Pedido {order.id}
                </h2>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  order.status === 'Novo'
                    ? 'bg-emerald-100 text-emerald-800'
                    : order.status === 'Cancelado'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-200 text-slate-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <span>{order.date} às {order.time}</span>
                <span>•</span>
                <span className="font-medium text-slate-700">{order.channel}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPrint(order)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              title="Imprimir comanda térmica"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Quick Action Banner if New */}
          {order.status === 'Novo' && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <div>
                  <div className="font-bold text-emerald-950 text-xs">
                    Pedido aguardando confirmação
                  </div>
                  <div className="text-[11px] text-emerald-800">
                    Confirme para disparar o pedido para o pizzaiolo
                  </div>
                </div>
              </div>
              <button
                onClick={() => onUpdateStatus(order.id, 'Confirmado')}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-xs transition-colors"
              >
                Confirmar agora
              </button>
            </div>
          )}

          {/* Cancelled Banner if applicable */}
          {isCancelled && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Pedido Cancelado</span>
              </div>
              <div className="text-[11px] text-rose-700">
                Motivo: {order.cancelReason || 'Cancelado pelo operador.'}
              </div>
            </div>
          )}

          {/* 1. Customer & Delivery Info */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/90 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Dados do Cliente & Entrega
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-900 text-sm">{order.client}</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{order.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-slate-200/70">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-slate-800">
                  {order.address || 'Consumo no local / Retirada'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Modalidade: {order.type}
                </div>
              </div>
            </div>

            {/* Courier Section */}
            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800">
                <Bike className="w-4 h-4 text-indigo-600" />
                <span>
                  Entregador:{' '}
                  <strong>{order.courier || 'Não associado'}</strong>
                </span>
              </div>
              {order.type === 'Delivery' && !isCancelled && (
                <button
                  onClick={() => onOpenAssignCourier(order)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
                >
                  {order.courier ? 'Alterar' : 'Associar'}
                </button>
              )}
            </div>
          </div>

          {/* 2. Order Items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>Itens do Pedido</span>
              <span>{order.items.length} itens</span>
            </div>

            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden bg-white">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs">
                      {item.qty}x
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {item.name}
                      </div>
                      {item.unitPrice && (
                        <div className="text-[11px] text-slate-400">
                          Unitário: R$ {item.unitPrice.toFixed(2).replace('.', ',')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-slate-900">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Notes */}
            {order.notes && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-amber-900 text-xs">
                <span className="font-bold">Observações: </span>
                {order.notes}
              </div>
            )}
          </div>

          {/* 3. Financial Breakdown */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/90 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Resumo Financeiro
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Subtotal dos itens</span>
              <span className="font-medium text-slate-800">
                R$ {order.subtotal ? order.subtotal.toFixed(2).replace('.', ',') : order.formattedValue}
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Taxa de entrega</span>
              <span className="font-medium text-slate-800">
                R$ {order.deliveryFee ? order.deliveryFee.toFixed(2).replace('.', ',') : '0,00'}
              </span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Desconto aplicado</span>
                <span className="font-medium">
                  - R$ {order.discount.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-900">Total do Pedido</span>
              <span className="font-bold text-base text-emerald-800">
                {order.formattedValue}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Forma de pagamento: <strong>{order.paymentMethod}</strong></span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                order.paymentStatus === 'Pago'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* 4. Timeline do Pedido (6 fases) */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Histórico & Linha do Tempo
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {fullTimelineStages.map((stageName, idx) => {
                const isPassed = !isCancelled && currentStageIndex >= idx;
                const isCurrent = !isCancelled && currentStageIndex === idx;

                return (
                  <div key={stageName} className="relative group">
                    {/* Bullet */}
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isPassed
                          ? 'bg-emerald-700 border-white text-white shadow-xs'
                          : 'bg-white border-slate-300 text-slate-300'
                      }`}
                    >
                      {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold text-xs ${isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {stageName}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            Etapa Atual
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/90 flex flex-col gap-2.5">
          {/* Status Progression Select */}
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 shrink-0">
              Mudar Status:
            </label>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="Novo">Novo</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Em preparo">Em preparo</option>
              <option value="Pronto">Pronto</option>
              <option value="Saiu para entrega">Saiu para entrega</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-2">
            {/* Cancel Button */}
            {!isCancelled ? (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100/80 border border-rose-200 rounded-lg transition-colors"
              >
                Cancelar pedido
              </button>
            ) : (
              <span className="text-xs text-rose-600 font-semibold">Cancelado</span>
            )}

            {/* Print and Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPrint(order)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir comanda</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
              >
                Concluir
              </button>
            </div>
          </div>

          {/* Cancellation Confirm Prompt */}
          {showCancelConfirm && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl space-y-2 mt-2">
              <div className="font-bold text-rose-900 text-xs">
                Confirmar cancelamento do pedido {order.id}?
              </div>
              <input
                type="text"
                placeholder="Motivo do cancelamento (ex: cliente desistiu)..."
                value={cancelReasonInput}
                onChange={(e) => setCancelReasonInput(e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-white border border-rose-300 rounded focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-2 py-1 text-xs text-slate-600 hover:bg-rose-100 rounded"
                >
                  Voltar
                </button>
                <button
                  onClick={() => {
                    onCancelOrder(order.id, cancelReasonInput || 'Cancelado pelo operador');
                    setShowCancelConfirm(false);
                  }}
                  className="px-3 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded"
                >
                  Sim, Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
