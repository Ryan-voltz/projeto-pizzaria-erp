import React, { useRef } from 'react';
import { X, Printer, CheckSquare, Square, Pizza } from 'lucide-react';
import { establishment } from '../../data/mockData';

export default function PrintShoppingListModal({
  isOpen = false,
  onClose,
  items = [],
  totalEstimatedCost = 0
}) {
  const printRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header - Screen only */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Impressão - Lista de Compras & Reposição</h2>
              <p className="text-xs text-slate-500">
                Formato A4 otimizado para cotação e compras físicas com fornecedores
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

        {/* Printable Document Body */}
        <div ref={printRef} className="p-8 bg-white text-slate-900 font-sans space-y-6">
          {/* Header of Printable Sheet */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Pizza className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight uppercase text-slate-900">
                  {establishment.name}
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  {establishment.address} • Tel: {establishment.phone}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ordem de Reposição
              </div>
              <div className="text-sm font-black text-slate-900">
                #{Math.floor(1000 + Math.random() * 9000)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Emissão: {currentDate}
              </div>
            </div>
          </div>

          {/* Metadata Banner */}
          <div className="grid grid-cols-3 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-medium block text-[10px] uppercase">Responsável</span>
              <strong className="text-slate-800">Carlos Silva (Gerente)</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block text-[10px] uppercase">Itens a Repor</span>
              <strong className="text-slate-800">{items.length} itens críticos</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block text-[10px] uppercase">Custo Estimado Total</span>
              <strong className="text-emerald-700 font-black">{formatCurrency(totalEstimatedCost)}</strong>
            </div>
          </div>

          {/* Printable Items Table */}
          <div className="overflow-hidden border border-slate-300 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3 w-8 text-center">Status</th>
                  <th className="py-2.5 px-3">Item / Insumo</th>
                  <th className="py-2.5 px-3">Categoria</th>
                  <th className="py-2.5 px-3 text-right">Estoque Atual</th>
                  <th className="py-2.5 px-3 text-right">Mínimo</th>
                  <th className="py-2.5 px-3 text-right font-black text-slate-900 bg-slate-200/60">Qtd. Sugerida</th>
                  <th className="py-2.5 px-3 text-right">Custo Unit.</th>
                  <th className="py-2.5 px-3 text-right">Subtotal Previsto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item, idx) => {
                  const subtotal = item.suggestedQty * item.cost;
                  return (
                    <tr key={item.id} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="py-2.5 px-3 text-center">
                        <div className="w-4 h-4 border border-slate-400 rounded-xs mx-auto" />
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        {item.description && (
                          <div className="text-[10px] text-slate-500 truncate max-w-xs">{item.description}</div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {item.category}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-rose-600">
                        {item.stock} {item.unit}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        {item.minStock} {item.unit}
                      </td>
                      <td className="py-2.5 px-3 text-right font-black text-slate-900 bg-slate-100/60">
                        {item.suggestedQty} {item.unit}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        {formatCurrency(item.cost)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {formatCurrency(subtotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Observations and Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="border border-dashed border-slate-300 rounded-lg p-3 text-[11px] text-slate-500 space-y-2">
              <span className="font-bold uppercase text-slate-700 block text-[10px]">Anotações do Comprador</span>
              <p>Fornecedor cotado: _____________________________________</p>
              <p>Prazo de entrega: ____/____/________ • Condição: _____________</p>
            </div>

            <div className="flex flex-col justify-end items-center text-center">
              <div className="w-48 border-b border-slate-400 mb-1" />
              <span className="text-[11px] font-semibold text-slate-700">Assinatura do Recebedor</span>
              <span className="text-[10px] text-slate-400">Conferência física no almoxarifado</span>
            </div>
          </div>
        </div>

        {/* Footer Actions - Screen only */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 print:hidden">
          <span className="text-xs text-slate-500">
            Dica: Utilize a impressora padrão do sistema ou salve como PDF.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Agora (Ctrl+P)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
