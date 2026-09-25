import React, { useState } from 'react';
import {
  MapPin,
  Bike,
  Navigation,
  Clock,
  ExternalLink,
  ChevronRight,
  Pizza,
  Radio,
  Layers,
  Info
} from 'lucide-react';
import { establishment } from '../../data/mockData';

export default function DeliveriesMapTracker({
  deliveries,
  onOpenCustomerTracking
}) {
  const activeDeliveries = deliveries.filter(d => ['Em rota', 'Entregador atribuído', 'Aguardando entregador'].includes(d.status));
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(activeDeliveries[0]?.id || null);

  const selectedDelivery = deliveries.find(d => d.id === selectedDeliveryId) || activeDeliveries[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Radar Operacional de Entregas em Tempo Real
            </h2>
            <p className="text-[11px] text-slate-500">
              Acompanhamento de rotas dos motoboys no raio de atendimento da forneria
            </p>
          </div>
        </div>

        {/* GPS integration notice */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Telemetria Logística: <strong>Ativa (Simulada para Integração GPS)</strong></span>
        </div>
      </div>

      {/* Main Container: Map (large) + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Visual Map Canvas Area (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 relative overflow-hidden flex items-center justify-center p-4">
          {/* Subtle Grid / Radar circles overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="absolute w-[440px] h-[440px] rounded-full border border-slate-700/60 pointer-events-none" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-700/80 pointer-events-none" />
          <div className="absolute w-[120px] h-[120px] rounded-full border border-emerald-500/30 pointer-events-none animate-ping" style={{ animationDuration: '4s' }} />

          {/* Center Headquarters: Pizzeria */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-emerald-500/30">
              <Pizza className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 bg-slate-900/90 text-white rounded text-[10px] font-bold border border-slate-700 whitespace-nowrap shadow-sm">
              {establishment.name} (Base)
            </div>
          </div>

          {/* Render Active Delivery Points & Routes on Map */}
          {activeDeliveries.map((del) => {
            const isSelected = selectedDelivery?.id === del.id;
            const coords = del.mapCoords || { x: 50, y: 50 };

            return (
              <React.Fragment key={del.id}>
                {/* SVG Route Line from Base to Delivery */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${coords.x}%`}
                    y2={`${coords.y}%`}
                    stroke={isSelected ? '#38bdf8' : '#475569'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    strokeDasharray={isSelected ? '6,4' : '4,4'}
                    className={isSelected ? 'animate-pulse' : ''}
                  />
                </svg>

                {/* Delivery Destination Pin */}
                <div
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  onClick={() => setSelectedDeliveryId(del.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                >
                  <div className={`p-1.5 rounded-full shadow-lg border-2 flex items-center justify-center ${
                    isSelected
                      ? 'bg-sky-500 text-white border-white ring-4 ring-sky-400/40'
                      : 'bg-indigo-600 text-white border-slate-800'
                  }`}>
                    <Bike className="w-4 h-4" />
                  </div>

                  {/* Marker label */}
                  <div className={`mt-1 px-2 py-0.5 rounded text-[10px] font-bold shadow-md whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-sky-400 text-slate-950 ring-1 ring-sky-300'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700'
                  }`}>
                    {del.orderId} • {del.courier || 'Aguardando'}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Map Controls & Status Badge */}
          <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/80 text-white text-xs max-w-xs">
            <div className="font-bold flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{activeDeliveries.length} Entregas no Raio</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Clique em qualquer motoboy no mapa ou na lista ao lado para rastrear rota
            </div>
          </div>
        </div>

        {/* Side Panel: Entregas em andamento (4 cols) */}
        <div className="lg:col-span-4 border-l border-slate-200 flex flex-col bg-white">
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Entregas em Andamento ({activeDeliveries.length})
            </h3>
            <span className="text-[11px] font-mono text-emerald-700 font-semibold">
              Ao vivo
            </span>
          </div>

          {/* Delivery cards list */}
          <div className="flex-1 p-3 space-y-2.5 overflow-y-auto max-h-[460px]">
            {activeDeliveries.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Nenhuma entrega em trânsito no momento.
              </div>
            ) : (
              activeDeliveries.map((del) => {
                const isSelected = selectedDelivery?.id === del.id;

                return (
                  <div
                    key={del.id}
                    onClick={() => setSelectedDeliveryId(del.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-xs space-y-2 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-400'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 font-mono text-sm">
                        {del.orderId}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        del.status === 'Em rota'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {del.status}
                      </span>
                    </div>

                    <div>
                      <div className="font-semibold text-slate-900">
                        {del.client}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate" title={del.address}>
                        {del.address}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Bike className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{del.courier || 'Não atribuído'}</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500 font-mono">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Saída há {del.elapsedMinutes} min</span>
                      </div>
                    </div>

                    {/* Customer tracking button */}
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCustomerTracking(del);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                      >
                        <span>Ver tela do cliente</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
