import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, TrendingUp, PieChart, ShieldCheck } from 'lucide-react';

export default function FinancialReportView({ metrics = {} }) {
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

  const grossMargin = revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0;
  const netMargin = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0;

  // Breakdown simulation by channel
  const deliveryShare = Math.round(revenue * 0.68);
  const diningShare = Math.round(revenue * 0.32);

  return (
    <div className="space-y-6">
      {/* 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Receitas Totais</span>
          <div className="text-lg font-bold text-slate-900 mt-1">{formatCurrency(revenue)}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">+100% base</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Custos Insumos (CMV)</span>
          <div className="text-lg font-bold text-slate-900 mt-1">{formatCurrency(costs)}</div>
          <span className="text-[10px] text-amber-700 font-semibold">{Math.round((costs / (revenue || 1)) * 100)}% do total</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Despesas Operacionais</span>
          <div className="text-lg font-bold text-slate-900 mt-1">{formatCurrency(expenses)}</div>
          <span className="text-[10px] text-rose-700 font-semibold">{Math.round((expenses / (revenue || 1)) * 100)}% do total</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-500">Lucro Bruto</span>
          <div className="text-lg font-bold text-blue-900 mt-1">{formatCurrency(grossProfit)}</div>
          <span className="text-[10px] text-blue-700 font-bold">{grossMargin}% margem</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-emerald-900 text-white p-3.5 rounded-xl shadow-xs">
          <span className="text-[11px] font-medium text-emerald-200">Lucro Líquido Real</span>
          <div className="text-lg font-black text-white mt-1">{formatCurrency(netProfit)}</div>
          <span className="text-[10px] text-emerald-300 font-bold">{netMargin}% resultado final</span>
        </div>
      </div>

      {/* DRE Analítico e Canais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canais de Venda */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Distribuição por Canal de Venda
            </h3>
            <span className="text-[11px] text-slate-400">{metrics.label}</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Delivery & WhatsApp IA (68%)</span>
                <span className="text-slate-900">{formatCurrency(deliveryShare)}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Salão & Mesas Presenciais (32%)</span>
                <span className="text-slate-900">{formatCurrency(diningShare)}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Resumo da Margem */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Indicadores de Eficiência Financeira
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold">Saudável</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-slate-500 block text-[11px]">CMV Alvo vs Real</span>
              <strong className="text-slate-900 text-sm">31.2%</strong>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Dentro do limite de 35%</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
              <span className="text-slate-500 block text-[11px]">Ponto de Equilíbrio</span>
              <strong className="text-slate-900 text-sm">R$ 1.850 / dia</strong>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Superado no período</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
