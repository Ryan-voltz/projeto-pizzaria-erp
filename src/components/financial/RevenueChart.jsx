import React, { useState } from 'react';
import { TrendingUp, BarChart2, DollarSign } from 'lucide-react';

export default function RevenueChart({ timeline = [], title = 'Evolução do Faturamento' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!timeline || timeline.length === 0) return null;

  const maxVal = Math.max(...timeline.map((d) => d.revenue), 100);

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    });
  };

  const chartHeight = 160;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{title}</h3>
            <span className="text-[11px] text-slate-500">Distribuição temporal das vendas confirmadas</span>
          </div>
        </div>

        {hoveredIndex !== null && (
          <div className="text-right">
            <span className="text-xs font-black text-emerald-700">
              {formatCurrency(timeline[hoveredIndex].revenue)}
            </span>
            <span className="text-[10px] text-slate-400 block">
              {timeline[hoveredIndex].orders} pedidos em {timeline[hoveredIndex].label}
            </span>
          </div>
        )}
      </div>

      {/* Chart container */}
      <div className="relative pt-6">
        <div className="flex items-end justify-between gap-2 h-40 border-b border-slate-200 pb-2">
          {timeline.map((item, idx) => {
            const heightPercent = Math.max(8, Math.round((item.revenue / maxVal) * 100));
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Floating tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-1 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-10 animate-in fade-in zoom-in-95 duration-150">
                    <span className="font-bold">{formatCurrency(item.revenue)}</span>
                    <span className="text-slate-300 ml-1">({item.orders} ped.)</span>
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full max-w-12 rounded-t-md transition-all duration-200 ${
                    isHovered
                      ? 'bg-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-emerald-700/80 hover:bg-emerald-600'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* X Axis Label */}
                <span className={`text-[11px] mt-2 transition-colors truncate max-w-full ${
                  isHovered ? 'font-bold text-emerald-800' : 'text-slate-500'
                }`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-3 text-[11px] text-slate-400">
          <span>Menor: {formatCurrency(Math.min(...timeline.map((d) => d.revenue)))}</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-700" /> Faturamento confirmado
          </span>
          <span>Pico: {formatCurrency(maxVal)}</span>
        </div>
      </div>
    </div>
  );
}
