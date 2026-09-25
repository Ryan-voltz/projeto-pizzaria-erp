import React from 'react';
import {
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
  ArrowLeft
} from 'lucide-react';

const moduleMeta = {
  pedidos: {
    title: 'Gestão de Pedidos',
    desc: 'Visão Kanban e lista de pedidos do balcão, salão, delivery e WhatsApp IA.',
    icon: ShoppingBag,
    kpis: [
      { label: 'Abertos no momento', val: '12 pedidos' },
      { label: 'Tempo médio forno', val: '14 min' },
      { label: 'Em rota de entrega', val: '6 pedidos' }
    ]
  },
  reservas: {
    title: 'Gestão de Reservas & Espaços',
    desc: 'Controle de agendamentos de mesas e reserva de espaços para eventos e aniversários.',
    icon: CalendarCheck,
    kpis: [
      { label: 'Reservas hoje', val: '14 mesas' },
      { label: 'Total convidados', val: '52 pessoas' },
      { label: 'Eventos agendados', val: '2 festas' }
    ]
  },
  mesas: {
    title: 'Salão & Mesas',
    desc: 'Controle em tempo real de ocupação, abertura e fechamento de comandas de mesa.',
    icon: Armchair,
    kpis: [
      { label: 'Total de mesas', val: '12 mesas' },
      { label: 'Mesas ocupadas', val: '4 ativas' },
      { label: 'Taxa de ocupação', val: '58%' }
    ]
  },
  entregas: {
    title: 'Controle de Entregas & Rastreamento',
    desc: 'Acompanhamento da localização dos entregadores e despachos em tempo real.',
    icon: Truck,
    kpis: [
      { label: 'Entregadores ativos', val: '4 motociclistas' },
      { label: 'Entregas em curso', val: '6 entregas' },
      { label: 'Tempo médio rota', val: '24 min' }
    ]
  },
  entregadores: {
    title: 'Equipe de Entregadores',
    desc: 'Cadastro, escala, taxas de entrega e desempenho dos motoboys cadastrados.',
    icon: Bike,
    kpis: [
      { label: 'Disponíveis agora', val: '4 online' },
      { label: 'Em trânsito', val: '3 em rota' },
      { label: 'Entregas finalizadas hoje', val: '28 entregas' }
    ]
  },
  produtos: {
    title: 'Cardápio & Produtos',
    desc: 'Gestão de pizzas tradicionais, especiais, doces, bebidas, bordas e adicionais.',
    icon: UtensilsCrossed,
    kpis: [
      { label: 'Pizzas cadastradas', val: '36 sabores' },
      { label: 'Bebidas ativas', val: '18 itens' },
      { label: 'Mais vendida hoje', val: 'Margherita Especial' }
    ]
  },
  estoque: {
    title: 'Gestão de Estoque',
    desc: 'Acompanhamento de insumos críticos: farinha caputo, queijos, carnes, embutidos e embalagens.',
    icon: Package,
    kpis: [
      { label: 'Itens monitorados', val: '84 insumos' },
      { label: 'Abaixo do mínimo', val: '4 itens' },
      { label: 'Custo de estoque', val: 'R$ 18.420,00' }
    ]
  },
  compras: {
    title: 'Lista de Compras & Reposição',
    desc: 'Impressão e disparo de lista de pedidos para fornecedores de laticínios, hortifruti e secos.',
    icon: ClipboardList,
    kpis: [
      { label: 'Itens sugeridos para compra', val: '6 itens' },
      { label: 'Pedidos em aberto com fornecedor', val: '2 ordens' },
      { label: 'Previsão de entrega', val: 'Amanhã 09:00' }
    ]
  },
  clientes: {
    title: 'Base de Clientes & CRM',
    desc: 'Histórico de pedidos, preferências alimentares, endereços e ticket médio de cada cliente.',
    icon: Users,
    kpis: [
      { label: 'Clientes cadastrados', val: '1.420 clientes' },
      { label: 'Novos clientes no mês', val: '86' },
      { label: 'Recorrência mensal', val: '64%' }
    ]
  },
  whatsapp_ia: {
    title: 'WhatsApp IA Operacional',
    desc: 'Atendimento automatizado, registro de pedidos via linguagem natural e campanhas semanais.',
    icon: Bot,
    kpis: [
      { label: 'Atendimentos hoje', val: '62 conversas' },
      { label: 'Pedidos convertidos pela IA', val: '24 pedidos' },
      { label: 'Tempo de resposta da IA', val: '3.2s' }
    ]
  },
  financeiro: {
    title: 'Gestão Financeira & DRE',
    desc: 'Faturamento bruto, despesas com insumos, folha, comissões de entrega e lucro líquido.',
    icon: DollarSign,
    kpis: [
      { label: 'Faturamento bruto (mês)', val: 'R$ 84.920,00' },
      { label: 'Custo insumos (CMV)', val: '29.4%' },
      { label: 'Lucro líquido projetado', val: 'R$ 31.590,00' }
    ]
  },
  relatorios: {
    title: 'Relatórios Gerenciais',
    desc: 'Curva ABC de produtos, mapa de calor de vendas, horários de pico e taxa de entrega.',
    icon: BarChart3,
    kpis: [
      { label: 'Relatório diário fechamento', val: 'Gerar PDF' },
      { label: 'Desempenho por canal', val: 'WhatsApp 54%' },
      { label: 'Ticket médio geral', val: 'R$ 81,40' }
    ]
  },
  configuracoes: {
    title: 'Configurações do Sistema',
    desc: 'Parâmetros de taxas de entrega, impressoras térmicas ESC/POS, horários de funcionamento e permissões.',
    icon: Settings,
    kpis: [
      { label: 'Impressora padrão', val: 'Térmica 80mm (USB/Rede)' },
      { label: 'Turno padrão', val: 'Terça a Domingo (18h-23h45)' },
      { label: 'Backup em nuvem', val: 'Ativo (Sincronizado)' }
    ]
  }
};

export default function ModuleView({ moduleId, onBackToDashboard }) {
  const meta = moduleMeta[moduleId] || {
    title: 'Módulo em Operação',
    desc: 'Funcionalidade operacional ativa.',
    icon: Settings,
    kpis: []
  };

  const Icon = meta.icon;

  return (
    <div className="space-y-4">
      {/* Banner / Back button */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{meta.title}</h2>
            <p className="text-xs text-slate-500">{meta.desc}</p>
          </div>
        </div>

        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Dashboard</span>
        </button>
      </div>

      {/* Quick summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {meta.kpis.map((k, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">{k.label}</div>
            <div className="text-lg font-bold text-slate-900 mt-1">{k.val}</div>
          </div>
        ))}
      </div>

      {/* Operational Box */}
      <div className="p-8 bg-white rounded-xl border border-slate-200/80 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          Módulo {meta.title} Conectado ao Núcleo Operacional
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Dados sincronizados em tempo real com o banco de dados da forneria, integração WhatsApp IA e impressora térmica.
        </p>
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
        >
          Acessar Centro de Controle no Dashboard
        </button>
      </div>
    </div>
  );
}
