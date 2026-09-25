import React, { useState } from 'react';
import { Network, Key, Radio, Bell, Save, Check, ShieldAlert } from 'lucide-react';

export default function IntegrationsTab() {
  const [phoneNumberId, setPhoneNumberId] = useState('109842109832019');
  const [wabaId, setWabaId] = useState('waba_99182049102');
  const [webhookUrl, setWebhookUrl] = useState('https://projeto-pizzaria-erp.vercel.app/api/webhooks/whatsapp');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [criticalStockAlerts, setCriticalStockAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* WhatsApp Cloud API */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Integração WhatsApp Oficial (Meta Cloud API)</h2>
              <p className="text-[11px] text-slate-500">
                Parâmetros para sincronização direta com a API oficial de mensagens da Meta
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Estrutura Pronta para Produção
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Phone Number ID (Meta for Developers)
              </label>
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                WABA ID (WhatsApp Business Account ID)
              </label>
              <input
                type="text"
                value={wabaId}
                onChange={(e) => setWabaId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              URL do Webhook Receptor de Mensagens
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-mono text-slate-700"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 text-[11px] block">Token Permanente de Acesso</span>
              <span className="text-[10px] text-slate-400">Chave Bearer criptografada no ambiente do servidor</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              EAAG...v491 (Ativo)
            </span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saved ? 'Parâmetros Salvos!' : 'Salvar Credenciais da API'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notificações do Sistema */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-slate-600" />
            <span>Notificações & Alertas Sonoros</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            Configure disparos de avisos sonoros e alertas visuais no painel
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block text-xs">Alerta Sonoro para Novos Pedidos</span>
              <span className="text-[10px] text-slate-500">Toca bipe sonoro quando um pedido entra via balcão ou WhatsApp IA</span>
            </div>
            <input
              type="checkbox"
              checked={soundAlerts}
              onChange={(e) => setSoundAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block text-xs">Aviso de Estoque Crítico</span>
              <span className="text-[10px] text-slate-500">Exibe card amarelo no dashboard quando algum insumo atinge o mínimo</span>
            </div>
            <input
              type="checkbox"
              checked={criticalStockAlerts}
              onChange={(e) => setCriticalStockAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
