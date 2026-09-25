import React, { useState } from 'react';
import { Bot, Save, Check, Sparkles, Sliders, ShieldAlert, Store, Clock, MapPin } from 'lucide-react';
import { initialAIConfig, establishment } from '../../data/mockData';

export default function AIConfigTab() {
  const [config, setConfig] = useState(initialAIConfig);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Parâmetros & Diretrizes da IA</h2>
            <p className="text-xs text-slate-500">
              Personalize a identidade da atendente virtual, regras de negócio e limites operacionais
            </p>
          </div>
        </div>

        {savedNotice && (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 animate-in fade-in">
            <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Identidade da IA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nome da Assistente IA
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tom de Atendimento
            </label>
            <select
              value={config.tone}
              onChange={(e) => setConfig({ ...config, tone: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            >
              <option value="Amigável, acolhedor e ágil (estilo trattoria italiana moderna)">
                Amigável & Acolhedor (Trattoria Napolitana)
              </option>
              <option value="Formal, elegante e direto ao ponto">
                Formal & Executivo (Restaurante Fino)
              </option>
              <option value="Jovem, dinâmico e focado em delivery rápido">
                Jovem & Ágil (Pizzaria Delivery Express)
              </option>
            </select>
          </div>
        </div>

        {/* Informações do Estabelecimento e Cardápio */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-slate-500" />
            <span>Informações Sincronizadas do Estabelecimento</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Nome da Forneria
              </label>
              <input
                type="text"
                disabled
                value={establishment.name}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Horário de Atendimento
              </label>
              <input
                type="text"
                value={config.hours}
                onChange={(e) => setConfig({ ...config, hours: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Endereço Físico
              </label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => setConfig({ ...config, address: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Raio Máximo de Entrega (km)
              </label>
              <input
                type="number"
                value={config.maxDeliveryRadiusKm}
                onChange={(e) => setConfig({ ...config, maxDeliveryRadiusKm: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Prompt de Instruções / System Prompt */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Instruções Centrais da IA (System Prompt)</span>
            </label>
            <span className="text-[11px] text-slate-400">Instrui a IA em todas as conversas</span>
          </div>

          <textarea
            rows={6}
            value={config.systemPrompt}
            onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-mono text-[11px] leading-relaxed resize-y"
          />
        </div>

        {/* Regras Operacionais Ativas */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            Regras de Atendimento Habilitadas
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {config.activeRules.map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Diretrizes da IA</span>
          </button>
        </div>
      </form>
    </div>
  );
}
