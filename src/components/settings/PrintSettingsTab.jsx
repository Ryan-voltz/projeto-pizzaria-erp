import React, { useState } from 'react';
import { Printer, Save, Check, Play, Sliders } from 'lucide-react';

export default function PrintSettingsTab() {
  const [printerModel, setPrinterModel] = useState('Epson TM-T20X (ESC/POS)');
  const [paperWidth, setPaperWidth] = useState('80mm');
  const [autoPrintOrder, setAutoPrintOrder] = useState(true);
  const [kitchenCopy, setKitchenCopy] = useState(true);
  const [customerCopy, setCustomerCopy] = useState(true);
  const [deliveryCopy, setDeliveryCopy] = useState(true);
  const [testPrinted, setTestPrinted] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleTestPrint = () => {
    setTestPrinted(true);
    setTimeout(() => setTestPrinted(false), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Printer className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Configuração de Impressão Térmica (ESC/POS)</h2>
            <p className="text-[11px] text-slate-500">
              Gerencie a impressora padrão de cupons, comandas de forno e vias de despacho
            </p>
          </div>
        </div>

        {saved && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 animate-in fade-in">
            <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Dispositivo / Modelo da Impressora
            </label>
            <select
              value={printerModel}
              onChange={(e) => setPrinterModel(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold text-slate-900"
            >
              <option value="Epson TM-T20X (ESC/POS)">Epson TM-T20X / TM-T88 (USB / Ethernet)</option>
              <option value="Bematech MP-4200 TH">Bematech MP-4200 TH</option>
              <option value="Elgin i9 / i7">Elgin i9 / i7 ESC/POS</option>
              <option value="Daruma DR800">Daruma DR800</option>
              <option value="Impressora Padrão do Sistema (PDF / Windows)">
                Impressora Padrão do Windows
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Largura da Bobina Térmica
            </label>
            <select
              value={paperWidth}
              onChange={(e) => setPaperWidth(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-semibold"
            >
              <option value="80mm">80 mm (Padrão de Forneria / 48 colunas)</option>
              <option value="58mm">58 mm (Bobina estreita / 32 colunas)</option>
            </select>
          </div>
        </div>

        {/* Vias de Impressão Automática */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Vias & Automação de Disparo
          </h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoPrintOrder}
                onChange={(e) => setAutoPrintOrder(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-semibold text-slate-800">
                Imprimir automaticamente ao confirmar novos pedidos
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200">
              <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kitchenCopy}
                  onChange={(e) => setKitchenCopy(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Via da Cozinha / Forno</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliveryCopy}
                  onChange={(e) => setDeliveryCopy(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Via do Entregador / Bag</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customerCopy}
                  onChange={(e) => setCustomerCopy(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Via do Cliente / Conta</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleTestPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            {testPrinted ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Play className="w-3.5 h-3.5" />}
            <span>{testPrinted ? 'Comprovante Enviado!' : 'Imprimir Página de Teste (80mm)'}</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Preferências de Impressão</span>
          </button>
        </div>
      </form>
    </div>
  );
}
