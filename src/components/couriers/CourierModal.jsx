import React, { useState, useEffect } from 'react';
import { X, Bike, Phone, User, ShieldCheck } from 'lucide-react';

export default function CourierModal({
  isOpen,
  onClose,
  courierToEdit,
  onSaveCourier
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('Honda CG 160 Fan');
  const [plate, setPlate] = useState('');
  const [status, setStatus] = useState('Disponível');

  useEffect(() => {
    if (courierToEdit) {
      setName(courierToEdit.name);
      setPhone(courierToEdit.phone);
      setVehicle(courierToEdit.vehicle);
      setPlate(courierToEdit.plate || '');
      setStatus(courierToEdit.status);
    } else {
      setName('');
      setPhone('');
      setVehicle('Honda CG 160 Fan');
      setPlate('');
      setStatus('Disponível');
    }
  }, [courierToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Informe o nome do entregador.');
      return;
    }

    const initials = name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const courierData = {
      id: courierToEdit ? courierToEdit.id : `cour-${Date.now()}`,
      name,
      phone: phone || '(11) 99000-0000',
      vehicle,
      plate: plate ? plate.toUpperCase() : 'SEM PLACA',
      status,
      completedToday: courierToEdit ? courierToEdit.completedToday : 0,
      activeDeliveries: courierToEdit ? courierToEdit.activeDeliveries : 0,
      lastActive: courierToEdit ? courierToEdit.lastActive : 'Agora',
      rating: courierToEdit ? courierToEdit.rating : '5.0',
      initials
    };

    onSaveCourier(courierData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {courierToEdit ? 'Editar Entregador' : 'Cadastrar Novo Entregador'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Gestão de frota e dados cadastrais de motoboys
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Lucas Motoboy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                placeholder="(11) 98000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Status de Trabalho
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white cursor-pointer font-medium"
              >
                <option value="Disponível">Disponível</option>
                <option value="Em entrega">Em entrega</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Veículo / Modelo
              </label>
              <input
                type="text"
                placeholder="Ex: Honda CG 160"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Placa da Moto
              </label>
              <input
                type="text"
                placeholder="ABC-1234"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white font-mono uppercase"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
            >
              Salvar Entregador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
