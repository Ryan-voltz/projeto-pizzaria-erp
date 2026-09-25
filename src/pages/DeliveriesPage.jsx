import React, { useState } from 'react';
import DeliveriesHeader from '../components/deliveries/DeliveriesHeader';
import DeliveriesTable from '../components/deliveries/DeliveriesTable';
import DeliveriesMapTracker from '../components/deliveries/DeliveriesMapTracker';
import AssignCourierModal from '../components/orders/AssignCourierModal';
import CustomerTrackingPage from './CustomerTrackingPage';
import { initialDeliveries } from '../data/mockData';

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'map'
  const [periodFilter, setPeriodFilter] = useState('today');

  // Modals
  const [courierModalDelivery, setCourierModalDelivery] = useState(null);
  const [customerTrackingDelivery, setCustomerTrackingDelivery] = useState(null);

  const stats = {
    total: deliveries.length,
    inRoute: deliveries.filter(d => d.status === 'Em rota').length,
    waiting: deliveries.filter(d => d.status === 'Aguardando entregador').length,
    delivered: deliveries.filter(d => d.status === 'Entregue').length
  };

  const handleUpdateStatus = (deliveryId, newStatus) => {
    setDeliveries(prev =>
      prev.map(d => (d.id === deliveryId ? { ...d, status: newStatus } : d))
    );
  };

  const handleAssignCourier = (deliveryId, courierName) => {
    setDeliveries(prev =>
      prev.map(d =>
        d.id === deliveryId
          ? {
              ...d,
              courier: courierName,
              status: d.status === 'Aguardando entregador' ? 'Entregador atribuído' : d.status
            }
          : d
      )
    );
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <DeliveriesHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        periodFilter={periodFilter}
        onPeriodFilterChange={setPeriodFilter}
        stats={stats}
      />

      {/* Main Content */}
      {viewMode === 'table' ? (
        <DeliveriesTable
          deliveries={deliveries}
          onOpenCustomerTracking={(del) => setCustomerTrackingDelivery(del)}
          onViewOnMap={(del) => setViewMode('map')}
          onAssignCourier={(del) => setCourierModalDelivery(del)}
          onUpdateStatus={handleUpdateStatus}
        />
      ) : (
        <DeliveriesMapTracker
          deliveries={deliveries}
          onOpenCustomerTracking={(del) => setCustomerTrackingDelivery(del)}
        />
      )}

      {/* Assign Courier Modal */}
      <AssignCourierModal
        isOpen={Boolean(courierModalDelivery)}
        order={courierModalDelivery}
        onClose={() => setCourierModalDelivery(null)}
        onAssignCourier={(id, courierName) => handleAssignCourier(courierModalDelivery.id, courierName)}
      />

      {/* Customer Tracking Modal / Screen */}
      {customerTrackingDelivery && (
        <CustomerTrackingPage
          delivery={customerTrackingDelivery}
          onClose={() => setCustomerTrackingDelivery(null)}
        />
      )}
    </div>
  );
}
