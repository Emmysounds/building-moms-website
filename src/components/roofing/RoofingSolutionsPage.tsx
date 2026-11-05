import React from 'react';
import { ArrowRight, Calculator, Check, ShieldCheck, Ruler, Sparkles, HelpCircle } from 'lucide-react';
import { BusinessSettings } from '../../types';
import { createGeneralWhatsAppLink } from '../../utils/whatsapp';

interface RoofingSolutionsPageProps {
  settings: BusinessSettings;
  onOpenRoofingWizard: () => void;
}

export const RoofingSolutionsPage: React.FC<RoofingSolutionsPageProps> = ({
  settings,
  onOpenRoofingWizard
}) => {
  const whatsappUrl = createGeneralWhatsAppLink(
    settings.whatsapp,
    'Hello Building Moms Nigeria, I would like to get professional advice on the best roofing sheets for my building project.'
  );

  const ROOFING_TYPES = [
    {
      title: 'Stone-Coated Metal Roofing Tiles',
      popularName: 'Gerard / Bond / Shingle / Roman Tiles',
      description: 'Manufactured with an Aluzinc core coated with natural acrylic-bonded volcanic basalt stone chips. The gold standard for prestige residential roofs in Nigeria.',
      features: [
        '50-year manufacturer durability rating',
        'Exceptional sound dampening during torrential tropical rainfall',
        'Non-fading natural stone granules with zero color chipping',
        'Interlocking design resistant to extreme hurricane wind uplift',
        'Profiles available: Bond, Classic, Shingle, and Roman'
      ],
      image: '/src/assets/images/hero_roofing_construction_1793631189514.jpg'
    },
    {
      title: '0.50mm & 0.55mm Step-Tile Aluminium',
      popularName: 'Steptile Embossed Profile',
      description: 'Engineered for homeowners who desire the timeless stepped-tile architectural look combined with the lightweight, rust-free resilience of pure aluminium.',
      features: [
        'Available in true micrometer-verified 0.50mm and 0.55mm thickness',
        'Capillary anti-siphon groove to block water capillary action',
        'Roll-formed to continuous custom pitch lengths without cross-joints',
        'Baked-in oven fluorocarbon enamel finish',
        'Colors: Chocolate Brown, Charcoal Black, Terracotta Red, Wine Red'
      ],
      image: '/src/assets/images/category_roofing_sheets_1793631188773.jpg'
    },
    {
      title: '0.50mm Long-Span Aluminium Sheets',
      popularName: 'Industrial & Residential Long-Span',
      description: 'The most versatile, leak-proof roofing solution in Nigeria. Continuous lengths rolled directly to your ridge-to-fascia measurement eliminates end-laps entirely.',
      features: [
        '100% rust-free aluminium alloy suited for coastal and humid areas',
        'Lightweight structure reduces strain on roof wooden trusses',
        'Rapid installation speeds up construction project timelines',
        'High solar reflectance keeps indoor temperatures cooler',
        'Optimal for residential bungalows, duplexes, schools, and halls'
      ],
      image: '/src/assets/images/category_roofing_sheets_1793631188773.jpg'
    },
    {
      title: 'Metcoppo Aluminium Sheets',
      popularName: 'Curved Barrel Tile Profile',
      description: 'Replicates classic Mediterranean curved barrel terracotta tiles with the modern structural benefits of roll-formed corrugated aluminium.',
      features: [
        'Distinctive deep corrugated wave profile',
        'High water displacement capacity during intense Nigerian storms',
        'Rigid corrugation prevents roof sagging between purlins',
        'Contemporary luxury aesthetic'
      ],
      image: '/src/assets/images/hero_roofing_construction_1793631189514.jpg'
    }
  ];

  return (
    <div className="py-12 bg-white">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Roofing Excellence & Guidance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Premium Roofing Sheets & Complete Roofing Solutions
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              A house roof is your primary shield against Nigerian weather. We supply genuine stone-coated tiles, heavy-gauge aluminium sheets, and all accessories cut to exact architectural specifications.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenRoofingWizard}
                className="px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>REQUEST A DETAILED ROOFING QUOTE</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Consult Our Roofing Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Roofing Sheet Profiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">
            Engineered Options
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Our Roofing Sheet Profiles
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Compare our verified roofing solutions to select the ideal aesthetic, durability, and budget fit for your project.
          </p>
        </div>

        <div className="space-y-12">
          {ROOFING_TYPES.map((type, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Media Container */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden shadow-sm bg-slate-200">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  {type.popularName}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {type.description}
                </p>

                <div className="space-y-2 pt-2">
                  {type.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenRoofingWizard}
                    className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Get Quote for {type.title.split(' ')[0]} Sheets</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessories Section */}
      <div className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Essential Roofing Accessories & Waterproofing
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A durable roof requires more than just sheets. We provide matched accessories to seal joints against leaks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Aluminium Ridge Caps',
                desc: 'Folded in 0.50mm / 0.55mm aluminium to cover the apex and hips of roof rafters.'
              },
              {
                title: 'Valley Gutters & Flashing',
                desc: 'Pre-bent channels for internal valleys where two roof slopes meet, routing rainfall away safely.'
              },
              {
                title: 'Fasteners & Screws',
                desc: 'Self-tapping screws with EPDM rubber washers and galvanized umbrella nails.'
              },
              {
                title: 'Rainwater Gutters',
                desc: 'Seamless eaves gutter systems with downspout nozzles for controlled storm drainage.'
              }
            ].map((acc, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{acc.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{acc.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenRoofingWizard}
              className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Start Complete Roofing Estimate
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
