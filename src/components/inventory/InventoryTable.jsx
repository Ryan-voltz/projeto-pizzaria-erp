import React, { useState } from 'react';
import { Search, AlertTriangle, XCircle, CheckCircle2, ArrowUpDown, Plus } from 'lucide-react';

export default function InventoryTable({
  products = [],
  onQuickMovement
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = products.filter((p) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const isOutOfStock = p.stock === 0;
    const isLowStock = p.stock <= p.minStock && p.stock > 0;
    const isNormal = p.stock > p.minStock;

    if (statusFilter === 'normal') return matchesSearch && isNormal;
    if (statusFilter === 'low') return matchesSearch && isLowStock;
    if (statusFilter === 'out') return matchesSearch && isOutOfStock;

    return matchesSearch;
  });

  return (
    <div className="space-y-3">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por produto ou categoria de insumo..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({products.length})
          </button>
          <button
            onClick={() => setStatusFilter('low')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              statusFilter === 'low'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            Estoque baixo
          </button>
          <button
            onClick={() => setStatusFilter('out')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              statusFilter === 'out'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Esgotados
          </button>
          <button
            onClick={() => setStatusFilter('normal')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              statusFilter === 'normal'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            Normal
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-3">Estoque Atual</th>
                <th className="py-3 px-3">Estoque Mínimo</th>
                <th className="py-3 px-3">Unidade</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Última Movimentação</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((item) => {
                const isOutOfStock = item.stock === 0;
                const isLowStock = item.stock <= item.minStock && item.stock > 0;

                const statusLabel = isOutOfStock
                  ? 'Esgotado'
                  : isLowStock
                  ? 'Estoque baixo'
                  : 'Normal';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Produto */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-base shrink-0 shadow-2xs">
                          {item.image && item.image.length <= 4 ? item.image : '📦'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-sm">
                            {item.name}
                          </div>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Estoque atual */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          isOutOfStock ? 'text-rose-600' :
                          isLowStock ? 'text-amber-600' :
                          'text-slate-900'
                        }`}>
                          {item.stock}
                        </span>
                        {/* Progress bar visual */}
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${
                              isOutOfStock ? 'bg-rose-500 w-0' :
                              isLowStock ? 'bg-amber-500' :
                              'bg-emerald-500'
                            }`}
                            style={{
                              width: `${Math.min(100, Math.round((item.stock / (item.minStock * 2 || 1)) * 100))}%`
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Estoque mínimo */}
                    <td className="py-3 px-3 text-slate-500 font-medium">
                      {item.minStock}
                    </td>

                    {/* Unidade */}
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
                        {item.unit}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        isOutOfStock
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isLowStock
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isOutOfStock ? 'bg-rose-500' :
                          isLowStock ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`} />
                        {statusLabel}
                      </span>
                    </td>

                    {/* Última movimentação */}
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {item.lastMovement || 'Hoje, 17:00'}
                    </td>

                    {/* Ação rápida */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onQuickMovement(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                        title="Registrar movimentação para este produto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Ajustar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
