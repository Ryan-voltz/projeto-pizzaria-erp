import React, { useState } from 'react';
import { Layers, Plus, Users, DollarSign, CheckCircle2, Clock, MapPin, X, Info } from 'lucide-react';
import { initialSpaces } from '../../data/mockData';

export default function SpacesManager({ onSelectSpaceForReservation }) {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [isNewSpaceModalOpen, setIsNewSpaceModalOpen] = useState(false);

  // New Space Form State
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(30);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('Disponível para reservas');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('Salão');

  const handleCreateSpace = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Informe o nome do espaço.');
      return;
    }

    const newSpace = {
      id: `sp-${Date.now()}`,
      name,
      capacity: Number(capacity),
      description,
      price: price || 'Consumo sob consulta',
      availability,
      notes,
      type
    };

    setSpaces(prev => [...prev, newSpace]);
    setIsNewSpaceModalOpen(false);
    // Reset
    setName('');
    setDescription('');
    setPrice('');
    setNotes('');
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Espaços Locáveis & Eventos Especiais
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Áreas reserváveis para aniversários, casamentos, confraternizações e áreas VIP
          </p>
        </div>

        <button
          onClick={() => setIsNewSpaceModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar novo espaço</span>
        </button>
      </div>

      {/* Grid of Spaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-100 text-slate-700">
                    {space.type}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {space.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <Users className="w-3.5 h-3.5" />
                  <span>Até {space.capacity} pess.</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {space.description}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Condições / Valor:</span>
                  <span className="font-semibold text-slate-900">{space.price}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {space.availability}
                  </span>
                </div>
              </div>

              {space.notes && (
                <div className="p-2 bg-amber-50/70 border border-amber-200/60 rounded-lg text-[11px] text-amber-900">
                  <span className="font-semibold">Regras: </span>
                  {space.notes}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Integrado ao Calendário</span>
              <button
                onClick={() => onSelectSpaceForReservation(space.name)}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                Agendar neste espaço
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Cadastrar Novo Espaço */}
      {isNewSpaceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Cadastrar Espaço para Eventos</h3>
                  <p className="text-[11px] text-slate-500">Adicione novas áreas para reservas no estabelecimento</p>
                </div>
              </div>
              <button onClick={() => setIsNewSpaceModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSpace} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nome do Espaço *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Terraço Gourmet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tipo de Espaço</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                  >
                    <option value="Salão">Salão</option>
                    <option value="Área externa">Área externa</option>
                    <option value="Espaço para aniversário">Espaço para aniversário</option>
                    <option value="Espaço para casamento">Espaço para casamento</option>
                    <option value="Área VIP">Área VIP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Capacidade (Pessoas)</label>
                  <input
                    type="number"
                    min="1"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Valor / Consumo Mínimo</label>
                  <input
                    type="text"
                    placeholder="Ex: Locação R$ 400,00 ou Consumo R$ 2.000,00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Descrição</label>
                <textarea
                  rows={2}
                  placeholder="Descreva a ambientação, infraestrutura e características..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Observações e Regras</label>
                <input
                  type="text"
                  placeholder="Ex: Som permitido até às 22h, proibido fogos..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewSpaceModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                >
                  Salvar Espaço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
