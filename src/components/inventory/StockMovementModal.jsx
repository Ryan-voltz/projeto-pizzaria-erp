import React, { useState, useEffect } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, RefreshCw, AlertOctagon, Check, AlertCircle } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export default function StockMovementModal({
  isOpen = false,
  onClose,
  products = [],
  preselectedProduct = null,
  onSaveMovement
}) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [type, setType] = useState('Entrada');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [user, setUser] = useState(currentUser?.name || 'Carlos Silva');
  const [error, setError] = useState('');

  useEffect(() => {
    if (preselectedProduct) {
      setSelectedProductId(preselectedProduct.id);
    } else if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
    setQuantity('');
    setNote('');
    setError('');
  }, [preselectedProduct, isOpen, products]);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const parsedQty = parseFloat(quantity) || 0;

  // Calculate new estimated stock
  const calculateNewStock = () => {
    if (!currentProduct) return 0;
    const current = Number(currentProduct.stock || 0);
    switch (type) {
      case 'Entrada':
        return current + parsedQty;
      case 'Saída':
      case 'Perda':
        return Math.max(0, current - parsedQty);
      case 'Ajuste':
        return parsedQty; // In adjust, value is the new total or delta; let's treat as replacement if explicit or delta
      default:
        return current;
    }
  };

  const newStockEstimate = calculateNewStock();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProductId) {
      setError('Selecione um produto.');
      return;
    }
    if (!quantity || isNaN(parsedQty) || parsedQty <= 0) {
      setError('Informe uma quantidade válida maior que zero.');
      return;
    }

    const sign = type === 'Entrada' ? '+' : type === 'Ajuste' ? '±' : '-';
    const formattedQty = `${sign}${parsedQty} ${currentProduct?.unit || 'un'}`;

    onSaveMovement({
      id: `mov-${Date.now()}`,
      date: 'Agora',
      productId: currentProduct.id,
      productName: currentProduct.name,
      type,
      quantity: formattedQty,
      quantityValue: parsedQty,
      user: user.trim() || 'Operador',
      note: note.trim() || (type === 'Entrada' ? 'Entrada manual de insumos' : 'Movimentação avulsa'),
      newStock: newStockEstimate
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Lançar Movimentação de Estoque</h2>
              <p className="text-xs text-slate-500">
                Entradas, saídas de cozinha, perdas e correções físicas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tipo de Movimentação */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Movimentação *
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setType('Entrada')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  type === 'Entrada'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ArrowDownLeft className="w-4 h-4 text-emerald-600 mb-1" />
                <span>Entrada</span>
              </button>

              <button
                type="button"
                onClick={() => setType('Saída')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  type === 'Saída'
                    ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-blue-600 mb-1" />
                <span>Saída</span>
              </button>

              <button
                type="button"
                onClick={() => setType('Ajuste')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  type === 'Ajuste'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <RefreshCw className="w-4 h-4 text-amber-600 mb-1" />
                <span>Ajuste</span>
              </button>

              <button
                type="button"
                onClick={() => setType('Perda')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  type === 'Perda'
                    ? 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-500/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <AlertOctagon className="w-4 h-4 text-rose-600 mb-1" />
                <span>Perda</span>
              </button>
            </div>
          </div>

          {/* Selecionar Produto */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Produto / Insumo *
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Atual: {p.stock} {p.unit})
                </option>
              ))}
            </select>
          </div>

          {/* Quantidade e Saldo Previsto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantidade ({currentProduct?.unit || 'un'}) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (error) setError('');
                }}
                placeholder={`Ex: 5 ${currentProduct?.unit || ''}`}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-bold text-slate-800"
              />
            </div>

            {/* Saldo estimado box */}
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-center">
              <span className="text-[11px] font-medium text-slate-500">Saldo pós-lançamento:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xs text-slate-400 line-through">
                  {currentProduct ? currentProduct.stock : 0} {currentProduct?.unit}
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {newStockEstimate} {currentProduct?.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Responsável */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Responsável pelo Lançamento
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Observação / Motivo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observação / Número da NF / Motivo
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: NF #49102 Laticínios Serra, ou Descarte por quebra..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 resize-none"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar Movimentação</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
