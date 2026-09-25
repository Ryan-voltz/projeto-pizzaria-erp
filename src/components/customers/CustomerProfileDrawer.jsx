import React from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Crown,
  CalendarCheck,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';

export default function CustomerProfileDrawer({
  customer = null,
  onClose
}) {
  if (!customer) return null;

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const isVIP = customer.tier === 'VIP';
  const avgTicket = customer.ordersCount > 0 ? customer.totalSpent / customer.ordersCount : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                isVIP ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {customer.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold text-slate-900 truncate max-w-48">
                    {customer.name}
                  </h2>
                  {isVIP && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <Crown className="w-2.5 h-2.5" /> VIP
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500">Perfil do Cliente & CRM</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* 4 Summary Stat Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Total Gasto
                </span>
                <span className="text-base font-black text-slate-900 mt-0.5 block">
                  {formatCurrency(customer.totalSpent)}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium">Histórico acumulado</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Quantidade de Pedidos
                </span>
                <span className="text-base font-black text-slate-900 mt-0.5 block">
                  {customer.ordersCount} pedidos
                </span>
                <span className="text-[10px] text-slate-500">Média: {formatCurrency(avgTicket)}/ped</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Último Pedido
                </span>
                <span className="text-xs font-bold text-slate-800 mt-1 block truncate">
                  {customer.lastOrder}
                </span>
                <span className="text-[10px] text-slate-400">Atendimento registrado</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Última Interação
                </span>
                <span className="text-xs font-bold text-emerald-700 mt-1 block truncate">
                  Hoje, 20:54
                </span>
                <span className="text-[10px] text-slate-400">Via WhatsApp IA</span>
              </div>
            </div>

            {/* Informações Pessoais */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Dados de Cadastro</span>
              </h3>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{customer.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Cliente desde: {customer.registeredAt}</span>
                </div>
              </div>
            </div>

            {/* Notas & Preferências */}
            {customer.notes && (
              <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/60 space-y-1">
                <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Preferências Gastronômicas & Observações</span>
                </span>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {customer.notes}
                </p>
              </div>
            )}

            {/* Histórico de Pedidos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                  <span>Histórico de Pedidos ({customer.ordersHistory?.length || 0})</span>
                </h3>
              </div>

              <div className="space-y-2">
                {customer.ordersHistory && customer.ordersHistory.length > 0 ? (
                  customer.ordersHistory.map((ord, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-200/70 bg-white hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{ord.id}</span>
                        <span className="font-bold text-emerald-700">{formatCurrency(ord.value)}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] truncate">{ord.items}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-100">
                        <span>{ord.date}</span>
                        <span className="px-1.5 py-0.2 rounded-full font-medium bg-slate-100 text-slate-600">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-3">Nenhum pedido anterior registrado.</p>
                )}
              </div>
            </div>

            {/* Histórico de Reservas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Histórico de Reservas ({customer.reservationsHistory?.length || 0})</span>
                </h3>
              </div>

              <div className="space-y-2">
                {customer.reservationsHistory && customer.reservationsHistory.length > 0 ? (
                  customer.reservationsHistory.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-200/70 bg-white hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900">{res.table}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {res.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>{res.date} às {res.time}</span>
                        <span>{res.people} pessoas</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-3">Sem histórico de reservas em salão.</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Fechar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
