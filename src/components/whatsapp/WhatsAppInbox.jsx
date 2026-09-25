import React, { useState } from 'react';
import {
  Search,
  Bot,
  User,
  Send,
  CheckCircle2,
  Clock,
  ShoppingBag,
  ExternalLink,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function WhatsAppInbox({
  conversations = [],
  onSendMessage,
  onAcceptDraftOrder
}) {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || 'conv-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find((c) => c.id === selectedId) || conversations[0];

  const filteredConversations = conversations.filter((c) => {
    return (
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden h-[640px] flex flex-col md:flex-row">
      {/* ========================================= */}
      {/* 1. COLUNA ESQUERDA: LISTA DE CONVERSAS    */}
      {/* ========================================= */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col shrink-0 bg-slate-50/40">
        {/* Search header */}
        <div className="p-3 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, telefone..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === selectedId;
            const isAI = conv.status === 'IA Respondendo';
            const isWaiting = conv.status === 'Aguardando Atendente';

            return (
              <div
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`p-3.5 transition-colors cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-emerald-50/70 border-l-3 border-emerald-700'
                    : 'hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div className="font-semibold text-slate-900 truncate">
                    {conv.clientName}
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {conv.time}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 font-mono mb-1.5">
                  {conv.phone}
                </div>

                <p className="text-slate-600 text-[11px] line-clamp-1 mb-2">
                  {conv.lastMessage}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isAI
                      ? 'bg-emerald-100 text-emerald-800'
                      : isWaiting
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isAI ? <Bot className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                    <span>{conv.status}</span>
                  </span>

                  {conv.hasDraftOrder && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                      <ShoppingBag className="w-2.5 h-2.5" /> Pedido rascunho
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. COLUNA CENTRAL: CHAT STREAM            */}
      {/* ========================================= */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Active chat header */}
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
              {activeConv?.clientName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs">
                {activeConv?.clientName}
              </div>
              <div className="text-[11px] text-slate-500">
                {activeConv?.phone} • {activeConv?.status}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-400">
              Intervenção humana habilitada
            </span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/20 text-xs">
          {activeConv?.messages.map((m) => {
            const isClient = m.sender === 'client';
            const isAI = m.sender === 'ai';

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isClient ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  {isAI ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                      <Bot className="w-3 h-3" /> Bella (IA)
                    </span>
                  ) : isClient ? (
                    <span className="text-[10px] font-semibold text-slate-600">
                      {activeConv.clientName}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-blue-700">
                      Atendente Humano (Você)
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>

                <div
                  className={`p-3 rounded-2xl max-w-sm sm:max-w-md shadow-2xs leading-relaxed ${
                    isClient
                      ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                      : isAI
                      ? 'bg-emerald-700 text-white rounded-tr-xs'
                      : 'bg-slate-900 text-white rounded-tr-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite uma mensagem para intervir ou responder..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>

      {/* ========================================= */}
      {/* 3. COLUNA DIREITA: DADOS DO CLIENTE & RASCUNHO */}
      {/* ========================================= */}
      <div className="w-full md:w-72 border-l border-slate-200 bg-slate-50/50 p-4 overflow-y-auto space-y-4 shrink-0 text-xs">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Cliente da Conversa
          </h3>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="font-bold text-slate-900 text-sm">{activeConv?.clientName}</div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{activeConv?.phone}</span>
            </div>
            <div className="flex items-start gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-[11px]">Pinheiros / Santa Cecília</span>
            </div>
          </div>
        </div>

        {/* Pedido Rascunho Detectado */}
        {activeConv?.hasDraftOrder && activeConv?.draftOrder && (
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Pedido Gerado pela IA</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900">
                Pendente
              </span>
            </div>

            <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-amber-200/70">
              <strong className="block text-slate-800">Itens:</strong>
              {activeConv.draftOrder.items}
            </div>

            <div className="flex items-center justify-between font-bold text-xs text-slate-900">
              <span>Total:</span>
              <span className="text-emerald-700 font-black">{formatCurrency(activeConv.draftOrder.total)}</span>
            </div>

            <button
              onClick={() => onAcceptDraftOrder(activeConv)}
              className="w-full py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirmar Pedido no ERP</span>
            </button>
          </div>
        )}

        {/* Sugestões Rápidas para o Atendente */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Respostas Rápidas
          </span>
          <button
            onClick={() => setInputText("Seu pedido já foi encaminhado para a cozinha!")}
            className="w-full text-left p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] text-slate-700 transition-colors"
          >
            "Seu pedido já está no forno..."
          </button>
          <button
            onClick={() => setInputText("Segue nossa chave Pix CNPJ: 48.291.034/0001-92")}
            className="w-full text-left p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] text-slate-700 transition-colors"
          >
            "Enviar chave Pix da forneria..."
          </button>
        </div>
      </div>
    </div>
  );
}
