import React from 'react';
import { Printer, X, Calendar, MapPin, Users, Phone, CheckCircle2 } from 'lucide-react';
import { establishment } from '../../data/mockData';

export default function PrintReservationModal({
  reservation,
  isOpen,
  onClose
}) {
  if (!isOpen || !reservation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-elevated border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Comprovante de Reserva
              </h3>
              <p className="text-[11px] text-slate-500">
                Padrão térmico 80mm para recepção e maître
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket preview */}
        <div className="p-6 bg-slate-100/70 overflow-y-auto max-h-[460px] flex justify-center">
          <div
            id="thermal-receipt"
            className="w-[280px] bg-white p-5 rounded-lg shadow-sm border border-slate-200 font-mono text-xs text-slate-800 leading-tight space-y-3"
          >
            {/* Header */}
            <div className="text-center border-b border-dashed border-slate-300 pb-3">
              <div className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                {establishment.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {establishment.address}
              </div>
              <div className="text-[10px] text-slate-500">
                Fone: {establishment.phone}
              </div>
              <div className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 py-0.5 rounded border border-emerald-200">
                RESERVA CONFIRMADA • {reservation.code}
              </div>
            </div>

            {/* Reservation Details */}
            <div className="border-b border-dashed border-slate-300 pb-2 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Data:</span>
                <span className="font-bold text-slate-900">{reservation.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Horário:</span>
                <span className="font-bold text-slate-900">{reservation.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pessoas:</span>
                <span className="font-bold text-slate-900">{reservation.people} lugares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mesa:</span>
                <span className="font-bold text-emerald-800">{reservation.table}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Espaço:</span>
                <span className="font-semibold text-slate-800">{reservation.space}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-b border-dashed border-slate-300 pb-2 space-y-1 text-xs">
              <div>
                <span className="text-slate-500">Cliente: </span>
                <span className="font-bold text-slate-900">{reservation.client}</span>
              </div>
              <div>
                <span className="text-slate-500">Telefone: </span>
                <span>{reservation.phone}</span>
              </div>
              <div>
                <span className="text-slate-500">Tipo: </span>
                <span className="font-semibold">{reservation.type}</span>
              </div>
            </div>

            {/* Notes */}
            {reservation.notes && (
              <div className="border-b border-dashed border-slate-300 pb-2 text-[11px]">
                <span className="font-bold text-amber-800">Obs: </span>
                <span className="text-slate-700 font-sans italic">{reservation.notes}</span>
              </div>
            )}

            {/* Rule notice */}
            <div className="text-[10px] text-slate-500 space-y-0.5 pt-1">
              <div>* Tolerância máxima de atraso: 15 minutos.</div>
              <div>* Apresentar este comprovante na recepção.</div>
            </div>

            <div className="text-center pt-2 text-[9px] text-slate-400 border-t border-dashed border-slate-200">
              Gerado automaticamente pelo Chef Deni ERP
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir comprovante</span>
          </button>
        </div>
      </div>
    </div>
  );
}
