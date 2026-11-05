import React from 'react';
import { ArrowRight, MessageSquare, Tag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { createGeneralWhatsAppLink } from '../../utils/whatsapp';

interface FeaturedProductsSectionProps {
  products: Product[];
  companyWhatsApp: string;
  onRequestPrice: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onViewAllProducts: () => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  companyWhatsApp,
  onRequestPrice,
  onViewProduct,
  onViewAllProducts
}) => {
  const featured = products.filter(p => p.featured).slice(0, 6);

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              Featured Supplies
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Building Materials
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              High-demand structural steel, roofing sheets, and masonry supplies ready for site dispatch.
            </p>
          </div>

          <button
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-amber-600 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => {
            const productWhatsAppUrl = createGeneralWhatsAppLink(
              companyWhatsApp,
              `Hello Building Moms Nigeria, I would like to enquire about the current price and availability of: ${product.name}`
            );

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Stock Availability Indicator */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/95 text-slate-800 shadow-sm border border-slate-200">
                      {product.inStock ? 'In Stock' : 'Pre-order / Batch'}
                    </span>
                  </div>

                  {/* Quick Detail View Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => onViewProduct(product)}
                      className="px-4 py-2 bg-white text-slate-900 text-xs font-semibold rounded-lg shadow hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Specs</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-amber-600">
                      {product.categoryName}
                    </div>

                    <h3 
                      onClick={() => onViewProduct(product)}
                      className="text-base font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price and Specification baseline */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-500">Unit:</span>
                        <span className="text-xs font-semibold text-slate-700">{product.unit}</span>
                      </div>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-xs text-slate-500">Price:</span>
                        {product.price ? (
                          <span className="text-sm font-bold text-slate-900 tabular-nums">
                            {product.price}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-amber-700">
                            Current Market Rate
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onRequestPrice(product)}
                      className="py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Request Price</span>
                    </button>

                    <a
                      href={productWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg border border-emerald-500 hover:bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
