import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Power, FolderKanban, Check, AlertCircle } from 'lucide-react';

export default function CategoryManagerModal({
  isOpen = false,
  onClose,
  categories = [],
  onSaveCategory,
  onDeleteCategory,
  onToggleCategoryStatus
}) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('emerald');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleStartEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setColor(cat.color || 'emerald');
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setColor('emerald');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('O nome da categoria é obrigatório.');
      return;
    }

    onSaveCategory({
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      color,
      status: editingCategory ? editingCategory.status : 'Ativo',
      productCount: editingCategory ? editingCategory.productCount : 0
    });

    handleCancelEdit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Gerenciar Categorias</h2>
              <p className="text-xs text-slate-500">
                Organize grupos do cardápio e insumos da pizzaria
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Form to Add or Edit */}
          <form onSubmit={handleSubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <div className="text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span>{editingCategory ? 'Editar Categoria' : '+ Nova Categoria'}</span>
              {editingCategory && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-[11px] text-slate-500 hover:text-slate-700 underline"
                >
                  Cancelar edição
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ex: Sobremesas Artesanais"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Identificador Visual / Cor
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="emerald">Verde Esmeralda (Padrão)</option>
                  <option value="blue">Azul Italiano</option>
                  <option value="amber">Âmbar / Dourado</option>
                  <option value="purple">Púrpura Vinhos</option>
                  <option value="rose">Rosa / Tinto</option>
                  <option value="slate">Cinza Neutro / Insumos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Descrição Curta
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Receitas preparadas diariamente pelo nosso chef"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {error && (
              <p className="text-[11px] text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
              </p>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{editingCategory ? 'Salvar Categoria' : 'Adicionar Categoria'}</span>
              </button>
            </div>
          </form>

          {/* List of Existing Categories */}
          <div>
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Categorias Cadastradas ({categories.length})
            </h3>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {cat.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                          cat.status === 'Ativo'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {cat.status}
                        </span>
                      </div>
                      {cat.description && (
                        <p className="text-[11px] text-slate-400 truncate">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-3">
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Editar categoria"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleCategoryStatus(cat.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        cat.status === 'Ativo'
                          ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                      title={cat.status === 'Ativo' ? 'Desativar categoria' : 'Ativar categoria'}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteCategory(cat.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Excluir categoria"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-3 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
