import React, { useState } from 'react';
import { Store, Save, Check, MapPin, Phone, Building2, Clock, DollarSign } from 'lucide-react';
import { establishment } from '../../data/mockData';

export default function CompanySettingsTab() {
  const [formData, setFormData] = useState({
    name: establishment.name,
    tagline: establishment.tagline,
    cnpj: establishment.cnpj,
    phone: establishment.phone,
    address: establishment.address,
    currentShift: establishment.currentShift,
    defaultDeliveryFee: '8.50',
    freeDeliveryThreshold: '120.00'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Dados da Empresa & Estabelecimento</h2>
            <p className="text-[11px] text-slate-500">
              Informações cadastrais impressas nos cupons fiscais, comandas e cabeçalhos
            </p>
          </div>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 animate-in fade-in">
            <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Razão Social / Nome Fantasia *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Slogan / Subtítulo
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              CNPJ *
            </label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-mono text-slate-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Telefone Principal / WhatsApp Comercial *
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 text-slate-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Endereço Completo *
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 text-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Turno e Horário de Funcionamento
            </label>
            <input
              type="text"
              value={formData.currentShift}
              onChange={(e) => setFormData({ ...formData, currentShift: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Taxa de Entrega Padrão (R$)
            </label>
            <input
              type="number"
              step="0.50"
              value={formData.defaultDeliveryFee}
              onChange={(e) => setFormData({ ...formData, defaultDeliveryFee: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Frete Grátis a Partir de (R$)
            </label>
            <input
              type="number"
              step="5.00"
              value={formData.freeDeliveryThreshold}
              onChange={(e) => setFormData({ ...formData, freeDeliveryThreshold: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-bold text-slate-900"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações da Empresa</span>
          </button>
        </div>
      </form>
    </div>
  );
}
