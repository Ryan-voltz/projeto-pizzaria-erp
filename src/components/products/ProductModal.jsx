import React, { useState, useEffect } from 'react';
import { X, Check, UtensilsCrossed, AlertCircle, Percent } from 'lucide-react';

const COMMON_EMOJIS = ['🍕', '🧀', '🍅', '🌾', '🫒', '🍷', '🍺', '🥤', '🥗', '🥩', '🥓', '🍫', '🍰', '📦'];

export default function ProductModal({
  isOpen = false,
  onClose,
  productToEdit = null,
  categories = [],
  onSave
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    cost: '',
    image: '🍕',
    stock: '',
    minStock: '',
    unit: 'un',
    status: 'Ativo'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || (categories[0]?.name || ''),
        description: productToEdit.description || '',
        price: productToEdit.price !== undefined ? productToEdit.price : '',
        cost: productToEdit.cost !== undefined ? productToEdit.cost : '',
        image: productToEdit.image || '🍕',
        stock: productToEdit.stock !== undefined ? productToEdit.stock : '',
        minStock: productToEdit.minStock !== undefined ? productToEdit.minStock : '',
        unit: productToEdit.unit || 'un',
        status: productToEdit.status || 'Ativo'
      });
    } else {
      setFormData({
        name: '',
        category: categories[0]?.name || 'Pizzas Tradicionais',
        description: '',
        price: '',
        cost: '',
        image: '🍕',
        stock: '10',
        minStock: '5',
        unit: 'un',
        status: 'Ativo'
      });
    }
    setErrors({});
  }, [productToEdit, isOpen, categories]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do produto é obrigatório';
    }
    if (!formData.category) {
      newErrors.category = 'Selecione uma categoria';
    }
    if (formData.cost === '' || isNaN(Number(formData.cost)) || Number(formData.cost) < 0) {
      newErrors.cost = 'Informe um custo válido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const priceNum = formData.price === '' ? 0 : Number(formData.price);
    const costNum = Number(formData.cost || 0);
    const stockNum = Number(formData.stock || 0);
    const minStockNum = Number(formData.minStock || 0);

    onSave({
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      price: priceNum,
      cost: costNum,
      image: formData.image || '🍽️',
      stock: stockNum,
      minStock: minStockNum,
      unit: formData.unit,
      status: formData.status,
      lastMovement: productToEdit ? productToEdit.lastMovement : 'Agora'
    });

    onClose();
  };

  const calculatedMargin =
    formData.price && Number(formData.price) > 0 && formData.cost !== ''
      ? Math.round(((Number(formData.price) - Number(formData.cost)) / Number(formData.price)) * 100)
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {productToEdit ? 'Editar Produto' : 'Cadastrar Novo Produto'}
              </h2>
              <p className="text-xs text-slate-500">
                Preencha os dados de precificação, ficha e estoque
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Nome e Ícone */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ex: Pizza Margherita D.O.P."
                className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all ${
                  errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* Ícone rápido */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ícone / Emoji
              </label>
              <div className="relative">
                <select
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 text-center"
                >
                  {COMMON_EMOJIS.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Categoria e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoria *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status no Catálogo
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-medium"
              >
                <option value="Ativo">Ativo (visível para vendas)</option>
                <option value="Inativo">Inativo (pausado)</option>
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descrição / Ingredientes
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Ex: Molho de tomate San Marzano D.O.P., mussarela de búfala fresca e manjericão..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white resize-none"
            />
          </div>

          {/* Precificação: Preço de Venda x Custo */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Precificação & Margem</span>
              {calculatedMargin !== null && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  calculatedMargin >= 50 ? 'bg-emerald-100 text-emerald-800' :
                  calculatedMargin >= 25 ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  <Percent className="w-3 h-3" /> Margem bruta: {calculatedMargin}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Preço de Venda (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="0,00 (deixe 0 se for insumo)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold text-slate-800"
                  />
                </div>
                <span className="text-[10px] text-slate-400">Preço cobrado do cliente final</span>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Custo Unitário (R$) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={formData.cost}
                    onChange={(e) => handleChange('cost', e.target.value)}
                    placeholder="0,00"
                    className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold text-slate-800 ${
                      errors.cost ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-slate-400">Custo de insumos ou compra</span>
              </div>
            </div>
          </div>

          {/* Estoque e Unidade */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estoque Atual
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estoque Mínimo
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.minStock}
                onChange={(e) => handleChange('minStock', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Unidade
              </label>
              <select
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              >
                <option value="un">un (Unidade)</option>
                <option value="kg">kg (Quilograma)</option>
                <option value="g">g (Grama)</option>
                <option value="L">L (Litro)</option>
                <option value="gf">gf (Garrafa)</option>
                <option value="lata 2.5kg">lata 2.5kg</option>
                <option value="saco 25kg">saco 25kg</option>
                <option value="galão 5L">galão 5L</option>
                <option value="fatia">fatia</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
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
              <span>{productToEdit ? 'Salvar Alterações' : 'Cadastrar Produto'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
