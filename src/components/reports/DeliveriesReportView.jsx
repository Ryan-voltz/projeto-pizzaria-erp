import React from 'react';
import { Truck, CheckCircle2, Clock, Bike, Star } from 'lucide-react';
import { initialCouriers } from '../../data/mockData';

export default function DeliveriesReportView({ metrics = {} }) {
  const deliveriesTotal = metrics.deliveriesCount || 32;
  const deliveriesCompleted = metrics.deliveriesCompleted || 31;
  const avgTime = metrics.avgDeliveryTime || '24 min';
  const successRate = Math.round((deliveriesCompleted / (deliveriesTotal || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total de Entregas */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Despachado</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{deliveriesTotal}</span>
            <span className="text-[11px] text-slate-400">corridas</span>
          </div>
        </div>

        {/* Entregas Concluídas */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Entregas Concluídas</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-700">{deliveriesCompleted}</span>
            <span className="text-[11px] text-emerald-700 font-semibold">{successRate}% taxa</span>
          </div>
        </div>

        {/* Tempo Médio */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Tempo Médio de Entrega</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{avgTime}</span>
            <span className="text-[11px] text-slate-400">saída até cliente</span>
          </div>
        </div>

        {/* Frota Ativa */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Frota Escalada</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Bike className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{initialCouriers.length}</span>
            <span className="text-[11px] text-slate-400">motoboys ativos</span>
          </div>
        </div>
      </div>

      {/* Tabela de Entregadores */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bike className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Desempenho Individual dos Entregadores ({metrics.label})
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Métricas de pontualidade e volume</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Entregador</th>
                <th className="py-3 px-3">Veículo / Placa</th>
                <th className="py-3 px-3 text-right">Viagens Realizadas</th>
                <th className="py-3 px-3 text-right">Em Andamento</th>
                <th className="py-3 px-3 text-right">Tempo Médio</th>
                <th className="py-3 px-4 text-right">Avaliação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialCouriers.map((cour) => (
                <tr key={cour.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{cour.name}</div>
                    <span className="text-[11px] text-slate-400">{cour.phone}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <div>{cour.vehicle}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{cour.plate}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    {cour.completedToday} entregas
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-amber-700">
                    {cour.activeDeliveries > 0 ? `${cour.activeDeliveries} rota` : '-'}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 font-medium">
                    22 min
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {cour.rating || '4.9'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
