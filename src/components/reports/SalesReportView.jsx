import React from 'react';
import { ShoppingBag, TrendingUp, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { topSellingProducts } from '../../data/mockData';

export default function SalesReportView({ metrics = {} }) {
  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-6">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Quantidade de Pedidos */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Quantidade de Pedidos</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.ordersCount || 48}</span>
            <span className="text-xs text-slate-400">pedidos atendidos</span>
          </div>
        </div>

        {/* Faturamento */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Faturamento Bruto</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(metrics.revenue)}</span>
            <span className="text-xs text-emerald-700 font-semibold">100% recebido</span>
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Ticket Médio por Pedido</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(metrics.avgTicket)}</span>
            <span className="text-xs text-slate-400">por cliente</span>
          </div>
        </div>
      </div>

      {/* Tabela de Produtos Mais Vendidos */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ranking de Produtos Mais Vendidos ({metrics.label})
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Ordenado por volume e receita</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-3">Produto</th>
                <th className="py-3 px-3">Categoria</th>
                <th className="py-3 px-3 text-right">Qtd. Vendida</th>
                <th className="py-3 px-3 text-right">Receita Total</th>
                <th className="py-3 px-4 text-right">Margem Bruta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topSellingProducts.map((prod) => (
                <tr key={prod.rank} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 text-center">
                    <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[11px] font-bold ${
                      prod.rank === 1 ? 'bg-amber-100 text-amber-800' :
                      prod.rank === 2 ? 'bg-slate-200 text-slate-700' :
                      prod.rank === 3 ? 'bg-amber-700/20 text-amber-900' :
                      'text-slate-400'
                    }`}>
                      {prod.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {prod.name}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    {prod.qty} un
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-700">
                    {formatCurrency(prod.revenue)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {prod.margin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
