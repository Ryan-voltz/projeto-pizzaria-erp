import React from 'react';
import { Truck, Map, List, Clock, Bike, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DeliveriesHeader({
  viewMode, // 'table' | 'map'
  onViewModeChange,
  periodFilter,
  onPeriodFilterChange,
  stats = {}
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
      {/* Title & Stats */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
          <Truck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
              Entregas & Despacho
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
              {stats.inRoute || 2} em rota agora
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoramento de rotas, tempo de entrega e acompanhamento de motoboys
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Period Filter */}
        <select
          value={periodFilter}
          onChange={(e) => onPeriodFilterChange(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium cursor-pointer"
        >
          <option value="today">Hoje (25/09/2026)</option>
          <option value="yesterday">Ontem (24/09/2026)</option>
          <option value="week">Esta semana (Últimos 7 dias)</option>
        </select>

        {/* View Switcher: Tabela / Mapa */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs border border-slate-200/60">
          <button
            onClick={() => onViewModeChange('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Tabela</span>
          </button>
          <button
            onClick={() => onViewModeChange('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'map'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Mapa em Tempo Real</span>
          </button>
        </div>
      </div>
    </div>
  );
}
