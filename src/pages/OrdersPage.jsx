import React, { useState, useMemo } from 'react';
import OrdersHeader from '../components/orders/OrdersHeader';
import OrdersFilters from '../components/orders/OrdersFilters';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetailDrawer from '../components/orders/OrderDetailDrawer';
import NewOrderModal from '../components/orders/NewOrderModal';
import AssignCourierModal from '../components/orders/AssignCourierModal';
import PrintOrderModal from '../components/dashboard/PrintOrderModal';
import { initialOrders } from '../data/mockData';

export default function OrdersPage({
  orders: globalOrders,
  onOrdersChange,
  onPrintOrder
}) {
  // Local or shared orders
  const [orders, setOrders] = useState(globalOrders || initialOrders);

  // Filters State
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [searchClient, setSearchClient] = useState('');
  const [searchOrderNumber, setSearchOrderNumber] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  // Modals & Drawers
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [courierModalOrder, setCourierModalOrder] = useState(null);
  const [printModalOrder, setPrintModalOrder] = useState(null);

  // Dynamic Status Counts
  const statusCounts = useMemo(() => {
    const counts = { ALL: orders.length };
    orders.forEach(o => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });
    return counts;
  }, [orders]);

  const newOrdersCount = orders.filter(o => o.status === 'Novo' || o.isUnread).length;

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Status Filter
      if (activeStatus !== 'ALL' && order.status !== activeStatus) {
        return false;
      }

      // 2. Client Filter
      if (searchClient.trim()) {
        const query = searchClient.toLowerCase();
        const matchName = order.client.toLowerCase().includes(query);
        const matchPhone = order.phone.includes(query);
        if (!matchName && !matchPhone) return false;
      }

      // 3. Order Number Filter
      if (searchOrderNumber.trim()) {
        const query = searchOrderNumber.replace('#', '').toLowerCase();
        if (!order.id.toLowerCase().includes(query)) return false;
      }

      // 4. Date Filter
      if (dateFilter === 'today' && order.date !== '25/09/2026') return false;
      if (dateFilter === 'yesterday' && order.date !== '24/09/2026') return false;

      return true;
    });
  }, [orders, activeStatus, searchClient, searchOrderNumber, dateFilter]);

  // Open Order Details Drawer & mark as read
  const handleSelectOrder = (order) => {
    // If order was unread, mark it as read immediately
    if (order.isUnread) {
      setOrders(prev =>
        prev.map(o => (o.id === order.id ? { ...o, isUnread: false } : o))
      );
      order = { ...order, isUnread: false };
    }
    setSelectedOrder(order);
  };

  // Status Progression
  const handleUpdateStatus = (orderId, newStatus) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;

        // Update timeline status
        const updatedTimeline = o.timeline.map(t => {
          if (t.status.toLowerCase().includes(newStatus.toLowerCase())) {
            return { ...t, completed: true, time: t.time || timeStr };
          }
          return t;
        });

        const updatedOrder = {
          ...o,
          status: newStatus,
          isUnread: false,
          timeline: updatedTimeline
        };

        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(updatedOrder);
        }

        return updatedOrder;
      })
    );
  };

  // Cancel Order
  const handleCancelOrder = (orderId, reason) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        const updatedOrder = {
          ...o,
          status: 'Cancelado',
          cancelReason: reason,
          paymentStatus: o.paymentStatus === 'Pago' ? 'Estornado' : 'Cancelado',
          isUnread: false
        };
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(updatedOrder);
        }
        return updatedOrder;
      })
    );
  };

  // Assign Courier
  const handleAssignCourier = (orderId, courierName) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        const updatedOrder = {
          ...o,
          courier: courierName
        };
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(updatedOrder);
        }
        return updatedOrder;
      })
    );
  };

  // Save New Order
  const handleSaveNewOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    // Automatically select the newly created order
    setSelectedOrder(newOrder);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setActiveStatus('ALL');
    setSearchClient('');
    setSearchOrderNumber('');
    setDateFilter('all');
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Orders Header */}
      <OrdersHeader
        onNewOrder={() => setIsNewOrderOpen(true)}
        onPrintBatch={() => {
          if (filteredOrders.length > 0) {
            setPrintModalOrder(filteredOrders[0]);
          } else {
            alert('Nenhum pedido filtrado para imprimir.');
          }
        }}
        showFilters={showAdvancedFilters}
        onToggleFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
        totalCount={orders.length}
        newCount={newOrdersCount}
      />

      {/* Orders Filters */}
      <OrdersFilters
        activeStatus={activeStatus}
        onSelectStatus={setActiveStatus}
        searchClient={searchClient}
        onSearchClientChange={setSearchClient}
        searchOrderNumber={searchOrderNumber}
        onSearchOrderNumberChange={setSearchOrderNumber}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        statusCounts={statusCounts}
        showAdvanced={showAdvancedFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        onSelectOrder={handleSelectOrder}
        onPrintOrder={(order) => setPrintModalOrder(order)}
        onQuickAdvanceStatus={handleUpdateStatus}
        selectedOrderId={selectedOrder?.id}
      />

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onPrint={(order) => setPrintModalOrder(order)}
        onUpdateStatus={handleUpdateStatus}
        onOpenAssignCourier={(order) => setCourierModalOrder(order)}
        onCancelOrder={handleCancelOrder}
      />

      {/* New Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onSaveOrder={handleSaveNewOrder}
      />

      {/* Assign Courier Modal */}
      <AssignCourierModal
        isOpen={Boolean(courierModalOrder)}
        order={courierModalOrder}
        onClose={() => setCourierModalOrder(null)}
        onAssignCourier={handleAssignCourier}
      />

      {/* Print Thermal Modal */}
      <PrintOrderModal
        isOpen={Boolean(printModalOrder)}
        order={printModalOrder}
        onClose={() => setPrintModalOrder(null)}
      />
    </div>
  );
}
