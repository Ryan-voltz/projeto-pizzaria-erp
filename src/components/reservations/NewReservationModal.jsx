import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { initialTables, initialSpaces } from '../../data/mockData';

export default function NewReservationModal({
  isOpen,
  onClose,
  onSaveReservation,
  existingReservations = []
}) {
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('25/09/2026');
  const [time, setTime] = useState('20:00');
  const [people, setPeople] = useState(4);
  const [selectedTable, setSelectedTable] = useState('Mesa 02');
  const [selectedSpace, setSelectedSpace] = useState('Salão Principal');
  const [type, setType] = useState('Jantar');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  // Real-time Availability Check
  const availabilityCheck = useMemo(() => {
    // Check if table is already booked around that date and time (+/- 1.5h)
    const conflict = existingReservations.find(r =>
      r.date === date &&
      r.table === selectedTable &&
      r.status !== 'Cancelada' &&
      Math.abs(parseInt(r.time.replace(':', '')) - parseInt(time.replace(':', ''))) < 130
    );

    const targetTableObj = initialTables.find(t => t.name === selectedTable);
    const capacityExceeded = targetTableObj && Number(people) > targetTableObj.capacity;

    if (conflict) {
      return {
        available: false,
        status: 'occupied',
        message: `Mesa ${selectedTable} indisponível: já possui reserva para ${conflict.client} às ${conflict.time}.`,
        severity: 'danger'
      };
    }

    if (capacityExceeded) {
      return {
        available: true,
        status: 'warning',
        message: `Atenção: A capacidade padrão da ${selectedTable} é de ${targetTableObj.capacity} lugares (solicitado: ${people} pessoas). Pode requerer cadeiras extras.`,
        severity: 'warning'
      };
    }

    return {
      available: true,
      status: 'free',
      message: `Disponível! A ${selectedTable} (${targetTableObj ? targetTableObj.capacity : 4} lugares) está livre em ${date} às ${time}.`,
      severity: 'success'
    };
  }, [date, time, selectedTable, people, existingReservations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!client.trim()) {
      alert('Informe o nome do cliente.');
      return;
    }

    if (!availabilityCheck.available) {
      if (!confirm(`Aviso: ${availabilityCheck.message}\nDeseja forçar o agendamento mesmo assim?`)) {
        return;
      }
    }

    const randomCode = `RES-${Math.floor(110 + Math.random() * 90)}`;
    const newReservation = {
      id: `res-${Date.now()}`,
      code: randomCode,
      date,
      time,
      client,
      phone: phone || '(11) 99000-0000',
      people: Number(people),
      table: selectedTable,
      space: selectedSpace,
      type,
      notes,
      status: 'Confirmada'
    };

    onSaveReservation(newReservation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Nova Reserva de Mesa / Espaço
              </h3>
              <p className="text-[11px] text-slate-500">
                Validação de disponibilidade de horário em tempo real
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto text-xs">
          {/* Customer & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Nome do Cliente *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Beatriz Oliveira"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                placeholder="(11) 98000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Date, Time & People */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Data
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="DD/MM/AAAA"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Horário Previsto
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white font-mono cursor-pointer"
              >
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Quantidade de Pessoas
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white font-mono"
              />
            </div>
          </div>

          {/* Space & Table Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Espaço / Ambiente
              </label>
              <select
                value={selectedSpace}
                onChange={(e) => setSelectedSpace(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white cursor-pointer"
              >
                {initialSpaces.map(sp => (
                  <option key={sp.id} value={sp.name}>{sp.name} (Até {sp.capacity} pessoas)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Mesa Sugerida
              </label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white cursor-pointer font-medium"
              >
                {initialTables.map(t => (
                  <option key={t.id} value={t.name}>
                    {t.name} — {t.capacity} lugares ({t.location})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo de Reserva */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Tipo de Reserva
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {['Jantar', 'Aniversário', 'Confraternização', 'Casamento', 'Corporativo'].map((tp) => (
                <button
                  key={tp}
                  type="button"
                  onClick={() => setType(tp)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-colors border ${
                    type === tp
                      ? 'bg-slate-900 text-white font-semibold border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tp}
                </button>
              ))}
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Observações (bolo próprio, restrição alimentar, mesa janela, etc.)
            </label>
            <input
              type="text"
              placeholder="Ex: Celíaco, comemoração de 10 anos de casados..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          {/* Live Availability Notice */}
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
            availabilityCheck.severity === 'danger'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : availabilityCheck.severity === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="mt-0.5 shrink-0">
              {availabilityCheck.severity === 'danger' ? (
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              ) : availabilityCheck.severity === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              )}
            </div>
            <div>
              <div className="font-bold text-xs">
                Checagem de Disponibilidade:
              </div>
              <div className="text-[11px] mt-0.5 leading-relaxed">
                {availabilityCheck.message}
              </div>
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
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
