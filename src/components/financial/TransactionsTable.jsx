import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Trash2, Power, Search, Filter, CheckCircle2, Clock } from 'lucide-react';

export default function TransactionsTable({
  transactions = [],
  onDeleteTransaction,
  onToggleStatus
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'Receita' | 'Despesa'
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = Array.from(new Set(transactions.map((t) => t.category))).filter(Boolean);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.note && t.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      t.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCat = categoryFilter === 'all' || t.category === categoryFilter;

    return matchesSearch && matchesType && matchesCat;
  });

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-3">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por descrição, forma de pagamento ou anotação..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-1 px-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
          >
            <option value="all">Todas as categorias</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Type Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                typeFilter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({transactions.length})
            </button>
            <button
              onClick={() => setTypeFilter('Receita')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                typeFilter === 'Receita'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              Receitas
            </button>
            <button
              onClick={() => setTypeFilter('Despesa')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                typeFilter === 'Despesa'
                  ? 'bg-rose-700 text-white'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              Despesas
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-xs">Nenhum lançamento financeiro encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Data / Horário</th>
                  <th className="py-3 px-3">Descrição</th>
                  <th className="py-3 px-3">Categoria</th>
                  <th className="py-3 px-3">Tipo</th>
                  <th className="py-3 px-3">Valor</th>
                  <th className="py-3 px-3">Forma de Pagamento</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((t) => {
                  const isRevenue = t.type === 'Receita';

                  return (
                    <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Data */}
                      <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-medium">
                        {t.date}
                      </td>

                      {/* Descrição */}
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-sm">
                          {t.description}
                        </div>
                        {t.note && (
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">
                            {t.note}
                          </div>
                        )}
                      </td>

                      {/* Categoria */}
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60 whitespace-nowrap">
                          {t.category}
                        </span>
                      </td>

                      {/* Tipo */}
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                          isRevenue
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {isRevenue ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownLeft className="w-3 h-3" />
                          )}
                          <span>{t.type}</span>
                        </span>
                      </td>

                      {/* Valor */}
                      <td className="py-3 px-3">
                        <span className={`font-bold ${
                          isRevenue ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {isRevenue ? '+' : '-'} {formatCurrency(t.value)}
                        </span>
                      </td>

                      {/* Forma de Pagamento */}
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {t.paymentMethod}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => onToggleStatus(t.id)}
                          title="Clique para alternar status"
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${
                            t.status === 'Confirmado'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          {t.status === 'Confirmado' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{t.status}</span>
                        </button>
                      </td>

                      {/* Ações */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onDeleteTransaction(t.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Excluir lançamento"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
