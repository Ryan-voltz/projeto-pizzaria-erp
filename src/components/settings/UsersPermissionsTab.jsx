import React, { useState } from 'react';
import { Users, Shield, Plus, Edit2, Trash2, CheckCircle2, Lock, X } from 'lucide-react';
import { initialSystemUsers } from '../../data/mockData';

const ALL_ROLES_PERMISSIONS = {
  Administrador: {
    description: 'Acesso irrestrito a todos os módulos, configurações, DRE e cadastros.',
    modules: ['Dashboard', 'Pedidos', 'Reservas', 'Mesas', 'Entregas', 'Entregadores', 'Produtos', 'Estoque', 'Lista de compras', 'Clientes', 'WhatsApp IA', 'Financeiro', 'Relatórios', 'Configurações']
  },
  Gerente: {
    description: 'Acesso à gestão operacional, catálogo, compras, DRE e relatórios.',
    modules: ['Dashboard', 'Pedidos', 'Reservas', 'Mesas', 'Produtos', 'Estoque', 'Lista de compras', 'Relatórios']
  },
  Atendente: {
    description: 'Acesso ao atendimento presencial, delivery, reservas e CRM.',
    modules: ['Dashboard', 'Pedidos', 'Reservas', 'Mesas', 'Clientes', 'WhatsApp IA']
  },
  Estoque: {
    description: 'Acesso restrito ao almoxarifado, catálogo de produtos e compras.',
    modules: ['Produtos', 'Estoque', 'Lista de compras']
  },
  Entregador: {
    description: 'Acesso restrito à fila de entregas e mapa de despacho.',
    modules: ['Entregas']
  }
};

export default function UsersPermissionsTab() {
  const [users, setUsers] = useState(initialSystemUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Atendente');
  const [status, setStatus] = useState('Ativo');

  const handleOpenNew = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('Atendente');
    setStatus('Ativo');
    setIsModalOpen(true);
  };

  const handleEdit = (u) => {
    setEditingUser(u);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setStatus(u.status);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: name.trim(), email: email.trim(), role, status }
            : u
        )
      );
    } else {
      const newUser = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role,
        status,
        lastLogin: 'Nunca'
      };
      setUsers((prev) => [newUser, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja revogar o acesso deste usuário?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Top row */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Usuários do Sistema & Perfis de Acesso</h2>
              <p className="text-[11px] text-slate-500">
                Controle quais módulos cada colaborador pode visualizar ou operar no ERP
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Novo Colaborador</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-2.5 px-4">Nome do Colaborador</th>
                <th className="py-2.5 px-3">E-mail de Acesso</th>
                <th className="py-2.5 px-3">Cargo / Perfil</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Último Acesso</th>
                <th className="py-2.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {u.name}
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                    {u.email}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'Administrador' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                      u.role === 'Gerente' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      u.role === 'Atendente' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      u.role === 'Estoque' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {u.lastLogin || 'Hoje'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(u)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md"
                        title="Editar usuário"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {u.role !== 'Administrador' && (
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                          title="Excluir usuário"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matriz de Permissões por Cargo */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Matriz de Controle de Permissões por Cargo
          </h3>
          <p className="text-[11px] text-slate-500">
            Define a governança de acesso aos 14 módulos do ERP Chef Deni
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(ALL_ROLES_PERMISSIONS).map(([roleName, details]) => (
            <div key={roleName} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{roleName}</span>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {details.modules.length} módulos
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{details.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {details.modules.map((mod, idx) => (
                  <span key={idx} className="px-1.5 py-0.2 rounded-md bg-white border border-slate-200 text-[10px] text-slate-700 font-medium">
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingUser ? 'Editar Usuário' : 'Novo Colaborador'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">E-mail Profissional *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@chefdeni.com.br"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Cargo / Perfil</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold"
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Atendente">Atendente</option>
                    <option value="Estoque">Estoque</option>
                    <option value="Entregador">Entregador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                >
                  Salvar Colaborador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
