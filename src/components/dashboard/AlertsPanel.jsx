import React from 'react';
import {
  Bell,
  AlertTriangle,
  Clock,
  Truck,
  ShoppingBag,
  Package,
  CalendarCheck,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

export default function AlertsPanel({
  alerts,
  onDismissAlert,
  onActionClick
}) {
  const getAlertIcon = (category) => {
    switch (category) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-700" />;
      case 'stock':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'delivery':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'reservation':
        return <CalendarCheck className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning':
        return 'border-amber-200/90 bg-amber-50/40 text-amber-900';
      case 'danger':
        return 'border-rose-200/90 bg-rose-50/40 text-rose-900';
      case 'success':
        return 'border-emerald-200/90 bg-emerald-50/40 text-emerald-950';
      default:
        return 'border-slate-200/90 bg-slate-50/60 text-slate-900';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Painel de Alertas
            </h2>
            <p className="text-[11px] text-slate-500">
              Notificações operacionais em tempo real
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-100 text-amber-800 rounded-full">
          {alerts.length} ativos
        </span>
      </div>

      {/* List of Alerts */}
      <div className="p-3 space-y-2.5 flex-1 overflow-y-auto max-h-[380px]">
        {alerts.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Nenhum alerta pendente no momento.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border transition-all text-xs ${getAlertStyle(alert.type)}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {getAlertIcon(alert.category)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 leading-snug">
                      {alert.title}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {alert.description}
                    </div>

                    {/* Action link */}
                    {alert.actionLabel && (
                      <button
                        onClick={() => onActionClick(alert)}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                      >
                        <span>{alert.actionLabel}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {alert.time}
                  </span>
                  <button
                    onClick={() => onDismissAlert(alert.id)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                    title="Dispensar alerta"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
