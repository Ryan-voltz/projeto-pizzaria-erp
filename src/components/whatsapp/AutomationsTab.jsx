import React, { useState } from 'react';
import { Zap, Power, Calendar, Clock, Users, MessageSquare, Send, Check } from 'lucide-react';
import { initialAutomations, initialWeeklyCampaign } from '../../data/mockData';

export default function AutomationsTab() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [weeklyCampaign, setWeeklyCampaign] = useState(initialWeeklyCampaign);
  const [saveNotice, setSaveNotice] = useState(false);

  const toggleAutomation = (id) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'Ativo' ? 'Inativo' : 'Ativo' } : a
      )
    );
  };

  const handleSaveWeekly = (e) => {
    e.preventDefault();
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* ========================================= */}
      {/* 1. SEÇÃO DE MENSAGEM SEMANAL PROGRAMADA   */}
      {/* ========================================= */}
      <div className="bg-white rounded-2xl border border-emerald-200/90 shadow-2xs p-6 bg-linear-to-br from-white to-emerald-50/20 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Campanha de Envio Semanal</h2>
              <p className="text-[11px] text-slate-500">
                Disparo automatizado de promoções e novidades para a base ativa de clientes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setWeeklyCampaign((prev) => ({
                  ...prev,
                  status: prev.status === 'Ativo' ? 'Pausado' : 'Ativo'
                }))
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                weeklyCampaign.status === 'Ativo'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                weeklyCampaign.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-400'
              }`} />
              {weeklyCampaign.status}
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveWeekly} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Dia da Semana */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Dia da Semana *
              </label>
              <select
                value={weeklyCampaign.dayOfWeek}
                onChange={(e) => setWeeklyCampaign({ ...weeklyCampaign, dayOfWeek: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold"
              >
                <option value="Quinta-feira">Quinta-feira (Tradicional de Pizzas)</option>
                <option value="Sexta-feira">Sexta-feira (Início de fim de semana)</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo (Família)</option>
                <option value="Terça-feira">Terça-feira (Terça da Margherita)</option>
              </select>
            </div>

            {/* Horário */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Horário do Disparo *
              </label>
              <input
                type="time"
                value={weeklyCampaign.time}
                onChange={(e) => setWeeklyCampaign({ ...weeklyCampaign, time: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold"
              />
            </div>

            {/* Público Alvo */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Público Alvo *
              </label>
              <select
                value={weeklyCampaign.audience}
                onChange={(e) => setWeeklyCampaign({ ...weeklyCampaign, audience: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              >
                <option value="Todos os clientes ativos (últimos 60 dias)">
                  Todos os clientes ativos (~418 contatos)
                </option>
                <option value="Apenas Clientes VIP">Apenas Clientes VIP (~54 contatos)</option>
                <option value="Clientes inativos > 30 dias (Reativação)">
                  Clientes inativos &gt; 30 dias (~112 contatos)
                </option>
              </select>
            </div>
          </div>

          {/* Mensagem */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Texto da Mensagem Semanal
            </label>
            <textarea
              rows={3}
              value={weeklyCampaign.message}
              onChange={(e) => setWeeklyCampaign({ ...weeklyCampaign, message: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">
              Estimativa de alcance: <strong>{weeklyCampaign.estimatedRecipients} clientes</strong>
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
            >
              {saveNotice ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              <span>{saveNotice ? 'Campanha Atualizada!' : 'Salvar Programação Semanal'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================= */}
      {/* 2. LISTA DE TODAS AS AUTOMAÇÕES           */}
      {/* ========================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Automações Operacionais de Fluxo ({automations.length})
            </h2>
            <p className="text-[11px] text-slate-500">
              Gatilhos automáticos disparados por eventos de pedidos e reservas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automations.map((auto) => {
            const isActive = auto.status === 'Ativo';

            return (
              <div
                key={auto.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">{auto.name}</h3>
                    <p className="text-[11px] text-slate-500">{auto.description}</p>
                  </div>

                  <button
                    onClick={() => toggleAutomation(auto.id)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Power className="w-2.5 h-2.5" />
                    <span>{auto.status}</span>
                  </button>
                </div>

                {/* Template Message Box */}
                <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] text-slate-700 font-mono leading-relaxed">
                  {auto.message}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Gatilho: <strong className="text-slate-600">{auto.trigger}</strong></span>
                  <span>Frequência: <strong className="text-slate-600">{auto.schedule}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
