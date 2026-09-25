import React from 'react';
import { Plus, Printer, Filter, ShoppingBag } from 'lucide-react';

export default function OrdersHeader({
  onNewOrder,
  onPrintBatch,
  showFilters,
  onToggleFilters,
  totalCount = 0,
  newCount = 0
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
      {/* Title & Description */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                Pedidos
              </h1>
              {newCount > 0 && (
                <span className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {newCount} novo{newCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Acompanhamento em tempo real, fluxo de produção e despacho para entrega
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Toggle Filters */}
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            showFilters
              ? 'bg-slate-100 text-slate-900 border-slate-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
          title="Alternar filtros avançados"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filtros</span>
        </button>

        {/* Print Batch / Orders summary */}
        <button
          onClick={onPrintBatch}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          title="Imprimir relatório / lista de pedidos"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Imprimir</span>
        </button>

        {/* New Order */}
        <button
          onClick={onNewOrder}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Novo pedido</span>
        </button>
      </div>
    </div>
  );
}
