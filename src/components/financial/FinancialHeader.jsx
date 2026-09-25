import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Plus, Calendar } from 'lucide-react';

export default function FinancialHeader({
  period = 'hoje',
  onSelectPeriod,
  customDates = { start: '', end: '' },
  onChangeCustomDate,
  metrics = {},
  onOpenNewTransaction
}) {
  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const grossMargin = metrics.revenue > 0
    ? Math.round((metrics.grossProfit / metrics.revenue) * 100)
    : 0;

  const netMargin = metrics.revenue > 0
    ? Math.round((metrics.netProfit / metrics.revenue) * 100)
    : 0;

  return (
    <div className="space-y-4 mb-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestão Financeira & DRE</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 font-semibold text-emerald-800 border border-emerald-200">
              {metrics.label || 'Hoje'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrativo de faturamento, controle de custos (CMV), despesas operacionais e margem de lucro.
          </p>
        </div>

        <button
          onClick={onOpenNewTransaction}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Novo lançamento</span>
        </button>
      </div>

      {/* Period Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => onSelectPeriod('hoje')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              period === 'hoje'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Hoje
          </button>
          <button
            onClick={() => onSelectPeriod('7dias')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              period === '7dias'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            7 dias
          </button>
          <button
            onClick={() => onSelectPeriod('30dias')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              period === '30dias'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            30 dias
          </button>
          <button
            onClick={() => onSelectPeriod('mesAtual')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              period === 'mesAtual'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Mês atual
          </button>
          <button
            onClick={() => onSelectPeriod('personalizado')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              period === 'personalizado'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Personalizado
          </button>
        </div>

        {/* Custom date range inputs when active */}
        {period === 'personalizado' && (
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="date"
              value={customDates.start}
              onChange={(e) => onChangeCustomDate('start', e.target.value)}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
            <span className="text-slate-400">até</span>
            <input
              type="date"
              value={customDates.end}
              onChange={(e) => onChangeCustomDate('end', e.target.value)}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        )}
      </div>

      {/* 5 Compact KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {/* 1. Faturamento */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Faturamento</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {formatCurrency(metrics.revenue)}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Entradas brutas</span>
          </div>
        </div>

        {/* 2. Custos (CMV) */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Custos (CMV)</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {formatCurrency(metrics.costs)}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Insumos & Ingredientes</span>
          </div>
        </div>

        {/* 3. Despesas Operacionais */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Despesas</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {formatCurrency(metrics.expenses)}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Operação & Entregas</span>
          </div>
        </div>

        {/* 4. Lucro Bruto */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Lucro Bruto</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {grossMargin}%
            </span>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {formatCurrency(metrics.grossProfit)}
            </div>
            <span className="text-[11px] text-slate-400">Fat. menos Custos</span>
          </div>
        </div>

        {/* 5. Lucro Líquido */}
        <div className="col-span-2 lg:col-span-1 bg-emerald-900 text-white p-3.5 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-200">Lucro Líquido</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-800 text-emerald-100 border border-emerald-700">
              {netMargin}% margem
            </span>
          </div>
          <div className="mt-2">
            <div className="text-base sm:text-lg font-black text-white truncate">
              {formatCurrency(metrics.netProfit)}
            </div>
            <span className="text-[11px] text-emerald-300">Resultado final do período</span>
          </div>
        </div>
      </div>
    </div>
  );
}
