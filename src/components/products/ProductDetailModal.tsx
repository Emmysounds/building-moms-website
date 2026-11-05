import React from 'react';
import { X, MessageSquare, Tag, Check, ShieldCheck, Truck, Layers } from 'lucide-react';
import { Product, BusinessSettings } from '../../types';
import { createGeneralWhatsAppLink } from '../../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product;
  settings: BusinessSettings;
  onClose: () => void;
  onRequestPrice: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  settings,
  onClose,
  onRequestPrice
}) => {
  const whatsappUrl = createGeneralWhatsAppLink(
    settings.whatsapp,
    `Hello Building Moms Nigeria, I am interested in: ${product.name}. Please share current pricing and delivery timeframe.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {product.categoryName}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-300">Technical Specifications</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Image Frame */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/95 text-slate-800 shadow-sm border border-slate-200">
                    {product.inStock ? 'In Stock' : 'Order on Demand'}
                  </span>
                </div>
              </div>

              {/* Delivery & Supply Badges */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Site dispatch from Lagos / Ogun warehouses</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard compliance verified</span>
                </div>
              </div>
            </div>

            {/* Information & Purchase Block */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h2>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xs text-slate-500">Pricing:</span>
                  {product.price ? (
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {product.price}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-amber-700">
                      Market Rate (Request Quote)
                    </span>
                  )}
                </div>

                {product.priceNote && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {product.priceNote}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Product Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {product.fullDescription || product.description}
                  </p>
                </div>

                {/* Available Sizes / Variants */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Available Sizes & Gauges
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.availableSizes.map((sz, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Standard Colors Available
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.colors.map((c, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    onClose();
                    onRequestPrice(product);
                  }}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Tag className="w-4 h-4" />
                  <span>Request Price & Availability</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl border border-emerald-500 hover:bg-emerald-50 text-emerald-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Technical Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Verified Technical Specifications</span>
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-200">
                    {product.specifications.map((spec, sIdx) => (
                      <tr key={sIdx} className={sIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-semibold text-slate-700 w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-slate-900 font-mono tabular-nums">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
