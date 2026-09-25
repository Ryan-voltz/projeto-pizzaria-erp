import React, { useState } from 'react';
import { TrendingUp, BarChart2, Calendar } from 'lucide-react';
import { salesTimeline } from '../../data/mockData';

export default function SalesMiniChart() {
  const [activeTab, setActiveTab] = useState('revenue'); // 'revenue' or 'orders'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxRevenue = Math.max(...salesTimeline.map(d => d.revenue));
  const maxOrders = Math.max(...salesTimeline.map(d => d.orders));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Ritmo Operacional (Hoje)
          </h2>
          <p className="text-[11px] text-slate-500">
            Volume por faixa de horário do turno
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-colors ${
              activeTab === 'revenue'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Faturamento (R$)
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-colors ${
              activeTab === 'orders'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pedidos (Qtd)
          </button>
        </div>
      </div>

      {/* Discrete Chart Bars Area */}
      <div className="pt-2">
        <div className="h-32 flex items-end gap-3 justify-between px-2">
          {salesTimeline.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const currentVal = activeTab === 'revenue' ? item.revenue : item.orders;
            const maxVal = activeTab === 'revenue' ? maxRevenue : maxOrders;
            const heightPct = Math.round((currentVal / maxVal) * 85);

            return (
              <div
                key={item.hour}
                className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Micro Tooltip */}
                <div
                  className={`text-[10px] font-mono font-bold transition-all px-1.5 py-0.5 rounded ${
                    isHovered
                      ? 'bg-slate-900 text-white -translate-y-1'
                      : 'text-slate-500'
                  }`}
                >
                  {activeTab === 'revenue' ? `R$ ${item.revenue}` : `${item.orders} un`}
                </div>

                {/* Bar */}
                <div className="w-full max-w-[32px] bg-slate-100 rounded-t-md h-24 flex items-end overflow-hidden">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t transition-all duration-300 ${
                      isHovered
                        ? 'bg-emerald-600'
                        : 'bg-emerald-700/80 group-hover:bg-emerald-600'
                    }`}
                  />
                </div>

                {/* X Axis Label */}
                <span className={`text-[11px] font-medium transition-colors ${
                  isHovered ? 'text-slate-900 font-bold' : 'text-slate-400'
                }`}>
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom quick stats */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Pico operacional às 20h (18 pedidos)</span>
        </div>
        <div className="font-semibold text-slate-700">
          Total: {activeTab === 'revenue' ? 'R$ 3.970,00' : '48 pedidos'}
        </div>
      </div>
    </div>
  );
}
