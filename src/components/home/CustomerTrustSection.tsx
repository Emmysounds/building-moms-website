import React from 'react';
import { Quote, MessageSquare, PhoneCall, CheckCircle } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../../utils/whatsapp';

interface CustomerTrustSectionProps {
  companyWhatsApp: string;
  companyPhone: string;
}

export const CustomerTrustSection: React.FC<CustomerTrustSectionProps> = ({
  companyWhatsApp,
  companyPhone
}) => {
  const whatsappUrl = createGeneralWhatsAppLink(
    companyWhatsApp,
    'Hello Building Moms Nigeria, I would like to speak with a sales representative regarding building materials.'
  );

  const testimonials = [
    {
      quote: "Sourcing verified 0.55mm aluminium roofing sheets in Nigeria can be stressful because many suppliers substitute gauges. Building Moms Nigeria delivered exact micrometer thickness with matching accessories to our site in Lekki on schedule.",
      author: "Engr. Babatunde Adeleke",
      role: "Lead Structural Engineer",
      location: "Lekki Phase 1, Lagos"
    },
    {
      quote: "Their team took time to calculate the exact pieces of stone-coated bond tiles from our architectural floor plan. We avoided over-ordering and the delivery was handled directly to our site in Ibadan with zero breakages.",
      author: "Arc. Toyin Oshodi",
      role: "Principal Architect, Design Studio",
      location: "Bodija, Ibadan"
    },
    {
      quote: "Supplied 20 tonnes of certified 16mm and 12mm high-yield reinforcement bars for our commercial warehouse foundation. Proper mill certificates and reliable offloading support.",
      author: "Mallam Sanusi Danbatta",
      role: "Civil Contractor",
      location: "Abuja FCT"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">
            Client & Contractor Confidence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Builders Across Nigeria
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Real feedback from property developers, certified engineers, and individual project owners who rely on our supply network.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-xl p-7 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-500/40 mb-4" />
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <div className="font-bold text-slate-900 text-sm">{item.author}</div>
                <div className="text-xs text-slate-500">{item.role}</div>
                <div className="text-xs font-medium text-amber-700 mt-1">{item.location}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Prominent WhatsApp & Phone Action Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span>Instant Response on WhatsApp</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Have Questions or Need an Urgent Material Price?
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect directly with our sales desk on WhatsApp. Send us your material list, architectural drawing, or request current depot pricing.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <a
                href={`tel:${companyPhone}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call Us: {companyPhone}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
