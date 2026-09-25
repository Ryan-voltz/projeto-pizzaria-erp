import React from 'react';
import {
  ShoppingBag,
  DollarSign,
  Calendar,
  Truck,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const iconMap = {
  ShoppingBag,
  DollarSign,
  Calendar,
  Truck,
  AlertTriangle,
  BarChart3
};

export default function StatCard({ item }) {
  const Icon = iconMap[item.icon] || ShoppingBag;

  // Determine styling based on card type
  const isWarning = item.warning;
  const isDanger = item.danger;

  return (
    <div className={`p-3.5 bg-white rounded-xl border transition-all ${
      isWarning
        ? 'border-amber-200/90 shadow-xs ring-1 ring-amber-400/20'
        : isDanger
        ? 'border-rose-200 shadow-xs ring-1 ring-rose-400/20'
        : 'border-slate-200/80 shadow-xs hover:border-slate-300'
    }`}>
      {/* Top Header of Card */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-medium text-slate-500 truncate">
          {item.label}
        </span>
        <div className={`p-1.5 rounded-lg shrink-0 ${
          isWarning
            ? 'bg-amber-50 text-amber-600'
            : isDanger
            ? 'bg-rose-50 text-rose-600'
            : 'bg-emerald-50 text-emerald-700'
        }`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xl font-bold tracking-tight text-slate-900">
          {item.value}
        </div>

        {/* Change Badge */}
        {item.change && (
          <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold shrink-0 ${
            isWarning
              ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
              : item.positive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {item.positive && !isWarning && <TrendingUp className="w-2.5 h-2.5" />}
            <span>{item.change}</span>
          </div>
        )}
      </div>

      {/* Micro context / Subtext */}
      {item.subtext && (
        <div className="mt-1 text-[11px] text-slate-400 truncate">
          {item.subtext}
        </div>
      )}
    </div>
  );
}
