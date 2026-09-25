import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, AlertOctagon, Search, Filter } from 'lucide-react';

export default function MovementsHistoryTable({
  movements = []
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = movements.filter((mov) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      mov.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mov.note && mov.note.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'all' || mov.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Entrada':
        return {
          icon: ArrowDownLeft,
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'Saída':
        return {
          icon: ArrowUpRight,
          classes: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500'
        };
      case 'Ajuste':
        return {
          icon: RefreshCw,
          classes: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'Perda':
        return {
          icon: AlertOctagon,
          classes: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500'
        };
      default:
        return {
          icon: RefreshCw,
          classes: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400'
        };
    }
  };

  return (
    <div className="space-y-3">
      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por produto, usuário ou observação..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              typeFilter === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({movements.length})
          </button>
          <button
            onClick={() => setTypeFilter('Entrada')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              typeFilter === 'Entrada'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            Entradas
          </button>
          <button
            onClick={() => setTypeFilter('Saída')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              typeFilter === 'Saída'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
            }`}
          >
            Saídas
          </button>
          <button
            onClick={() => setTypeFilter('Ajuste')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              typeFilter === 'Ajuste'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            Ajustes
          </button>
          <button
            onClick={() => setTypeFilter('Perda')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              typeFilter === 'Perda'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Perdas
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Data / Horário</th>
                <th className="py-3 px-3">Produto</th>
                <th className="py-3 px-3">Tipo</th>
                <th className="py-3 px-3">Quantidade</th>
                <th className="py-3 px-3">Responsável</th>
                <th className="py-3 px-4">Motivo / Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((mov) => {
                const badge = getTypeBadge(mov.type);
                const Icon = badge.icon;

                return (
                  <tr key={mov.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Data */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-medium">
                      {mov.date}
                    </td>

                    {/* Produto */}
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {mov.productName}
                    </td>

                    {/* Tipo */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badge.classes}`}>
                        <Icon className="w-3 h-3" />
                        <span>{mov.type}</span>
                      </span>
                    </td>

                    {/* Quantidade */}
                    <td className="py-3 px-3">
                      <span className={`font-bold ${
                        mov.type === 'Entrada' ? 'text-emerald-700' :
                        mov.type === 'Perda' ? 'text-rose-600' :
                        'text-slate-800'
                      }`}>
                        {mov.quantity}
                      </span>
                    </td>

                    {/* Responsável */}
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {mov.user}
                    </td>

                    {/* Observação */}
                    <td className="py-3 px-4 text-slate-500">
                      {mov.note || '-'}
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
