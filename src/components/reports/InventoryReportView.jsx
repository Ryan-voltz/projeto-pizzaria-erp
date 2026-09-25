import React from 'react';
import { Package, ArrowDownLeft, ArrowUpRight, AlertOctagon, AlertTriangle } from 'lucide-react';
import { initialProducts, initialStockMovements } from '../../data/mockData';

export default function InventoryReportView() {
  const lowStockItems = initialProducts.filter((p) => p.stock <= p.minStock);

  const entradasCount = initialStockMovements.filter((m) => m.type === 'Entrada').length;
  const saidasCount = initialStockMovements.filter((m) => m.type === 'Saída').length;
  const perdasCount = initialStockMovements.filter((m) => m.type === 'Perda').length;

  return (
    <div className="space-y-6">
      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Entradas */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Entradas de Insumos</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-700">{entradasCount}</span>
            <span className="text-[11px] text-slate-400">lotes recebidos</span>
          </div>
        </div>

        {/* Saídas */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saídas para Cozinha</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-blue-700">{saidasCount}</span>
            <span className="text-[11px] text-slate-400">requisições de forno</span>
          </div>
        </div>

        {/* Perdas */}
        <div className="bg-white p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-800">Perdas / Avarias</span>
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-rose-700">{perdasCount}</span>
            <span className="text-[11px] text-rose-600">itens descartados</span>
          </div>
        </div>

        {/* Produtos abaixo do mínimo */}
        <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-800">Abaixo do Mínimo</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-700">{lowStockItems.length}</span>
            <span className="text-[11px] text-amber-600">itens em alerta</span>
          </div>
        </div>
      </div>

      {/* Tabela de Itens Críticos do Estoque */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Detalhamento de Itens Críticos Abaixo do Mínimo ({lowStockItems.length})
          </h3>
          <span className="text-xs text-amber-700 font-semibold">Reposição sugerida ativa</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Item / Insumo</th>
                <th className="py-3 px-3">Categoria</th>
                <th className="py-3 px-3 text-right">Saldo Atual</th>
                <th className="py-3 px-3 text-right">Mínimo</th>
                <th className="py-3 px-3 text-right">Déficit</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lowStockItems.map((p) => {
                const deficit = Math.max(0, p.minStock - p.stock);
                const isZero = p.stock === 0;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {p.name}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {p.category}
                    </td>
                    <td className={`py-3 px-3 text-right font-bold ${isZero ? 'text-rose-600' : 'text-amber-600'}`}>
                      {p.stock} {p.unit}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-500 font-medium">
                      {p.minStock} {p.unit}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-rose-600">
                      -{deficit} {p.unit}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        isZero
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {isZero ? 'Esgotado' : 'Estoque Baixo'}
                      </span>
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
