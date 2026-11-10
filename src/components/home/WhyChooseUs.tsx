import React from 'react';
import { ShieldCheck, TrendingDown, Clock, Users, FileText, Building2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Quality Building Materials',
      description: 'We source genuine, durable materials with verified gauges and thickness to ensure structural safety for your construction.'
    },
    {
      icon: TrendingDown,
      title: 'Competitive Market Pricing',
      description: 'Direct relationships with trusted manufacturers and steel mills allow us to offer transparent rates and volume pricing discounts.'
    },
    {
      icon: Clock,
      title: 'Reliable Supply & Delivery',
      description: 'Dependable logistics coordination to deliver materials to your construction site on schedule, minimizing work downtime.'
    },
    {
      icon: Users,
      title: 'Professional Customer Service',
      description: 'Our knowledgeable team understands construction specifications and provides attentive advisory support from planning to delivery.'
    },
    {
      icon: FileText,
      title: 'Convenient Quotation Requests',
      description: 'Quick online quotation forms and WhatsApp channels that make it fast and straightforward to get accurate estimates for your project.'
    },
    {
      icon: Building2,
      title: 'Support for Residential & Commercial',
      description: 'Whether you are roofing a single private bungalow or procuring tonnes of structural steel for an estate, we cater to your scale.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">
            Built on Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Why Contractors & Homeowners Choose BuildingMoms Nigeria
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Building in Nigeria requires trusted partners who deliver exactly what was specified. We prioritize transparency, authentic materials, and dependable customer service.
          </p>
        </div>

        {/* 6-box clean grid with zero-pill discipline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-5 border border-amber-100">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
