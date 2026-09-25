import React, { useState } from 'react';
import {
  BarChart3,
  ShoppingBag,
  DollarSign,
  Package,
  Truck,
  Printer,
  Download,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function ReportsHeader({
  activeReport = 'vendas', // 'vendas' | 'financeiro' | 'estoque' | 'entregas'
  onSelectReport,
  period = 'hoje',
  onSelectPeriod,
  onOpenPrintModal
}) {
  const [showExportNotice, setShowExportNotice] = useState(false);

  const reportTabs = [
    { id: 'vendas', label: 'Vendas & Produtos', icon: ShoppingBag },
    { id: 'financeiro', label: 'Financeiro & DRE', icon: DollarSign },
    { id: 'estoque', label: 'Estoque & Insumos', icon: Package },
    { id: 'entregas', label: 'Logística & Entregas', icon: Truck }
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Relatórios & Inteligência Operacional</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700 border border-slate-200">
              Analítico
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Métricas consolidadas de vendas, resultado financeiro, giro de estoque e despacho de entregas.
          </p>
        </div>

        <div className="flex items-center gap-2 relative">
          {/* Export architecture button */}
          <button
            onClick={() => setShowExportNotice(!showExportNotice)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            title="Exportação de dados analíticos"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar</span>
          </button>

          {/* Export Notice Popover (Honest architecture notification) */}
          {showExportNotice && (
            <div className="absolute right-0 top-11 w-72 p-3 bg-white rounded-xl border border-slate-200 shadow-xl z-30 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block font-semibold">Arquitetura de Exportação</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Os contratos de dados (CSV, Excel e JSON) estão estruturados no frontend prontos para conexão com a rota de geração do servidor.
                  </p>
                  <p className="text-[10px] text-emerald-700 font-medium mt-1">
                    Utilize o botão "Imprimir Relatório" para gerar PDF nativo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Print Report */}
          <button
            onClick={onOpenPrintModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Relatório</span>
          </button>
        </div>
      </div>

      {/* Tabs and Period Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
        {/* Report selection tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {reportTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeReport === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectReport(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 border-t lg:border-t-0 lg:border-l border-slate-200 pt-2 lg:pt-0 lg:pl-3 overflow-x-auto">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
          <button
            onClick={() => onSelectPeriod('hoje')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              period === 'hoje'
                ? 'bg-emerald-100 text-emerald-800 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Hoje
          </button>
          <button
            onClick={() => onSelectPeriod('7dias')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              period === '7dias'
                ? 'bg-emerald-100 text-emerald-800 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            7 dias
          </button>
          <button
            onClick={() => onSelectPeriod('30dias')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              period === '30dias'
                ? 'bg-emerald-100 text-emerald-800 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            30 dias
          </button>
          <button
            onClick={() => onSelectPeriod('mesAtual')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              period === 'mesAtual'
                ? 'bg-emerald-100 text-emerald-800 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Mês atual
          </button>
        </div>
      </div>
    </div>
  );
}
