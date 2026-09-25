import React, { useState } from 'react';
import ReportsHeader from '../components/reports/ReportsHeader';
import SalesReportView from '../components/reports/SalesReportView';
import FinancialReportView from '../components/reports/FinancialReportView';
import InventoryReportView from '../components/reports/InventoryReportView';
import DeliveriesReportView from '../components/reports/DeliveriesReportView';
import PrintReportModal from '../components/reports/PrintReportModal';
import { financialPeriodsData } from '../data/mockData';

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('vendas');
  const [period, setPeriod] = useState('hoje');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const metrics = financialPeriodsData[period] || financialPeriodsData.hoje;

  return (
    <div className="space-y-5">
      {/* Header with Tabs and Filters */}
      <ReportsHeader
        activeReport={activeReport}
        onSelectReport={setActiveReport}
        period={period}
        onSelectPeriod={setPeriod}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* Report Dynamic Content */}
      {activeReport === 'vendas' && <SalesReportView metrics={metrics} />}
      {activeReport === 'financeiro' && <FinancialReportView metrics={metrics} />}
      {activeReport === 'estoque' && <InventoryReportView metrics={metrics} />}
      {activeReport === 'entregas' && <DeliveriesReportView metrics={metrics} />}

      {/* Print Modal */}
      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        reportType={activeReport}
        period={period}
        metrics={metrics}
      />
    </div>
  );
}
