import React from 'react';
import { Edit2, Trash2, Power, AlertTriangle, Package, CheckCircle2 } from 'lucide-react';

export default function ProductsTable({
  products = [],
  onEditProduct,
  onToggleStatus,
  onDeleteProduct
}) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center shadow-2xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <Package className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">Nenhum produto encontrado</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Tente ajustar sua busca por nome ou selecione outra categoria nos filtros acima.
        </p>
      </div>
    );
  }

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Produto</th>
              <th className="py-3 px-3">Categoria</th>
              <th className="py-3 px-3">Preço</th>
              <th className="py-3 px-3">Custo</th>
              <th className="py-3 px-3">Estoque</th>
              <th className="py-3 px-3">Mínimo</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {products.map((p) => {
              const isLowStock = p.stock <= p.minStock && p.stock > 0;
              const isOutOfStock = p.stock === 0;
              const isSaleable = p.price > 0;
              const margin = isSaleable && p.cost > 0
                ? Math.round(((p.price - p.cost) / p.price) * 100)
                : null;

              return (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  {/* Produto */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                        {p.image && p.image.length <= 4 ? p.image : '🍽️'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                          {p.name}
                        </div>
                        {p.description && (
                          <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                            {p.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Categoria */}
                  <td className="py-3 px-3">
                    <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200/60 whitespace-nowrap">
                      {p.category}
                    </span>
                  </td>

                  {/* Preço de Venda */}
                  <td className="py-3 px-3">
                    {isSaleable ? (
                      <span className="font-bold text-slate-900">
                        {formatCurrency(p.price)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        Insumo / Custo
                      </span>
                    )}
                  </td>

                  {/* Custo + Margem */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600 font-medium">
                        {formatCurrency(p.cost)}
                      </span>
                      {margin !== null && (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                          margin >= 60 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          margin >= 30 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {margin}%
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Estoque atual */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-semibold ${
                        isOutOfStock ? 'text-rose-600 font-bold' :
                        isLowStock ? 'text-amber-600 font-bold' :
                        'text-slate-800'
                      }`}>
                        {p.stock} <span className="text-[10px] font-normal text-slate-500">{p.unit}</span>
                      </span>
                      {isOutOfStock && (
                        <span className="inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-1 py-0.2 rounded border border-rose-200">
                          Zerado
                        </span>
                      )}
                      {isLowStock && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" title="Estoque baixo" />
                      )}
                    </div>
                  </td>

                  {/* Estoque Mínimo */}
                  <td className="py-3 px-3 text-slate-500 font-medium">
                    {p.minStock} {p.unit}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <button
                      onClick={() => onToggleStatus(p.id)}
                      title="Clique para alternar status"
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full border transition-all ${
                        p.status === 'Ativo'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        p.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`} />
                      {p.status}
                    </button>
                  </td>

                  {/* Ações */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => onEditProduct(p)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Editar produto"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(p.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.status === 'Ativo'
                            ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={p.status === 'Ativo' ? 'Desativar produto' : 'Ativar produto'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Excluir produto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
