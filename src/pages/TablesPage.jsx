import React, { useState, useMemo } from 'react';
import {
  Armchair,
  Users,
  Clock,
  DollarSign,
  CheckCircle2,
  Filter,
  Sparkles,
  MapPin,
  Utensils
} from 'lucide-react';
import TableDetailDrawer from '../components/tables/TableDetailDrawer';
import { initialTables } from '../data/mockData';

export default function TablesPage() {
  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterLocation, setFilterLocation] = useState('ALL');

  // Stats
  const stats = useMemo(() => {
    return {
      total: tables.length,
      free: tables.filter(t => t.status === 'Livre').length,
      occupied: tables.filter(t => t.status === 'Ocupada').length,
      reserved: tables.filter(t => t.status === 'Reservada').length,
      inService: tables.filter(t => t.status === 'Em atendimento').length
    };
  }, [tables]);

  // Filters
  const filteredTables = useMemo(() => {
    return tables.filter(table => {
      if (filterStatus !== 'ALL' && table.status !== filterStatus) return false;
      if (filterLocation !== 'ALL' && table.location !== filterLocation) return false;
      return true;
    });
  }, [tables, filterStatus, filterLocation]);

  // Table actions
  const handleUpdateTableStatus = (tableId, newStatus) => {
    setTables(prev =>
      prev.map(t => (t.id === tableId ? { ...t, status: newStatus } : t))
    );
    if (selectedTable && selectedTable.id === tableId) {
      setSelectedTable(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleStartService = (tableId) => {
    const clientName = prompt('Nome do cliente para abrir comanda:', 'Cliente Balcão/Salão') || 'Cliente Salão';
    setTables(prev =>
      prev.map(t =>
        t.id === tableId
          ? {
              ...t,
              status: 'Em atendimento',
              currentClient: clientName,
              occupiedSince: 'Agora',
              currentBill: 'R$ 0,00',
              items: 'Comanda recém-aberta',
              waiter: 'Carlos (Gerente)'
            }
          : t
      )
    );
    if (selectedTable && selectedTable.id === tableId) {
      setSelectedTable(prev => ({
        ...prev,
        status: 'Em atendimento',
        currentClient: clientName,
        occupiedSince: 'Agora',
        currentBill: 'R$ 0,00'
      }));
    }
  };

  const handleFreeTable = (tableId) => {
    setTables(prev =>
      prev.map(t =>
        t.id === tableId
          ? {
              ...t,
              status: 'Livre',
              currentClient: null,
              currentBill: null,
              occupiedSince: null,
              items: null,
              waiter: null
            }
          : t
      )
    );
    if (selectedTable && selectedTable.id === tableId) {
      setSelectedTable(prev => ({
        ...prev,
        status: 'Livre',
        currentClient: null,
        currentBill: null
      }));
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
            <Armchair className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                Salão & Mesas
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                {stats.free} livres agora
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Controle em tempo real de ocupação, abertura e fechamento de comandas
            </p>
          </div>
        </div>

        {/* Status Legend Pills */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Livre ({stats.free})
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Em atendimento ({stats.inService})
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Reservada ({stats.reserved})
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-slate-800" />
            Ocupada ({stats.occupied})
          </span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs text-xs">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'Todas as Mesas' },
            { id: 'Livre', label: 'Livres' },
            { id: 'Em atendimento', label: 'Em atendimento' },
            { id: 'Reservada', label: 'Reservadas' },
            { id: 'Ocupada', label: 'Ocupadas' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filterStatus === f.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Location selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Ambiente:</span>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer font-medium"
          >
            <option value="ALL">Todos os ambientes</option>
            <option value="Salão Principal">Salão Principal</option>
            <option value="Salão Nobre">Salão Nobre</option>
            <option value="Jardim de Inverno">Jardim de Inverno</option>
            <option value="Balcão Gourmet">Balcão Gourmet</option>
            <option value="Espaço Aniversário">Espaço Aniversário</option>
          </select>
        </div>
      </div>

      {/* Visual Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredTables.map((table) => {
          const isLivre = table.status === 'Livre';
          const isOcupada = table.status === 'Ocupada';
          const isReservada = table.status === 'Reservada';
          const isAtendimento = table.status === 'Em atendimento';

          return (
            <div
              key={table.id}
              onClick={() => setSelectedTable(table)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between h-44 group relative ${
                isLivre
                  ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-500 hover:shadow-xs'
                  : isAtendimento
                  ? 'bg-blue-50/30 border-blue-300 hover:border-blue-500 hover:shadow-xs'
                  : isReservada
                  ? 'bg-amber-50/40 border-amber-300 hover:border-amber-500 hover:shadow-xs'
                  : 'bg-slate-50 border-slate-300 hover:border-slate-500 hover:shadow-xs'
              }`}
            >
              {/* Top: Mesa # and Status Dot */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm font-mono">
                  {table.name}
                </span>

                <span className={`w-2.5 h-2.5 rounded-full ${
                  isLivre ? 'bg-emerald-600' : isAtendimento ? 'bg-blue-600 animate-pulse' : isReservada ? 'bg-amber-600' : 'bg-slate-800'
                }`} />
              </div>

              {/* Middle: Visual Table Representation with Seats */}
              <div className="my-auto flex flex-col items-center justify-center">
                {/* Visual table shape */}
                <div className={`w-14 h-12 rounded-lg border flex flex-col items-center justify-center font-bold text-xs shadow-2xs transition-transform group-hover:scale-105 ${
                  isLivre
                    ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900'
                    : isAtendimento
                    ? 'bg-blue-100 border-blue-400 text-blue-900'
                    : isReservada
                    ? 'bg-amber-100 border-amber-400 text-amber-900'
                    : 'bg-slate-800 border-slate-700 text-white'
                }`}>
                  <Armchair className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px]">{table.capacity}L</span>
                </div>

                {/* Subtext info */}
                <div className="mt-2 text-center">
                  <div className="text-[11px] font-semibold text-slate-900 truncate max-w-[120px]">
                    {isLivre ? 'Disponível' : table.currentClient || table.status}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {table.currentBill ? table.currentBill : table.reservationTime ? `Às ${table.reservationTime}` : table.location}
                  </div>
                </div>
              </div>

              {/* Bottom: Status Badge */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 truncate max-w-[80px]">{table.location}</span>
                <span className={`font-bold px-1.5 py-0.2 rounded ${
                  isLivre
                    ? 'bg-emerald-100 text-emerald-800'
                    : isAtendimento
                    ? 'bg-blue-100 text-blue-800'
                    : isReservada
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-800'
                }`}>
                  {table.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Detail Drawer */}
      <TableDetailDrawer
        table={selectedTable}
        isOpen={Boolean(selectedTable)}
        onClose={() => setSelectedTable(null)}
        onUpdateTableStatus={handleUpdateTableStatus}
        onStartService={handleStartService}
        onFreeTable={handleFreeTable}
      />
    </div>
  );
}
