import React from 'react';
import { ArrowRight, Calculator, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onGetRoofingQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onGetRoofingQuote
}) => {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Image Container with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_roofing_construction_1793631189514.jpg"
          alt="Modern residential building with premium stone-coated metal roofing in Nigeria"
          className="w-full h-full object-cover object-center brightness-75 scale-105 transform motion-safe:transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="max-w-3xl space-y-6">
          
          {/* Subtle natural category eyebrow */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <span>Direct Sourcing</span>
            <span aria-hidden="true">·</span>
            <span>Residential & Commercial Supply</span>
            <span aria-hidden="true">·</span>
            <span>All 36 States & FCT</span>
          </div>

          {/* Primary Headline with balance wrapping */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
            Quality Building Materials for Every Construction Project.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            From roofing sheets, iron rods, woods, cement, blocks, and essential construction materials, BuildingMoms Nigeria helps you source the materials you need to build with confidence.
          </p>

          {/* Prominent Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onExploreProducts}
              className="px-7 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>EXPLORE OUR PRODUCTS</span>
              <ArrowRight className="w-4 h-4 text-slate-900 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onGetRoofingQuote}
              className="px-7 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-sm transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>GET A ROOFING QUOTE</span>
            </button>
          </div>

          {/* Key Trust Signals */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Tested & Certified Gauges</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Site Delivery & Offloading</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Transparent Price Quotations</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
