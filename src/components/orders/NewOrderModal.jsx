import React, { useState } from 'react';
import { X, Plus, Trash2, ShoppingBag, User, MapPin, DollarSign, CreditCard } from 'lucide-react';
import { menuCatalog } from '../../data/mockData';

export default function NewOrderModal({ isOpen, onClose, onSaveOrder }) {
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Delivery'); // Delivery, Salão, Retirada
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pix');
  const [selectedItems, setSelectedItems] = useState([
    { id: 'p-1', name: 'Pizza Margherita Especial (G)', qty: 1, unitPrice: 72.00 }
  ]);
  const [deliveryFee, setDeliveryFee] = useState(8.00);

  if (!isOpen) return null;

  const handleAddItem = (productId) => {
    const prod = menuCatalog.find(p => p.id === productId);
    if (!prod) return;

    setSelectedItems(prev => {
      const existing = prev.find(item => item.id === prod.id);
      if (existing) {
        return prev.map(item => item.id === prod.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: prod.id, name: prod.name, qty: 1, unitPrice: prod.price }];
    });
  };

  const handleRemoveItem = (id) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQty = (id, delta) => {
    setSelectedItems(prev =>
      prev
        .map(item => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
        .filter(item => item.qty > 0)
    );
  };

  const subtotal = selectedItems.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);
  const currentDeliveryFee = type === 'Delivery' ? Number(deliveryFee) : 0;
  const total = subtotal + currentDeliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!client.trim()) {
      alert('Por favor, informe o nome do cliente.');
      return;
    }
    if (selectedItems.length === 0) {
      alert('Selecione pelo menos um item para o pedido.');
      return;
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const randomId = `#${Math.floor(1050 + Math.random() * 50)}`;

    const newOrder = {
      id: randomId,
      date: '25/09/2026',
      time: `${hours}:${minutes}`,
      createdAt: now.toISOString(),
      client,
      phone: phone || '(11) 99000-0000',
      type,
      channel: 'Balcão / Caixa',
      status: 'Novo',
      isUnread: true,
      paymentMethod,
      paymentStatus: paymentMethod === 'Dinheiro' ? 'Pendente' : 'Pago',
      subtotal,
      deliveryFee: currentDeliveryFee,
      discount: 0.00,
      total,
      formattedValue: `R$ ${total.toFixed(2).replace('.', ',')}`,
      address: type === 'Delivery' ? address : (type === 'Salão' ? 'Salão Principal' : 'Balcão da Pizzaria'),
      courier: null,
      items: selectedItems.map(i => ({
        name: i.name,
        qty: i.qty,
        unitPrice: i.unitPrice,
        price: `R$ ${(i.qty * i.unitPrice).toFixed(2).replace('.', ',')}`
      })),
      notes,
      timeline: [
        { status: 'Pedido recebido', time: `${hours}:${minutes}`, completed: true, details: 'Criado no caixa do ERP.' },
        { status: 'Pedido confirmado', time: null, completed: false, details: '' },
        { status: 'Em preparo', time: null, completed: false, details: '' },
        { status: 'Pronto', time: null, completed: false, details: '' },
        { status: 'Saiu para entrega', time: null, completed: false, details: '' },
        { status: 'Entregue', time: null, completed: false, details: '' }
      ]
    };

    onSaveOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Novo Pedido Operacional
              </h3>
              <p className="text-[11px] text-slate-500">
                Lançamento manual no caixa com disparo automático
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Customer & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Nome do Cliente *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: João Silva"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                placeholder="(11) 90000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Modalidade
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white cursor-pointer"
              >
                <option value="Delivery">Delivery</option>
                <option value="Salão">Salão (Mesa)</option>
                <option value="Retirada">Retirada no Balcão</option>
              </select>
            </div>
          </div>

          {/* Delivery Address */}
          {type === 'Delivery' && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Endereço de Entrega
                </label>
                <input
                  type="text"
                  placeholder="Rua, número, complemento, bairro"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Taxa de Entrega (R$)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.50"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white font-mono"
                />
              </div>
            </div>
          )}

          {/* Catalog Item Picker */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Adicionar do Cardápio
            </label>
            <div className="flex gap-2">
              <select
                id="catalog-select"
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddItem(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="" disabled>-- Selecione um produto para adicionar --</option>
                {menuCatalog.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} - R$ {prod.price.toFixed(2).replace('.', ',')} ({prod.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 text-[11px]">
              Itens Selecionados ({selectedItems.length})
            </div>
            <div className="divide-y divide-slate-100 max-h-40 overflow-y-auto">
              {selectedItems.map((item) => (
                <div key={item.id} className="p-2.5 flex items-center justify-between bg-white">
                  <div>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-400">
                      R$ {item.unitPrice.toFixed(2).replace('.', ',')} cada
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-semibold">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-slate-900 w-16 text-right">
                      R$ {(item.qty * item.unitPrice).toFixed(2).replace('.', ',')}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Observações do Pedido (cozinha/forno)
            </label>
            <input
              type="text"
              placeholder="Ex: sem cebola, ponto da massa bem assada, troco para 100..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          {/* Payment & Totals */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Forma de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer font-medium"
              >
                <option value="Pix">Pix (Imediato)</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Dinheiro">Dinheiro (com troco)</option>
              </select>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-slate-500">
                Subtotal: R$ {subtotal.toFixed(2).replace('.', ',')} | Taxa: R$ {currentDeliveryFee.toFixed(2).replace('.', ',')}
              </div>
              <div className="text-base font-bold text-emerald-800">
                Total: R$ {total.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
            >
              Salvar e Gerar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
