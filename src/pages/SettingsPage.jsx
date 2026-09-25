import React, { useState } from 'react';
import { Settings, Building2, Users, Printer, Network } from 'lucide-react';
import CompanySettingsTab from '../components/settings/CompanySettingsTab';
import UsersPermissionsTab from '../components/settings/UsersPermissionsTab';
import PrintSettingsTab from '../components/settings/PrintSettingsTab';
import IntegrationsTab from '../components/settings/IntegrationsTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('empresa');

  const tabs = [
    { id: 'empresa', label: 'Empresa', icon: Building2 },
    { id: 'usuarios', label: 'Usuários & Permissões', icon: Users },
    { id: 'impressao', label: 'Impressão Térmica', icon: Printer },
    { id: 'integracoes', label: 'Integrações & Notificações', icon: Network }
  ];

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Configurações do Sistema</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerenciamento geral da empresa, permissões dos colaboradores, impressoras e integrações.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 overflow-x-auto bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Component */}
      {activeTab === 'empresa' && <CompanySettingsTab />}
      {activeTab === 'usuarios' && <UsersPermissionsTab />}
      {activeTab === 'impressao' && <PrintSettingsTab />}
      {activeTab === 'integracoes' && <IntegrationsTab />}
    </div>
  );
}
