import React from 'react';
import {
  Bot,
  MessageSquare,
  Sparkles,
  UserCheck,
  ShoppingBag,
  CalendarCheck,
  Settings2,
  Zap,
  Radio
} from 'lucide-react';

export default function WhatsAppHeader({
  activeTab = 'inbox', // 'inbox' | 'ai_config' | 'automations'
  onSelectTab
}) {
  return (
    <div className="space-y-4 mb-6">
      {/* Title & Connection Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">WhatsApp IA & Atendimento</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              API Conectada • Meta Cloud
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Atendimento inteligente de cardápio, triagem de pedidos e confirmação automática de reservas.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => onSelectTab('inbox')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'inbox'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Inbox de Conversas</span>
          </button>

          <button
            onClick={() => onSelectTab('ai_config')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'ai_config'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Configuração da IA</span>
          </button>

          <button
            onClick={() => onSelectTab('automations')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'automations'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Automações</span>
          </button>
        </div>
      </div>

      {/* Dashboard KPI Row (6 Compact Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Status Conexão */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Conexão API</span>
            <Radio className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-sm font-bold text-emerald-700 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
          </div>
          <span className="text-[10px] text-slate-400">Ping 38ms</span>
        </div>

        {/* Conversas hoje */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Conversas Hoje</span>
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-base font-bold text-slate-900 mt-1">28</div>
          <span className="text-[10px] text-emerald-700">+12% vs ontem</span>
        </div>

        {/* Atendimentos Automáticos */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Pela IA (100%)</span>
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-base font-bold text-emerald-800 mt-1">24</div>
          <span className="text-[10px] text-slate-400">85.7% de resolução</span>
        </div>

        {/* Encaminhados */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Encaminhados</span>
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-base font-bold text-blue-800 mt-1">4</div>
          <span className="text-[10px] text-slate-400">Para equipe humana</span>
        </div>

        {/* Pedidos Gerados */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Pedidos Gerados</span>
            <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-base font-bold text-amber-800 mt-1">18</div>
          <span className="text-[10px] text-slate-400">R$ 1.692,00</span>
        </div>

        {/* Reservas Geradas */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Reservas</span>
            <CalendarCheck className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-base font-bold text-purple-800 mt-1">6</div>
          <span className="text-[10px] text-slate-400">Mesas confirmadas</span>
        </div>
      </div>
    </div>
  );
}
