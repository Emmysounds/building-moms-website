import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, ArrowUpRight } from 'lucide-react';
import { BusinessSettings, ProductCategory } from '../types';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

interface FooterProps {
  settings: BusinessSettings;
  categories: ProductCategory[];
  onNavigate: (view: string, categorySlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, categories, onNavigate }) => {
  const whatsappUrl = createGeneralWhatsAppLink(settings.whatsapp);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg overflow-hidden bg-black border border-slate-800 shadow shrink-0 flex items-center justify-center">
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_tg8p4ltg8p4ltg8p_43847f3c.jfif"
                  alt="Building Moms Nigeria Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  BuildingMoms Nigeria
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">
                  Building & Construction Materials Supply
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              BuildingMoms Nigeria is a trusted building materials supply business helping individuals, contractors, builders, property developers, and engineers source verified quality construction materials with transparency and dependable nationwide delivery.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <button
                onClick={() => onNavigate('quote-wizard')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
              >
                Roofing Calculator
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 3: Key Product Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Building Materials
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('products', cat.slug)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Important Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Product Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roofing')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Roofing Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quote-wizard')}
                  className="hover:text-amber-400 transition-colors text-amber-500 font-medium"
                >
                  Request a Roofing Quote
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Our Company
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact & Depot Offices
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Depot */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact & Supply Hub
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {settings.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{settings.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Building Moms Nigeria. All rights reserved. Quality building materials supply in Nigeria.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Verified Materials</span>
            <span aria-hidden="true">·</span>
            <span>Site Offloading Support</span>
            <span aria-hidden="true">·</span>
            <span>Direct Mill Supply</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
