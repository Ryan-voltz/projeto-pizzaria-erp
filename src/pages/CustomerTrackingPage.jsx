import React from 'react';
import {
  X,
  Bike,
  Check,
  Clock,
  MapPin,
  Pizza,
  Phone,
  ShieldCheck,
  Navigation,
  Radio,
  ExternalLink
} from 'lucide-react';
import { establishment } from '../data/mockData';

export default function CustomerTrackingPage({
  delivery,
  onClose
}) {
  if (!delivery) return null;

  const timelineSteps = [
    { label: 'Pedido recebido', completed: true, time: delivery.time },
    { label: 'Em preparo', completed: true, time: 'No forno a lenha' },
    { label: 'Pedido pronto', completed: true, time: 'Conferido na caixa térmica' },
    {
      label: 'Saiu para entrega',
      completed: delivery.status === 'Em rota' || delivery.status === 'Entregue',
      current: delivery.status === 'Em rota',
      time: delivery.dispatchedAt || 'Em trânsito'
    },
    {
      label: 'Entregue',
      completed: delivery.status === 'Entregue',
      current: delivery.status === 'Entregue',
      time: delivery.status === 'Entregue' ? 'Concluído' : 'Aguardando chegada'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-700 text-white shadow-xs">
              <Pizza className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-400">
                {establishment.name}
              </div>
              <h2 className="text-base font-bold leading-tight">
                Seu pedido está a caminho!
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
          {/* Status & Estimated Arrival Card */}
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Previsão de Entrega
              </span>
              <div className="text-xl font-bold text-slate-900 mt-0.5">
                {delivery.estimatedArrival || 'Aprox. 15-20 minutos'}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Pedido {delivery.orderId} • {delivery.client}
              </div>
            </div>

            <div className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-bold text-center shadow-xs shrink-0">
              {delivery.status}
            </div>
          </div>

          {/* Customer Timeline (5 Steps) */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Progresso do seu Pedido
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timelineSteps.map((step, idx) => (
                <div key={step.label} className="relative group">
                  {/* Bullet */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      step.completed
                        ? 'bg-emerald-700 border-white text-white shadow-xs'
                        : step.current
                        ? 'bg-indigo-600 border-white text-white ring-2 ring-indigo-400 animate-pulse'
                        : 'bg-white border-slate-300 text-slate-300'
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-bold text-xs ${
                        step.completed || step.current ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {step.label}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {step.time}
                      </div>
                    </div>

                    {step.current && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        Etapa Atual
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Route Map for Client */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                <Navigation className="w-3.5 h-3.5 text-indigo-600" />
                <span>Rota de Entrega em Tempo Real</span>
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                <span>Simulação Pronta para GPS</span>
              </span>
            </div>

            {/* Radar Canvas with Origin, Motoboy & Destination */}
            <div className="h-48 bg-slate-900 relative flex items-center justify-center overflow-hidden p-4">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Path Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="20%"
                  y1="50%"
                  x2="80%"
                  y2="50%"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  className="animate-pulse"
                />
              </svg>

              {/* Point 1: Pizzeria */}
              <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-md">
                  <Pizza className="w-4 h-4" />
                </div>
                <span className="mt-1 text-[10px] text-white font-bold bg-slate-900/90 px-1.5 py-0.2 rounded border border-slate-700 whitespace-nowrap">
                  Pizzaria
                </span>
              </div>

              {/* Point 2: Courier in Transit */}
              <div
                style={{ left: `${20 + (delivery.routeProgress || 65) * 0.6}%` }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center border-2 border-white shadow-lg ring-4 ring-indigo-500/40 animate-bounce">
                  <Bike className="w-4 h-4" />
                </div>
                <span className="mt-1 text-[10px] text-slate-950 font-bold bg-sky-300 px-2 py-0.5 rounded shadow whitespace-nowrap">
                  {delivery.courier || 'Entregador'}
                </span>
              </div>

              {/* Point 3: Customer Destination */}
              <div className="absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-white shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="mt-1 text-[10px] text-white font-bold bg-slate-900/90 px-1.5 py-0.2 rounded border border-slate-700 whitespace-nowrap">
                  Seu Endereço
                </span>
              </div>
            </div>
          </div>

          {/* Courier Card & Direct Contact */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                {delivery.courier ? delivery.courier[0] : 'M'}
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Entregador Responsável
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {delivery.courier || 'Aguardando atribuição de motoboy'}
                </div>
                <div className="text-[11px] text-slate-500">
                  Despachado com bag térmica lacrada
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Ligando para suporte da ${establishment.name}: ${establishment.phone}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-2xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Suporte</span>
            </button>
          </div>

          {/* Order items recap */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-900">Itens do Pedido: </span>
              <span className="text-slate-600">{delivery.items}</span>
            </div>
            <span className="font-bold text-slate-900 font-mono">{delivery.value}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            URL conceitual: /rastrear/{delivery.orderId.replace('#', '')}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
