import React from 'react';
import { Eye, Crown, Phone, CalendarCheck, ShoppingBag, ExternalLink } from 'lucide-react';

export default function CustomersTable({
  customers = [],
  onSelectCustomer
}) {
  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center text-slate-500 shadow-2xs">
        <p className="text-xs">Nenhum cliente encontrado com os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Nome do Cliente</th>
              <th className="py-3 px-3">Telefone</th>
              <th className="py-3 px-3 text-center">Pedidos</th>
              <th className="py-3 px-3 text-right">Total Gasto</th>
              <th className="py-3 px-3">Último Pedido</th>
              <th className="py-3 px-3">Última Reserva</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {customers.map((c) => {
              const initials = c.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('');

              const isVIP = c.tier === 'VIP';

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCustomer(c)}
                  className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                >
                  {/* Nome */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                        isVIP
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                            {c.name}
                          </span>
                          {isVIP && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <Crown className="w-2.5 h-2.5" /> VIP
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 truncate block">
                          {c.email || c.address}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Telefone */}
                  <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                    {c.phone}
                  </td>

                  {/* Pedidos */}
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-800 border border-slate-200/60 text-[11px]">
                      {c.ordersCount}
                    </span>
                  </td>

                  {/* Total Gasto */}
                  <td className="py-3 px-3 text-right">
                    <span className="font-bold text-slate-900">
                      {formatCurrency(c.totalSpent)}
                    </span>
                  </td>

                  {/* Último Pedido */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">{c.lastOrder}</div>
                    <span className="text-[10px] text-slate-400">Delivery / Salão</span>
                  </td>

                  {/* Última Reserva */}
                  <td className="py-3 px-3">
                    {c.lastReservation !== '-' ? (
                      <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                        <CalendarCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-xs">{c.lastReservation}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Nenhuma</span>
                    )}
                  </td>

                  {/* Ações */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCustomer(c);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Perfil</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
