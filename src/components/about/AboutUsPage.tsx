import React from 'react';
import { Target, Compass, HeartHandshake, CheckCircle2, ShieldCheck, Truck, Warehouse, ArrowRight } from 'lucide-react';
import { BusinessSettings } from '../../types';

interface AboutUsPageProps {
  settings: BusinessSettings;
  onGetQuote: () => void;
  onExploreProducts: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  settings,
  onGetQuote,
  onExploreProducts
}) => {
  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-slate-900 rounded-3xl text-white p-8 sm:p-14 mb-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              About Building Moms Nigeria
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Sourcing Quality Building Materials for Nigeria's Builders.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Building Moms Nigeria was established to bridge the trust gap in the Nigerian construction materials supply sector. We provide genuine, standard-compliant building and roofing materials to contractors, developers, and homeowners.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Our Founding Story
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Transforming Construction Procurement in Nigeria
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Construction in Nigeria is often fraught with procurement headaches: substandard gauge thicknesses, manipulated rebar weights, delayed deliveries, and inflated quotation figures that disrupt project budgets.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Building Moms Nigeria was founded with a singular conviction: that sourcing materials to build a home or commercial project should be transparent, straightforward, and reliable. We partner directly with verified steel rolling mills, certified roofing sheet coil manufacturers, and primary cement distribution channels to deliver genuine materials directly to your site.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span>Verified Micrometer Gauges</span>
              <span>·</span>
              <span>Transparent Price Schedules</span>
              <span>·</span>
              <span>Site Logistics Support</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-amber-600" />
                <span>Primary Distribution & Coverage</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We operate distribution and logistics hubs along major industrial axes, enabling fast offloading and deliveries across:
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
                <div className="p-3 bg-white rounded-lg border border-amber-300 bg-amber-50/50">
                  Timber Shed Market, Uwani, Enugu South (Head Depot)
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  Enugu & South-East Supply Corridor
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  Lagos & Ogun Distribution Hubs
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  Abuja FCT & North Central
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 col-span-2">
                  Nationwide Interstate Supply across all 36 States
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, and Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Mission */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To supply premium, certified building and roofing materials across Nigeria with honesty, accurate specifications, and dependable logistics that empower clients to build with peace of mind.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be Nigeria's most trusted building materials partner, recognized for setting the industry benchmark in material authenticity, technical advisory, and customer satisfaction.
            </p>
          </div>

          {/* Core Values */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Core Values</h3>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Integrity:</strong> We never compromise gauge specifications.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Reliability:</strong> Dependable on-time delivery.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Transparency:</strong> Clear pricing with zero hidden surcharges.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ready to Begin Your Construction Project?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Whether you need a roofing estimate or bulk reinforcement steel, our procurement specialists are on standby to assist you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetQuote}
              className="px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow transition-all cursor-pointer"
            >
              Request a Roofing Quote
            </button>
            <button
              onClick={onExploreProducts}
              className="px-7 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all cursor-pointer"
            >
              Browse Building Supplies
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
