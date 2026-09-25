import React, { useState } from 'react';
import { X, Bike, Check, Phone, ShieldCheck } from 'lucide-react';
import { couriersList } from '../../data/mockData';

export default function AssignCourierModal({
  isOpen,
  order,
  onClose,
  onAssignCourier
}) {
  const [selectedCourierId, setSelectedCourierId] = useState(
    couriersList.find(c => c.name === order?.courier)?.id || couriersList[0].id
  );

  if (!isOpen || !order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const courier = couriersList.find(c => c.id === selectedCourierId);
    if (courier) {
      onAssignCourier(order.id, courier.name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Associar Entregador
              </h3>
              <p className="text-[11px] text-slate-500">
                Pedido {order.id} • {order.client}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Courier List */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {couriersList.map((courier) => {
              const isSelected = selectedCourierId === courier.id;

              return (
                <div
                  key={courier.id}
                  onClick={() => setSelectedCourierId(courier.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-400'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Bike className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{courier.name}</div>
                      <div className="text-[11px] text-slate-500">{courier.vehicle}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{courier.phone}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      courier.status === 'Disponível'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {courier.status}
                    </span>
                    {isSelected && (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
            >
              Confirmar Entregador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
