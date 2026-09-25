import React, { useState } from 'react';
import ReservationsHeader from '../components/reservations/ReservationsHeader';
import ReservationsList from '../components/reservations/ReservationsList';
import ReservationsCalendar from '../components/reservations/ReservationsCalendar';
import SpacesManager from '../components/reservations/SpacesManager';
import NewReservationModal from '../components/reservations/NewReservationModal';
import PrintReservationModal from '../components/reservations/PrintReservationModal';
import { initialReservations } from '../data/mockData';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar' | 'spaces'
  const [showFilters, setShowFilters] = useState(true);

  // Modals
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);
  const [printReservation, setPrintReservation] = useState(null);

  // Update Status
  const handleUpdateStatus = (id, newStatus) => {
    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Cancel Reservation
  const handleCancelReservation = (id) => {
    if (confirm('Deseja realmente cancelar esta reserva?')) {
      setReservations(prev =>
        prev.map(r => (r.id === id ? { ...r, status: 'Cancelada' } : r))
      );
    }
  };

  // Save New Reservation
  const handleSaveReservation = (newRes) => {
    setReservations(prev => [newRes, ...prev]);
    // Automatically offer print preview
    setPrintReservation(newRes);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <ReservationsHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNewReservation={() => setIsNewReservationOpen(true)}
        onPrintBatch={() => {
          if (reservations.length > 0) {
            setPrintReservation(reservations[0]);
          }
        }}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        totalCount={reservations.length}
      />

      {/* Main Content based on View Mode */}
      {viewMode === 'list' && (
        <ReservationsList
          reservations={reservations}
          onPrintReservation={(res) => setPrintReservation(res)}
          onUpdateStatus={handleUpdateStatus}
          onCancelReservation={handleCancelReservation}
        />
      )}

      {viewMode === 'calendar' && (
        <ReservationsCalendar
          reservations={reservations}
          onPrintReservation={(res) => setPrintReservation(res)}
        />
      )}

      {viewMode === 'spaces' && (
        <SpacesManager
          onSelectSpaceForReservation={(spaceName) => {
            setIsNewReservationOpen(true);
          }}
        />
      )}

      {/* New Reservation Modal */}
      <NewReservationModal
        isOpen={isNewReservationOpen}
        onClose={() => setIsNewReservationOpen(false)}
        onSaveReservation={handleSaveReservation}
        existingReservations={reservations}
      />

      {/* Print Thermal Slip Modal */}
      <PrintReservationModal
        isOpen={Boolean(printReservation)}
        reservation={printReservation}
        onClose={() => setPrintReservation(null)}
      />
    </div>
  );
}
