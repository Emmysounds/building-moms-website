import React from 'react';
import { ArrowRight, Calculator, Check, FileCheck, Layers } from 'lucide-react';

interface RoofingSolutionsSectionProps {
  onOpenRoofingQuote: () => void;
}

export const RoofingSolutionsSection: React.FC<RoofingSolutionsSectionProps> = ({
  onOpenRoofingQuote
}) => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Message */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Specialized Roofing Services
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Planning to Roof Your House? Let Us Help You Get the Right Materials.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Whether you are building a new home or replacing an existing roof, BuildingMoms Nigeria can help you identify the roofing materials required for your project and request a quotation.
            </p>

            {/* Checklist of what's covered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Long-Span & Step-Tile Aluminium</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Stone-Coated Gerard & Roman Tiles</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Custom Ridge Caps, Valleys & Flashing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Architectural Drawing Review</span>
              </div>
            </div>

            {/* Primary Orange CTA Button */}
            <div className="pt-4">
              <button
                onClick={onOpenRoofingQuote}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-base transition-all shadow-xl shadow-amber-950/50 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Calculator className="w-5 h-5" />
                <span>GET A QUOTE FOR MY ROOF</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-2xl relative">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Roofing Estimate Process</h3>
                  <p className="text-xs text-slate-400">Expert review before final purchase</p>
                </div>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-white block">Submit Building Specs</span>
                    <span className="text-xs text-slate-400">Dimensions, building type (bungalow/duplex), or upload your roofing drawing.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-white block">Select Sheet & Profile</span>
                    <span className="text-xs text-slate-400">Choose between stone-coated, step-tile, or long-span aluminium.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-white block">Technical Review & Quotation</span>
                    <span className="text-xs text-slate-400">Our quantity surveyors prepare a verified material schedule and delivery quote.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80 text-center">
                <button
                  onClick={onOpenRoofingQuote}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Launch 5-Step Roofing Form Now</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
