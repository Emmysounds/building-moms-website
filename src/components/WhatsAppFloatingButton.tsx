import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

interface WhatsAppFloatingButtonProps {
  whatsappNumber: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ whatsappNumber }) => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const whatsappUrl = createGeneralWhatsAppLink(whatsappNumber, 'Hello Building Moms Nigeria, I would like to enquire about building materials and prices.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip callout */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-lg shadow-xl border border-slate-800 animate-fade-in max-w-xs">
          <span>Need quick building material pricing or advice?</span>
          <button 
            onClick={() => setTooltipDismissed(true)} 
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Building Moms Nigeria on WhatsApp"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-emerald-900/30 transition-all duration-200"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-sm font-semibold whitespace-nowrap">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
