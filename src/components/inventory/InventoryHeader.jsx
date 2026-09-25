import React from 'react';
import { Package, AlertTriangle, XCircle, DollarSign, Plus, ArrowLeftRight, ClipboardList } from 'lucide-react';

export default function InventoryHeader({
  totalProducts = 0,
  lowStockCount = 0,
  outOfStockCount = 0,
  totalStockValue = 0,
  activeTab = 'stock', // 'stock' | 'movements'
  onSelectTab,
  onOpenMovementModal,
  onNavigateToShoppingList
}) {
  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-5 mb-6">
      {/* Top Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Controle de Estoque & Insumos</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoramento em tempo real de saldos, alertas de reposição e registro de movimentações.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToShoppingList && (
            <button
              onClick={onNavigateToShoppingList}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-lg hover:bg-amber-100 transition-colors shadow-2xs"
            >
              <ClipboardList className="w-4 h-4 text-amber-700" />
              <span>Lista de Compras ({lowStockCount + outOfStockCount})</span>
            </button>
          )}

          <button
            onClick={onOpenMovementModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nova movimentação</span>
          </button>
        </div>
      </div>

      {/* 4 Compact KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total de Produtos */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total de produtos</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{totalProducts}</span>
            <span className="text-[11px] text-slate-400">itens cadastrados</span>
          </div>
        </div>

        {/* Estoque Baixo */}
        <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-800">Estoque baixo</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-700">{lowStockCount}</span>
            <span className="text-[11px] text-amber-600">abaixo do mínimo</span>
          </div>
        </div>

        {/* Produtos Zerados */}
        <div className="bg-white p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-800">Produtos zerados</span>
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-rose-700">{outOfStockCount}</span>
            <span className="text-[11px] text-rose-600">sem saldo em estoque</span>
          </div>
        </div>

        {/* Valor Estimado do Estoque */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Valor em estoque</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{formatCurrency(totalStockValue)}</span>
            <span className="text-[11px] text-slate-400">a preço de custo</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation: Posição de Estoque vs Histórico de Movimentações */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => onSelectTab('stock')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'stock'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Posição de Estoque</span>
        </button>

        <button
          onClick={() => onSelectTab('movements')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'movements'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>Histórico de Movimentações</span>
        </button>
      </div>
    </div>
  );
}
