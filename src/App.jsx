import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import ReservationsPage from './pages/ReservationsPage';
import TablesPage from './pages/TablesPage';
import DeliveriesPage from './pages/DeliveriesPage';
import CouriersPage from './pages/CouriersPage';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage';
import ShoppingListPage from './pages/ShoppingListPage';
import FinancialPage from './pages/FinancialPage';
import ReportsPage from './pages/ReportsPage';
import ModuleView from './pages/ModuleView';
import PrintOrderModal from './components/dashboard/PrintOrderModal';
import { initialOrders, initialAlerts } from './data/mockData';

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [alertCount, setAlertCount] = useState(initialAlerts.length);
  const [quickPrintModalOpen, setQuickPrintModalOpen] = useState(false);

  // Fast test order for header quick print
  const quickTestOrder = initialOrders[0];

  return (
    <AppLayout
      activeNav={activeNav}
      onSelectNav={(id) => setActiveNav(id)}
      onOpenQuickPrint={() => setQuickPrintModalOpen(true)}
      alertCount={alertCount}
    >
      {activeNav === 'dashboard' ? (
        <DashboardPage onTriggerNotificationCount={(count) => setAlertCount(count)} />
      ) : activeNav === 'pedidos' ? (
        <OrdersPage />
      ) : activeNav === 'reservas' ? (
        <ReservationsPage />
      ) : activeNav === 'mesas' ? (
        <TablesPage />
      ) : activeNav === 'entregas' ? (
        <DeliveriesPage />
      ) : activeNav === 'entregadores' ? (
        <CouriersPage />
      ) : activeNav === 'produtos' ? (
        <ProductsPage />
      ) : activeNav === 'estoque' ? (
        <InventoryPage onNavigateToShoppingList={() => setActiveNav('compras')} />
      ) : activeNav === 'compras' ? (
        <ShoppingListPage onNavigateToInventory={() => setActiveNav('estoque')} />
      ) : activeNav === 'financeiro' ? (
        <FinancialPage />
      ) : activeNav === 'relatorios' ? (
        <ReportsPage />
      ) : (
        <ModuleView
          moduleId={activeNav}
          onBackToDashboard={() => setActiveNav('dashboard')}
        />
      )}

      {/* Global quick print preview */}
      <PrintOrderModal
        isOpen={quickPrintModalOpen}
        order={quickTestOrder}
        onClose={() => setQuickPrintModalOpen(false)}
      />
    </AppLayout>
  );
}
