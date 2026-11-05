import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';
import { BusinessSettings } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, categorySlug?: string) => void;
  settings: BusinessSettings;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, settings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark element */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-500 flex items-center justify-center font-black text-xl tracking-tight shadow-sm border border-slate-800 transition-transform group-hover:scale-105">
            BM
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight whitespace-nowrap">
              Building Moms Nigeria
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide">
              ...Let's build it
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNav('home')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentView === 'home' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('products')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentView === 'products' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Products
          </button>
          <button
            onClick={() => handleNav('roofing')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentView === 'roofing' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Roofing Solutions
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentView === 'about' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentView === 'contact' ? 'text-amber-600 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNav('quote-wizard')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNav('home')}
              className={`text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === 'home' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('products')}
              className={`text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === 'products' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => handleNav('roofing')}
              className={`text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === 'roofing' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Roofing Solutions
            </button>
            <button
              onClick={() => handleNav('quote-wizard')}
              className={`text-left px-3 py-2 rounded-md text-base font-medium text-amber-600 hover:bg-amber-50`}
            >
              Request a Roofing Quote
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === 'about' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === 'contact' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact & Depot Locations
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Direct WhatsApp: {settings.whatsapp}</span>
          </div>
        </div>
      )}
    </header>
  );
};
