import React from 'react';
import { Search, FileSpreadsheet, PhoneCall, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartQuote: () => void;
  onBrowseCatalogue: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onStartQuote,
  onBrowseCatalogue
}) => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Browse Products',
      description: 'Explore the building materials you need from our comprehensive catalog of roofing sheets, structural steel, cement, and accessories.'
    },
    {
      number: '02',
      icon: FileSpreadsheet,
      title: 'Request a Quote',
      description: 'Tell us what you need and submit your enquiry or upload your architectural drawing through our simple quotation portal.'
    },
    {
      number: '03',
      icon: PhoneCall,
      title: 'Get Assistance & Supply',
      description: 'Our experienced sales and technical team contacts you with accurate pricing, material schedules, and coordinated site delivery.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">
            Straightforward Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Sourcing Works with Building Moms Nigeria
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A seamless three-step pathway from requirement to delivery at your construction site.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 tracking-tight font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <span className="text-xs font-semibold text-amber-700">Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartQuote}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            Start Your Quotation Now
          </button>
          <button
            onClick={onBrowseCatalogue}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            Browse Building Supplies
          </button>
        </div>

      </div>
    </section>
  );
};
