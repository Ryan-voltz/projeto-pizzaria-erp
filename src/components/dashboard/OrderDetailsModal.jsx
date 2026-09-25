import React from 'react';
import { X, User, Phone, MapPin, CreditCard, Clock, ShoppingBag, Truck } from 'lucide-react';

export default function OrderDetailsModal({ order, isOpen, onClose, onPrint }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Detalhes do Pedido {order.id}
              </h3>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                {order.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Canal: {order.channel} • Recebido às {order.time}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[460px] overflow-y-auto text-xs">
          {/* Customer & Delivery Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <User className="w-4 h-4 text-emerald-700" />
                <span>{order.client}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Phone className="w-3.5 h-3.5" />
                <span>{order.phone}</span>
              </div>
            </div>

            {order.address && (
              <div className="flex items-start gap-2 pt-1 border-t border-slate-200/80 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{order.address}</span>
              </div>
            )}

            {order.courier && (
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Entregador responsável: {order.courier}</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div>
            <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-slate-600" />
              <span>Itens Solicitados</span>
            </div>
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between bg-white">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {item.qty}x {item.name}
                    </div>
                  </div>
                  <div className="font-bold text-slate-800">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900">
              <span className="font-bold">Observações do cliente: </span>
              {order.notes}
            </div>
          )}

          {/* Payment & Total */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <span>Pagamento: <strong>{order.paymentMethod}</strong></span>
            </div>
            <div className="font-bold text-base text-emerald-800">
              Total: {order.formattedValue}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              onClose();
              if (onPrint) onPrint(order);
            }}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
          >
            Imprimir Comanda
          </button>
        </div>
      </div>
    </div>
  );
}
