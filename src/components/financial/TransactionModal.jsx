import React, { useState } from 'react';
import { X, Check, DollarSign, ArrowUpRight, ArrowDownLeft, AlertCircle } from 'lucide-react';

export default function TransactionModal({
  isOpen = false,
  onClose,
  onSave
}) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Venda Salão');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  });
  const [type, setType] = useState('Receita'); // 'Receita' | 'Despesa'
  const [paymentMethod, setPaymentMethod] = useState('Pix');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('A descrição do lançamento é obrigatória.');
      return;
    }
    const numVal = parseFloat(value);
    if (!value || isNaN(numVal) || numVal <= 0) {
      setError('Informe um valor financeiro válido maior que zero.');
      return;
    }

    const formattedDate = new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    onSave({
      id: `fin-${Date.now()}`,
      date: formattedDate,
      description: description.trim(),
      category,
      type,
      value: numVal,
      paymentMethod,
      status: 'Confirmado',
      note: note.trim()
    });

    // Reset and close
    setDescription('');
    setValue('');
    setNote('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Novo Lançamento Financeiro</h2>
              <p className="text-xs text-slate-500">
                Registre receitas de vendas ou despesas e compras manuais
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
          {/* Tipo de Lançamento */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Movimentação *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setType('Receita');
                  if (category === 'Insumos / Cozinha' || category === 'Despesas Gerais') {
                    setCategory('Venda Salão');
                  }
                }}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  type === 'Receita'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span>Receita (Entrada)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType('Despesa');
                  setCategory('Insumos / Cozinha');
                }}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  type === 'Despesa'
                    ? 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-500/20'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ArrowDownLeft className="w-4 h-4 text-rose-600" />
                <span>Despesa (Saída)</span>
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descrição do Lançamento *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError('');
              }}
              placeholder={type === 'Receita' ? 'Ex: Venda Salão - Evento Privado' : 'Ex: Compra de Gás de Cozinha P45'}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-medium"
            />
          </div>

          {/* Categoria e Forma de Pagamento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoria Contábil
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              >
                {type === 'Receita' ? (
                  <>
                    <option value="Venda Delivery">Venda Delivery</option>
                    <option value="Venda Salão">Venda Salão</option>
                    <option value="Eventos & Reservas">Eventos & Reservas</option>
                    <option value="Taxa de Serviço">Taxa de Serviço</option>
                    <option value="Outras Receitas">Outras Receitas</option>
                  </>
                ) : (
                  <>
                    <option value="Insumos / Cozinha">Insumos / Cozinha (CMV)</option>
                    <option value="Embalagens">Embalagens & Descartáveis</option>
                    <option value="Logística / Entregas">Logística / Motoboys</option>
                    <option value="Serviços & Utilidades">Água, Luz & Gás</option>
                    <option value="Folha de Pagamento">Salários & Diárias</option>
                    <option value="Marketing">Marketing & Anúncios</option>
                    <option value="Manutenção">Manutenção de Equipamentos</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Forma de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              >
                <option value="Pix">Pix (Instantâneo)</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Dinheiro">Dinheiro Físico</option>
                <option value="Boleto Bancário">Boleto Bancário</option>
                <option value="Transferência">Transferência TED/DOC</option>
              </select>
            </div>
          </div>

          {/* Valor e Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Valor do Lançamento (R$) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  R$
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="0,00"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-black text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data e Horário
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Observação */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observação / Documento Fiscal
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: NF #99102, Fornecedor X, ou Comprovante banco..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 resize-none"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}

          {/* Actions */}
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
              <span>Salvar Lançamento</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
