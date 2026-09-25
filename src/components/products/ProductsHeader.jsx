import React from 'react';
import { Plus, FolderKanban, Search, Filter, UtensilsCrossed } from 'lucide-react';

export default function ProductsHeader({
  searchTerm = '',
  onSearchChange,
  selectedCategory = 'all',
  onSelectCategory,
  categories = [],
  totalProducts = 0,
  activeCount = 0,
  onOpenNewProduct,
  onOpenCategoriesModal
}) {
  return (
    <div className="space-y-4 mb-6">
      {/* Top row: Title + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Produtos & Cardápio</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600 border border-slate-200">
              {totalProducts} itens
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão do catálogo, precificação de venda, custos e estoque dos produtos da forneria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCategoriesModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
          >
            <FolderKanban className="w-4 h-4 text-slate-500" />
            <span>Categorias ({categories.length})</span>
          </button>

          <button
            onClick={onOpenNewProduct}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Novo produto</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nome, descrição ou código..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        {/* Category Filter Select */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="py-1.5 px-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
          >
            <option value="all">Todas as categorias ({categories.length})</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Active badges counter */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-100 text-xs">
          <span className="inline-flex items-center gap-1 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <strong className="text-slate-800">{activeCount}</strong> ativos
          </span>
          <span className="inline-flex items-center gap-1 text-slate-400 ml-1">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <strong className="text-slate-600">{totalProducts - activeCount}</strong> inativos
          </span>
        </div>
      </div>
    </div>
  );
}
