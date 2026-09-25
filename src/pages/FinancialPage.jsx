import React, { useState } from 'react';
import FinancialHeader from '../components/financial/FinancialHeader';
import RevenueChart from '../components/financial/RevenueChart';
import FinancialResultsCard from '../components/financial/FinancialResultsCard';
import TransactionsTable from '../components/financial/TransactionsTable';
import TransactionModal from '../components/financial/TransactionModal';
import { initialFinancialEntries, financialPeriodsData } from '../data/mockData';

export default function FinancialPage() {
  const [period, setPeriod] = useState('hoje');
  const [customDates, setCustomDates] = useState({ start: '2026-09-01', end: '2026-09-25' });
  const [transactions, setTransactions] = useState(initialFinancialEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Period data
  const baseMetrics = financialPeriodsData[period] || financialPeriodsData.hoje;

  // Real-time calculations taking into account added manual transactions
  const manualRevenues = transactions
    .filter((t) => t.type === 'Receita' && t.status === 'Confirmado' && t.id.startsWith('fin-manual-'))
    .reduce((sum, t) => sum + t.value, 0);

  const manualExpenses = transactions
    .filter((t) => t.type === 'Despesa' && t.status === 'Confirmado' && t.id.startsWith('fin-manual-'))
    .reduce((sum, t) => sum + t.value, 0);

  const computedRevenue = baseMetrics.revenue + manualRevenues;
  const computedCosts = baseMetrics.costs;
  const computedExpenses = baseMetrics.expenses + manualExpenses;
  const computedGrossProfit = computedRevenue - computedCosts;
  const computedNetProfit = computedGrossProfit - computedExpenses;

  const currentMetrics = {
    ...baseMetrics,
    revenue: computedRevenue,
    costs: computedCosts,
    expenses: computedExpenses,
    grossProfit: computedGrossProfit,
    netProfit: computedNetProfit
  };

  const handleSaveTransaction = (newTx) => {
    const txWithManualId = {
      ...newTx,
      id: `fin-manual-${Date.now()}`
    };
    setTransactions((prev) => [txWithManualId, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Deseja excluir este lançamento financeiro?')) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Confirmado' ? 'Pendente' : 'Confirmado' }
          : t
      )
    );
  };

  return (
    <div className="space-y-5">
      {/* Header with 5 KPIs & Period filter */}
      <FinancialHeader
        period={period}
        onSelectPeriod={setPeriod}
        customDates={customDates}
        onChangeCustomDate={(key, val) => setCustomDates((prev) => ({ ...prev, [key]: val }))}
        metrics={currentMetrics}
        onOpenNewTransaction={() => setIsModalOpen(true)}
      />

      {/* Grid: Revenue Evolution Chart + DRE Synthetic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart
          timeline={currentMetrics.timeline}
          title={`Evolução do Faturamento (${currentMetrics.label})`}
        />
        <FinancialResultsCard metrics={currentMetrics} />
      </div>

      {/* Transactions Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Livro Caixa & Lançamentos ({transactions.length})
          </h2>
          <span className="text-xs text-slate-500">
            Valores atualizados automaticamente com os pedidos do sistema
          </span>
        </div>
        <TransactionsTable
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      {/* Manual Entry Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
