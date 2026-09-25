import React, { useState } from 'react';
import { ClipboardList, Printer, CheckSquare, Square, AlertTriangle, Check, RefreshCw, ShoppingCart, ArrowRight } from 'lucide-react';
import PrintShoppingListModal from '../components/inventory/PrintShoppingListModal';
import { initialProducts } from '../data/mockData';

export default function ShoppingListPage({ onNavigateToInventory }) {
  // Identify products with low stock automatically
  const [items, setItems] = useState(() => {
    return initialProducts
      .filter((p) => p.stock <= p.minStock)
      .map((p) => {
        // Suggested quantity to bring stock up to double the minimum
        const targetStock = p.minStock * 2;
        const suggested = Math.max(1, Math.ceil(targetStock - p.stock));
        return {
          ...p,
          suggestedQty: suggested,
          purchased: false
        };
      });
  });

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [filterPurchased, setFilterPurchased] = useState('all'); // 'all' | 'pending' | 'bought'

  const togglePurchased = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const handleUpdateSuggestedQty = (id, newQty) => {
    const val = Math.max(1, parseFloat(newQty) || 1);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, suggestedQty: val } : item))
    );
  };

  const markAllAsPurchased = () => {
    setItems((prev) => prev.map((item) => ({ ...item, purchased: true })));
  };

  const pendingCount = items.filter((i) => !i.purchased).length;
  const boughtCount = items.filter((i) => i.purchased).length;

  const totalEstimatedCost = items.reduce(
    (sum, i) => sum + (i.suggestedQty * i.cost),
    0
  );

  const filteredItems = items.filter((item) => {
    if (filterPurchased === 'pending') return !item.purchased;
    if (filterPurchased === 'bought') return item.purchased;
    return true;
  });

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Lista de Compras & Reposição</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 font-semibold text-amber-800 border border-amber-200">
              {pendingCount} pendentes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerada automaticamente a partir de insumos e produtos com saldo abaixo do estoque de segurança.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToInventory && (
            <button
              onClick={onNavigateToInventory}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <span>Ver Estoque</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir lista</span>
          </button>
        </div>
      </div>

      {/* KPI Cards for Shopping List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Itens Críticos para Reposição</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-700">{items.length}</span>
            <span className="text-[11px] text-slate-400">necessitam compra</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Progresso de Compras</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{boughtCount} / {items.length}</span>
            <span className="text-[11px] text-slate-400">itens marcados</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Custo Estimado da Compra</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{formatCurrency(totalEstimatedCost)}</span>
            <span className="text-[11px] text-slate-400">para recompor estoque</span>
          </div>
        </div>
      </div>

      {/* Filter and Mass Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterPurchased('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterPurchased === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({items.length})
          </button>
          <button
            onClick={() => setFilterPurchased('pending')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterPurchased === 'pending'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            Pendentes ({pendingCount})
          </button>
          <button
            onClick={() => setFilterPurchased('bought')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterPurchased === 'bought'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            Comprados ({boughtCount})
          </button>
        </div>

        {pendingCount > 0 && (
          <button
            onClick={markAllAsPurchased}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Marcar todos como comprados</span>
          </button>
        )}
      </div>

      {/* Shopping List Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="w-10 h-10 text-emerald-600 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-semibold text-slate-800">
              {filterPurchased === 'pending'
                ? 'Todos os itens já foram comprados!'
                : 'Nenhum item com estoque baixo no momento.'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Todos os níveis de estoque estão regulares ou atendidos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">Comprado</th>
                  <th className="py-3 px-3">Produto / Insumo</th>
                  <th className="py-3 px-3">Categoria</th>
                  <th className="py-3 px-3">Estoque Atual</th>
                  <th className="py-3 px-3">Estoque Mínimo</th>
                  <th className="py-3 px-3 font-bold text-slate-800">Qtd. Sugerida</th>
                  <th className="py-3 px-3">Custo Estimado</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((item) => {
                  const subtotal = item.suggestedQty * item.cost;
                  const isZero = item.stock === 0;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        item.purchased ? 'bg-slate-50/40 opacity-70' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => togglePurchased(item.id)}
                          className="text-slate-400 hover:text-emerald-700 transition-colors"
                          title={item.purchased ? 'Desmarcar compra' : 'Marcar como comprado'}
                        >
                          {item.purchased ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-300" />
                          )}
                        </button>
                      </td>

                      {/* Produto */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-base shrink-0 shadow-2xs">
                            {item.image && item.image.length <= 4 ? item.image : '📦'}
                          </div>
                          <div>
                            <span className={`font-semibold text-slate-900 ${item.purchased ? 'line-through text-slate-400' : ''}`}>
                              {item.name}
                            </span>
                            {item.description && (
                              <p className="text-[11px] text-slate-400 truncate max-w-xs">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Categoria */}
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
                          {item.category}
                        </span>
                      </td>

                      {/* Estoque atual */}
                      <td className="py-3 px-3">
                        <span className={`font-bold ${isZero ? 'text-rose-600' : 'text-amber-600'}`}>
                          {item.stock} {item.unit}
                        </span>
                      </td>

                      {/* Estoque mínimo */}
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {item.minStock} {item.unit}
                      </td>

                      {/* Quantidade Sugerida (Editável) */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="1"
                            value={item.suggestedQty}
                            disabled={item.purchased}
                            onChange={(e) => handleUpdateSuggestedQty(item.id, e.target.value)}
                            className="w-16 px-2 py-1 text-xs font-bold text-slate-900 bg-emerald-50/50 border border-emerald-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-emerald-600 text-center"
                          />
                          <span className="text-[11px] text-slate-500">{item.unit}</span>
                        </div>
                      </td>

                      {/* Custo Estimado */}
                      <td className="py-3 px-3 font-semibold text-slate-800">
                        {formatCurrency(subtotal)}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-right">
                        {item.purchased ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Check className="w-3 h-3" /> Comprado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle className="w-3 h-3" /> Comprar urgente
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print Modal */}
      <PrintShoppingListModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        items={items}
        totalEstimatedCost={totalEstimatedCost}
      />
    </div>
  );
}
