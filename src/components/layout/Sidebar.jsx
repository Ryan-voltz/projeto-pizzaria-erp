import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  CalendarCheck,
  Armchair,
  Truck,
  Bike,
  UtensilsCrossed,
  Package,
  ClipboardList,
  Users,
  Bot,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Pizza,
  CheckCircle2,
  X
} from 'lucide-react';
import { establishment, currentUser } from '../../data/mockData';

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag, badge: '5' },
  { id: 'reservas', label: 'Reservas', icon: CalendarCheck, badge: '14' },
  { id: 'mesas', label: 'Mesas', icon: Armchair },
  { id: 'entregas', label: 'Entregas', icon: Truck, badge: '6' },
  { id: 'entregadores', label: 'Entregadores', icon: Bike },
  { id: 'produtos', label: 'Produtos', icon: UtensilsCrossed },
  { id: 'estoque', label: 'Estoque', icon: Package, badge: '4', badgeType: 'warning' },
  { id: 'compras', label: 'Lista de compras', icon: ClipboardList },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'whatsapp_ia', label: 'WhatsApp IA', icon: Bot, isSpecial: true },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  { id: 'configuracoes', label: 'Configurações', icon: Settings }
];

export default function Sidebar({
  activeNav = 'dashboard',
  onSelectNav,
  mobileOpen = false,
  onCloseMobile
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Logo / Establishment */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-700 text-white shadow-xs shrink-0">
              <Pizza className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold tracking-tight text-slate-900 truncate">
                {establishment.name}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-medium text-emerald-700">Aberta • Noite</span>
              </div>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg lg:hidden"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
          <div className="px-3 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu Operacional
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onSelectNav) onSelectNav(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {item.isSpecial && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-800 rounded">
                      IA
                    </span>
                  )}
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                        item.badgeType === 'warning'
                          ? 'bg-amber-100 text-amber-800 font-semibold'
                          : isActive
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60">
          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-white text-xs font-semibold shrink-0">
                {currentUser.initials}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-900 truncate">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {currentUser.role}
                </div>
              </div>
            </div>

            <button
              title="Sair do sistema"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              onClick={() => alert("Sessão finalizada com segurança.")}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
