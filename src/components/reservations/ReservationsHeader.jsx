import React from 'react';
import { Plus, Calendar, List, Layers, Filter, Printer } from 'lucide-react';

export default function ReservationsHeader({
  viewMode, // 'list', 'calendar', 'spaces'
  onViewModeChange,
  onNewReservation,
  onPrintBatch,
  showFilters,
  onToggleFilters,
  totalCount = 0
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
      {/* Title & View Switcher */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
              Reservas & Eventos
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-full">
              {totalCount} agendamento{totalCount > 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão de mesas, capacidade, agendamento de aniversários e celebrações
          </p>
        </div>
      </div>

      {/* Right Controls: View Switcher & Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* View Switcher Tabs: Lista / Calendário / Espaços */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs border border-slate-200/60">
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Lista</span>
          </button>

          <button
            onClick={() => onViewModeChange('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'calendar'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendário</span>
          </button>

          <button
            onClick={() => onViewModeChange('spaces')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'spaces'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Espaços</span>
          </button>
        </div>

        {/* Toggle Filters */}
        {viewMode === 'list' && (
          <button
            onClick={onToggleFilters}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showFilters
                ? 'bg-slate-100 text-slate-900 border-slate-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Alternar filtros"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros</span>
          </button>
        )}

        {/* Imprimir comprovantes em lote */}
        <button
          onClick={onPrintBatch}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          title="Imprimir mapa de reservas do dia"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Imprimir</span>
        </button>

        {/* + Nova reserva */}
        <button
          onClick={onNewReservation}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nova reserva</span>
        </button>
      </div>
    </div>
  );
}
