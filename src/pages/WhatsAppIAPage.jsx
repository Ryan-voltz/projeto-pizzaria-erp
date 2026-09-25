import React, { useState } from 'react';
import WhatsAppHeader from '../components/whatsapp/WhatsAppHeader';
import WhatsAppInbox from '../components/whatsapp/WhatsAppInbox';
import AIConfigTab from '../components/whatsapp/AIConfigTab';
import AutomationsTab from '../components/whatsapp/AutomationsTab';
import { initialConversations } from '../data/mockData';

export default function WhatsAppIAPage() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [conversations, setConversations] = useState(initialConversations);

  const handleSendMessage = (convId, text) => {
    const nowTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            lastMessage: text,
            time: nowTime,
            status: 'IA Respondendo',
            messages: [
              ...c.messages,
              { id: Date.now(), sender: 'agent', text, time: nowTime }
            ]
          };
        }
        return c;
      })
    );
  };

  const handleAcceptDraftOrder = (conv) => {
    alert(`Pedido rascunho de ${conv.clientName} no valor de R$ ${conv.draftOrder.total.toFixed(2)} foi lançado no ERP e enviado para o forno!`);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conv.id ? { ...c, hasDraftOrder: false } : c
      )
    );
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Dashboard */}
      <WhatsAppHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Dynamic Tab Content */}
      {activeTab === 'inbox' && (
        <WhatsAppInbox
          conversations={conversations}
          onSendMessage={handleSendMessage}
          onAcceptDraftOrder={handleAcceptDraftOrder}
        />
      )}

      {activeTab === 'ai_config' && <AIConfigTab />}

      {activeTab === 'automations' && <AutomationsTab />}
    </div>
  );
}
