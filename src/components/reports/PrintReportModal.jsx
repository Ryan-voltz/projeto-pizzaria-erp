import React from 'react';
import { X, Printer, Pizza } from 'lucide-react';
import { establishment } from '../../data/mockData';

export default function PrintReportModal({
  isOpen = false,
  onClose,
  reportType = 'vendas',
  period = 'hoje',
  metrics = {}
}) {
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

  const reportTitles = {
    vendas: 'Relatório Executivo de Vendas & Faturamento',
    financeiro: 'Demonstrativo Contábil & DRE Sintético',
    estoque: 'Balanço de Movimentações & Insumos Críticos',
    entregas: 'Relatório Operacional de Despacho & Logística'
  };

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
              <h2 className="text-base font-bold text-slate-900">Impressão do Relatório Executivo</h2>
              <p className="text-xs text-slate-500">
                Formato A4 limpo preparado para arquivamento fiscal e gestão
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
        <div className="p-8 bg-white text-slate-900 font-sans space-y-6">
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
                  {establishment.address} • CNPJ: {establishment.cnpj}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Relatório Gerencial
              </div>
              <div className="text-sm font-black text-slate-900">
                {reportTitles[reportType] || 'Relatório Analítico'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Período: <strong>{metrics.label || period}</strong> • Emitido: {currentDate}
              </div>
            </div>
          </div>

          {/* Core Metrics Summary */}
          <div className="grid grid-cols-4 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Faturamento</span>
              <strong className="text-sm text-slate-900">{formatCurrency(metrics.revenue)}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Custos (CMV)</span>
              <strong className="text-sm text-slate-900">{formatCurrency(metrics.costs)}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Despesas</span>
              <strong className="text-sm text-slate-900">{formatCurrency(metrics.expenses)}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Resultado Líquido</span>
              <strong className="text-sm text-emerald-700">{formatCurrency(metrics.netProfit)}</strong>
            </div>
          </div>

          {/* DRE Sintético do Período */}
          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
            <div className="bg-slate-100 p-2.5 font-bold uppercase text-[11px] text-slate-800 border-b border-slate-300">
              Demonstrativo Consolidado
            </div>
            <div className="divide-y divide-slate-200">
              <div className="flex justify-between p-2.5">
                <span className="font-semibold">(+) Faturamento Bruto de Vendas</span>
                <span className="font-bold">{formatCurrency(metrics.revenue)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-slate-700">(-) Custos Operacionais / CMV</span>
                <span className="text-amber-800 font-semibold">{formatCurrency(metrics.costs)}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-blue-50/40">
                <span className="font-bold text-blue-900">(=) Lucro Bruto Operacional</span>
                <span className="font-bold text-blue-900">{formatCurrency(metrics.grossProfit)}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-slate-700">(-) Despesas Administrativas & Logística</span>
                <span className="text-rose-700 font-semibold">{formatCurrency(metrics.expenses)}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-emerald-50">
                <span className="font-black text-emerald-900">(=) Lucro Líquido Real</span>
                <span className="font-black text-emerald-900">{formatCurrency(metrics.netProfit)}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 border border-slate-200 rounded-lg space-y-1">
              <span className="font-bold text-slate-800 block text-[11px] uppercase">Operação de Pedidos</span>
              <p className="text-slate-600">Total de pedidos finalizados: <strong>{metrics.ordersCount || 48}</strong></p>
              <p className="text-slate-600">Ticket médio apurado: <strong>{formatCurrency(metrics.avgTicket)}</strong></p>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg space-y-1">
              <span className="font-bold text-slate-800 block text-[11px] uppercase">Logística & Despacho</span>
              <p className="text-slate-600">Entregas realizadas: <strong>{metrics.deliveriesCompleted || 31}</strong></p>
              <p className="text-slate-600">Tempo médio de trânsito: <strong>{metrics.avgDeliveryTime || '24 min'}</strong></p>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="w-48 border-b border-slate-400 mx-auto mb-1" />
              <span className="font-semibold text-slate-700">Carlos Silva - Gerente Geral</span>
            </div>
            <div>
              <div className="w-48 border-b border-slate-400 mx-auto mb-1" />
              <span className="font-semibold text-slate-700">Controladoria / Auditoria</span>
            </div>
          </div>
        </div>

        {/* Footer Actions - Screen only */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 print:hidden">
          <span className="text-xs text-slate-500">
            Dica: Salve como PDF na tela de impressão ou envie diretamente à impressora.
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
