import React from 'react';
import { Printer, X, Check, Utensils, AlertCircle } from 'lucide-react';
import { establishment } from '../../data/mockData';

export default function PrintOrderModal({
  order,
  isOpen,
  onClose
}) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Impressão de Comanda Operacional
              </h3>
              <p className="text-[11px] text-slate-500">
                Padrão térmico 80mm (Cozinha & Expedição)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thermal Receipt Preview Area */}
        <div className="p-6 bg-slate-100/70 overflow-y-auto max-h-[460px] flex justify-center">
          <div
            id="thermal-receipt"
            className="w-[280px] bg-white p-5 rounded-lg shadow-sm border border-slate-200 font-mono text-xs text-slate-800 leading-tight space-y-3"
          >
            {/* Header Docket */}
            <div className="text-center border-b border-dashed border-slate-300 pb-3">
              <div className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                {establishment.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                CNPJ: {establishment.cnpj}
              </div>
              <div className="text-[10px] text-slate-500">
                {establishment.phone}
              </div>
              <div className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 py-0.5 rounded border border-emerald-200">
                {order.type.toUpperCase()} • VIA COZINHA
              </div>
            </div>

            {/* Order Info */}
            <div className="border-b border-dashed border-slate-300 pb-2 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="font-bold text-slate-900 text-sm">PEDIDO {order.id}</span>
                <span className="text-slate-600">{order.time}</span>
              </div>
              <div>
                <span className="text-slate-500">Cliente: </span>
                <span className="font-semibold text-slate-900">{order.client}</span>
              </div>
              <div>
                <span className="text-slate-500">Fone: </span>
                <span>{order.phone}</span>
              </div>
              {order.address && (
                <div>
                  <span className="text-slate-500">Endereço: </span>
                  <span className="font-semibold">{order.address}</span>
                </div>
              )}
            </div>

            {/* Item List */}
            <div className="border-b border-dashed border-slate-300 pb-2">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                Itens do Pedido:
              </div>
              <div className="space-y-1.5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-900">
                      {item.qty}x {item.name}
                    </span>
                    <span className="text-slate-600">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Observations */}
            {order.notes && (
              <div className="border-b border-dashed border-slate-300 pb-2 text-[11px]">
                <span className="font-bold text-rose-700">OBS: </span>
                <span className="text-slate-700 font-sans italic">{order.notes}</span>
              </div>
            )}

            {/* Financial Summary */}
            <div className="pt-1 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span>Pagamento:</span>
                <span className="font-bold text-slate-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1 border-t border-slate-200">
                <span>TOTAL:</span>
                <span className="text-emerald-800">{order.formattedValue}</span>
              </div>
            </div>

            <div className="text-center pt-2 text-[9px] text-slate-400 border-t border-dashed border-slate-200">
              Gerado pelo Chef Deni ERP • Automação WhatsApp IA
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir agora</span>
          </button>
        </div>
      </div>
    </div>
  );
}
