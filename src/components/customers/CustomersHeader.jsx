import React from 'react';
import { Users, Search, Filter, Crown, Sparkles } from 'lucide-react';

export default function CustomersHeader({
  searchTerm = '',
  onSearchChange,
  tierFilter = 'all',
  onSelectTier,
  totalCustomers = 0,
  vipCount = 0
}) {
  return (
    <div className="space-y-4 mb-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Base de Clientes & CRM</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700 border border-slate-200">
              {totalCustomers} cadastrados
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Histórico completo de pedidos, frequência em salão, reservas e preferências gastronômicas.
          </p>
        </div>

        {/* Quick VIP badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg shadow-2xs">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>{vipCount} Clientes VIP</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nome, telefone, e-mail ou endereço..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        {/* Tier filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => onSelectTier('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              tierFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({totalCustomers})
          </button>
          <button
            onClick={() => onSelectTier('VIP')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              tierFilter === 'VIP'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            VIP
          </button>
          <button
            onClick={() => onSelectTier('Frequente')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              tierFilter === 'Frequente'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            Frequentes
          </button>
          <button
            onClick={() => onSelectTier('Regular')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              tierFilter === 'Regular'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Regulares
          </button>
        </div>
      </div>
    </div>
  );
}
