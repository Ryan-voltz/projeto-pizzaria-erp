import React, { useState } from 'react';
import { Bike, Plus, Search, CheckCircle2, Power, Clock } from 'lucide-react';
import CouriersTable from '../components/couriers/CouriersTable';
import CourierModal from '../components/couriers/CourierModal';
import { initialCouriers } from '../data/mockData';

export default function CouriersPage() {
  const [couriers, setCouriers] = useState(initialCouriers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourier, setEditingCourier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const stats = {
    total: couriers.length,
    available: couriers.filter(c => c.status === 'Disponível').length,
    inDelivery: couriers.filter(c => c.status === 'Em entrega').length,
    offline: couriers.filter(c => c.status === 'Offline').length
  };

  const filteredCouriers = couriers.filter(c => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchPhone = c.phone.includes(q);
      const matchPlate = c.plate.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchPlate) return false;
    }
    return true;
  });

  const handleSaveCourier = (courierData) => {
    if (editingCourier) {
      setCouriers(prev =>
        prev.map(c => (c.id === courierData.id ? { ...c, ...courierData } : c))
      );
    } else {
      setCouriers(prev => [courierData, ...prev]);
    }
    setEditingCourier(null);
  };

  const handleToggleStatus = (id, newStatus) => {
    setCouriers(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
            <Bike className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                Equipe de Entregadores
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                {stats.available} disponíveis
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cadastro de frota, disponibilidade de motoboys e histórico de entregas
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingCourier(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar entregador</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'Disponível', label: `Disponíveis (${stats.available})` },
            { id: 'Em entrega', label: `Em entrega (${stats.inDelivery})` },
            { id: 'Offline', label: `Offline (${stats.offline})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                statusFilter === f.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar por nome, fone ou placa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Couriers Table */}
      <CouriersTable
        couriers={filteredCouriers}
        onEditCourier={(c) => {
          setEditingCourier(c);
          setIsModalOpen(true);
        }}
        onToggleStatus={handleToggleStatus}
      />

      {/* Courier Modal */}
      <CourierModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourier(null);
        }}
        courierToEdit={editingCourier}
        onSaveCourier={handleSaveCourier}
      />
    </div>
  );
}
