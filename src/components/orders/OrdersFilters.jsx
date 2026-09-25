import React from 'react';
import { Search, Calendar, X, RotateCcw } from 'lucide-react';

export const orderStatusTabs = [
  { id: 'ALL', label: 'Todos' },
  { id: 'Novo', label: 'Novos', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { id: 'Confirmado', label: 'Confirmados', badgeColor: 'bg-blue-100 text-blue-800' },
  { id: 'Em preparo', label: 'Em preparo', badgeColor: 'bg-amber-100 text-amber-800' },
  { id: 'Pronto', label: 'Prontos', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { id: 'Saiu para entrega', label: 'Saiu para entrega', badgeColor: 'bg-indigo-100 text-indigo-800' },
  { id: 'Entregue', label: 'Entregues', badgeColor: 'bg-slate-100 text-slate-700' },
  { id: 'Cancelado', label: 'Cancelados', badgeColor: 'bg-rose-100 text-rose-800' }
];

export default function OrdersFilters({
  activeStatus,
  onSelectStatus,
  searchClient,
  onSearchClientChange,
  searchOrderNumber,
  onSearchOrderNumberChange,
  dateFilter,
  onDateFilterChange,
  statusCounts = {},
  showAdvanced = true,
  onResetFilters
}) {
  return (
    <div className="space-y-3">
      {/* 1. Status Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {orderStatusTabs.map((tab) => {
          const isActive = activeStatus === tab.id;
          const count = statusCounts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectStatus(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-slate-700 text-white' : tab.badgeColor || 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Secondary Filter Bar: Data, Cliente, Número do Pedido */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          {/* Cliente search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrar por cliente ou tel..."
              value={searchClient}
              onChange={(e) => onSearchClientChange(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all placeholder:text-slate-400"
            />
            {searchClient && (
              <button
                onClick={() => onSearchClientChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Número do pedido search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Número (#1049, etc)..."
              value={searchOrderNumber}
              onChange={(e) => onSearchOrderNumberChange(e.target.value)}
              className="w-full px-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all placeholder:text-slate-400 font-mono"
            />
            {searchOrderNumber && (
              <button
                onClick={() => onSearchOrderNumberChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Date Selector */}
          <div className="relative flex items-center">
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all text-slate-700 cursor-pointer"
            >
              <option value="today">Hoje (25/09/2026)</option>
              <option value="yesterday">Ontem (24/09/2026)</option>
              <option value="week">Esta semana (Últimos 7 dias)</option>
              <option value="all">Todas as datas</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center justify-end">
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpar filtros</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
