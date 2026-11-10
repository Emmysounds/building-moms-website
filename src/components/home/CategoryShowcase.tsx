import React from 'react';
import { ArrowRight, Layers, Hammer, Box, Wrench, Shield, TreePine } from 'lucide-react';
import { ProductCategory } from '../../types';

interface CategoryShowcaseProps {
  categories: ProductCategory[];
  onSelectCategory: (categorySlug: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'cat-roofing-sheets': Layers,
  'cat-iron-rods': Hammer,
  'cat-cement-blocks': Box,
  'cat-roofing-accessories': Shield,
  'cat-nails-binding': Wrench,
  'cat-construction-woods': TreePine,
};

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  categories,
  onSelectCategory
}) => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              Our Material Catalogues
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Essential Construction Materials for Your Site
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Browse our comprehensive selection of quality building supplies sourced directly for builders, engineers, and homeowners.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-amber-600 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View Full Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-column Category Grid for 6 core building materials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Box;

            return (
              <div
                key={cat.id}
                className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
              >
                {/* Image Container with Fallback */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully to solid slate gradient
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Category icon badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur text-slate-900 flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 text-amber-600" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Popular items pill-free unboxed list */}
                    <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-700 block mb-1">Key supplies:</span>
                      <p className="text-slate-500 line-clamp-1">
                        {cat.popularItems.join(' · ')}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="w-full py-2.5 px-3 rounded-lg border border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
