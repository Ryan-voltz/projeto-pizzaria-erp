import React from 'react';
import { Calculator, ArrowRight, ShieldCheck, PieChart } from 'lucide-react';

export default function FinancialResultsCard({ metrics = {} }) {
  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const revenue = metrics.revenue || 0;
  const costs = metrics.costs || 0;
  const expenses = metrics.expenses || 0;
  const grossProfit = metrics.grossProfit || 0;
  const netProfit = metrics.netProfit || 0;

  const costPercentage = revenue > 0 ? Math.round((costs / revenue) * 100) : 0;
  const expensePercentage = revenue > 0 ? Math.round((expenses / revenue) * 100) : 0;
  const grossMargin = revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0;
  const netMargin = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Demonstrativo de Resultados (DRE Sintético)
            </h3>
            <span className="text-[11px] text-slate-500">
              Detalhamento de faturamento, dedução de insumos e resultado operacional
            </span>
          </div>
        </div>

        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Cálculos auditados
        </span>
      </div>

      {/* DRE Structure */}
      <div className="space-y-2.5 text-xs">
        {/* (+) Faturamento */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/70 border border-slate-200/50">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              +
            </span>
            <span className="font-semibold text-slate-800">Faturamento Bruto</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-900">{formatCurrency(revenue)}</span>
            <span className="text-[10px] text-slate-400 block">100% da receita</span>
          </div>
        </div>

        {/* (-) Custos de Insumos (CMV) */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/40 border border-amber-200/40">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
              -
            </span>
            <div>
              <span className="font-semibold text-slate-800">Custos dos Produtos Vendidos (CMV)</span>
              <span className="text-[10px] text-slate-400 block">Farinha, queijos, carnes, bebidas</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-amber-800">{formatCurrency(costs)}</span>
            <span className="text-[10px] text-amber-700 block">{costPercentage}% do faturamento</span>
          </div>
        </div>

        {/* (=) Lucro Bruto */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50/50 border border-blue-200/60">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
              =
            </span>
            <div>
              <span className="font-bold text-blue-900">Lucro Bruto</span>
              <span className="text-[10px] text-blue-600 block">Faturamento (-) Custos</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-blue-900">{formatCurrency(grossProfit)}</span>
            <span className="text-[10px] text-blue-700 font-semibold block">{grossMargin}% margem bruta</span>
          </div>
        </div>

        {/* (-) Despesas Operacionais */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50/40 border border-rose-200/40">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-rose-100 text-rose-800 font-bold flex items-center justify-center text-xs">
              -
            </span>
            <div>
              <span className="font-semibold text-slate-800">Despesas Operacionais & Logística</span>
              <span className="text-[10px] text-slate-400 block">Entregadores, gás, energia, embalagens</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-rose-700">{formatCurrency(expenses)}</span>
            <span className="text-[10px] text-rose-600 block">{expensePercentage}% do faturamento</span>
          </div>
        </div>

        {/* (=) Lucro Líquido Final */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-800 text-white shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-white text-emerald-900 font-black flex items-center justify-center text-xs">
              =
            </span>
            <div>
              <span className="font-black text-sm text-white">Lucro Líquido Real</span>
              <span className="text-[10px] text-emerald-200 block">Lucro Bruto (-) Despesas</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-black text-base text-white">{formatCurrency(netProfit)}</span>
            <span className="text-[10px] text-emerald-200 font-bold block">{netMargin}% margem líquida</span>
          </div>
        </div>
      </div>
    </div>
  );
}
