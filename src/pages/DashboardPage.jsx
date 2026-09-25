import React, { useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';
import ReservationsTable from '../components/dashboard/ReservationsTable';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import SalesMiniChart from '../components/dashboard/SalesMiniChart';
import TableOverview3D from '../components/dashboard/TableOverview3D';
import PrintOrderModal from '../components/dashboard/PrintOrderModal';
import OrderDetailsModal from '../components/dashboard/OrderDetailsModal';
import {
  initialKpis,
  initialOrders,
  initialReservations,
  initialAlerts
} from '../data/mockData';
import { PlusCircle, Sparkles, RefreshCw, Filter } from 'lucide-react';

export default function DashboardPage({ onTriggerNotificationCount }) {
  const [kpis, setKpis] = useState(initialKpis);
  const [orders, setOrders] = useState(initialOrders);
  const [reservations, setReservations] = useState(initialReservations);
  const [alerts, setAlerts] = useState(initialAlerts);

  // Modals state
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);

  // Status progression handler
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Reservation check-in handler
  const handleCheckInReservation = (resId) => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === resId
          ? { ...r, status: r.status === 'Confirmada' ? 'Em atendimento' : 'Confirmada' }
          : r
      )
    );
  };

  // Alert dismissal
  const handleDismissAlert = (alertId) => {
    const updated = alerts.filter((a) => a.id !== alertId);
    setAlerts(updated);
    if (onTriggerNotificationCount) onTriggerNotificationCount(updated.length);
  };

  // Alert action click
  const handleAlertAction = (alert) => {
    if (alert.category === 'order') {
      const order = orders.find((o) => o.id === alert.actionTarget);
      if (order) setSelectedOrderForDetails(order);
    } else if (alert.category === 'stock') {
      alert(`Item '${alert.title}' adicionado à Lista de Compras do fornecedor.`);
      handleDismissAlert(alert.id);
    } else {
      alert(`Abrindo rastreamento em tempo real do pedido: ${alert.title}`);
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Operational KPI Grid - Compact 6 Cards */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {kpis.map((kpi) => (
            <StatCard key={kpi.id} item={kpi} />
          ))}
        </div>
      </section>

      {/* Operational Control Section: 3D Floor Plan, Sales Rhythm, Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Three.js 3D Tables Canvas (5 cols) */}
        <div className="lg:col-span-4">
          <TableOverview3D />
        </div>

        {/* Sales Mini Chart (4 cols) */}
        <div className="lg:col-span-4">
          <SalesMiniChart />
        </div>

        {/* Alerts Panel (4 cols) */}
        <div className="lg:col-span-4">
          <AlertsPanel
            alerts={alerts}
            onDismissAlert={handleDismissAlert}
            onActionClick={handleAlertAction}
          />
        </div>
      </section>

      {/* Main Operational Tables: Orders and Reservations */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Orders Table (7 cols on XL) */}
        <div className="xl:col-span-7">
          <RecentOrdersTable
            orders={orders}
            onPrintOrder={(order) => setSelectedOrderForPrint(order)}
            onUpdateStatus={handleUpdateOrderStatus}
            onViewOrderDetails={(order) => setSelectedOrderForDetails(order)}
          />
        </div>

        {/* Reservations Table (5 cols on XL) */}
        <div className="xl:col-span-5">
          <ReservationsTable
            reservations={reservations}
            onCheckInReservation={handleCheckInReservation}
          />
        </div>
      </section>

      {/* Modals */}
      <PrintOrderModal
        isOpen={Boolean(selectedOrderForPrint)}
        order={selectedOrderForPrint}
        onClose={() => setSelectedOrderForPrint(null)}
      />

      <OrderDetailsModal
        isOpen={Boolean(selectedOrderForDetails)}
        order={selectedOrderForDetails}
        onClose={() => setSelectedOrderForDetails(null)}
        onPrint={(order) => setSelectedOrderForPrint(order)}
      />
    </div>
  );
}
