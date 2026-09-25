import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  Printer,
  ChevronRight,
  ShieldCheck,
  Volume2,
  VolumeX,
  Sparkles,
  Command
} from 'lucide-react';
import { currentUser, establishment } from '../../data/mockData';

export default function Header({
  pageTitle = 'Dashboard Operacional',
  breadcrumbs = ['Início', 'Dashboard'],
  onToggleMobileMenu,
  onOpenQuickPrint,
  alertCount = 4,
  onOpenAlerts
}) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-slate-200 shadow-xs">
      {/* Left: Mobile hamburger & Titles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                <span className={idx === breadcrumbs.length - 1 ? 'text-slate-600' : 'hover:text-slate-600'}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>

          <h1 className="text-base font-bold text-slate-900 leading-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por pedido #, cliente, mesa ou insumo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-14 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-slate-400 bg-white border border-slate-200 rounded font-mono shadow-2xs">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Quick Print docket button */}
        <button
          onClick={onOpenQuickPrint}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/60"
          title="Impressão térmica de teste"
        >
          <Printer className="w-3.5 h-3.5 text-slate-600" />
          <span>Imprimir comanda</span>
        </button>

        {/* Audio Toggle for new order sound */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg transition-colors border ${
            soundEnabled
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
              : 'text-slate-400 bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
          title={soundEnabled ? 'Alertas sonoros ativados' : 'Alertas sonoros desativados'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Ver alertas operacionais"
        >
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
          )}
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User badge */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold ring-2 ring-emerald-500/20">
            {currentUser.initials}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {currentUser.name}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              Em serviço
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
