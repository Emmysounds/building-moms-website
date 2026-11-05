import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageSquare, Tag, Eye, Layers, CheckCircle2 } from 'lucide-react';
import { Product, ProductCategory, BusinessSettings } from '../../types';
import { createGeneralWhatsAppLink } from '../../utils/whatsapp';

interface ProductCataloguePageProps {
  products: Product[];
  categories: ProductCategory[];
  initialCategorySlug?: string;
  settings: BusinessSettings;
  onRequestPrice: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onOpenRoofingWizard: () => void;
}

export const ProductCataloguePage: React.FC<ProductCataloguePageProps> = ({
  products,
  categories,
  initialCategorySlug = 'all',
  settings,
  onRequestPrice,
  onViewProduct,
  onOpenRoofingWizard
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = categories.find(c => c.slug === selectedCategory);
        if (cat && p.categoryId !== cat.id) {
          return false;
        }
      }

      // Stock filter
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.categoryName.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesSpecs = p.specifications?.some(
          s => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
        );
        return matchesName || matchesCategory || matchesDesc || matchesSpecs;
      }

      return true;
    });
  }, [products, categories, selectedCategory, searchQuery, inStockOnly]);

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="pb-8 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              Building Materials Inventory
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Product Catalogue & Technical Specifications
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Explore genuine construction supplies with verified gauge thicknesses, tensile yield strength, and factory-direct supply across Nigeria.
            </p>
          </div>

          <button
            onClick={onOpenRoofingWizard}
            className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md self-start md:self-auto cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Layers className="w-4 h-4" />
            <span>Dedicated Roofing Quote</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search rebar, 0.50mm aluminium, cement, screws..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none bg-slate-50 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* In-Stock Filter Toggle */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="font-semibold">In Stock Items Only</span>
              </label>

              <span className="text-xs text-slate-400">|</span>

              <span className="text-xs text-slate-500 tabular-nums">
                {filteredProducts.length} material{filteredProducts.length === 1 ? '' : 's'} found
              </span>
            </div>
          </div>

          {/* Interactive Category Segmented Control / Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
            {filteredProducts.map(product => {
              const productWhatsAppUrl = createGeneralWhatsAppLink(
                settings.whatsapp,
                `Hello Building Moms Nigeria, I would like to request price quotation for: ${product.name} (Ref: ${product.id})`
              );

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute top-3 right-3">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-white/95 text-slate-800 shadow-sm border border-slate-200">
                        {product.inStock ? 'In Stock' : 'Order on Request'}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => onViewProduct(product)}
                        className="px-4 py-2 bg-white text-slate-900 text-xs font-semibold rounded-lg shadow hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-amber-600 block">
                        {product.categoryName}
                      </span>

                      <h3
                        onClick={() => onViewProduct(product)}
                        className="text-base font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Technical Spec Snippet */}
                      {product.specifications && product.specifications.length > 0 && (
                        <div className="pt-2 text-[11px] text-slate-500 font-mono space-y-1">
                          <div>
                            <span className="text-slate-400">{product.specifications[0].label}: </span>
                            <span className="text-slate-700">{product.specifications[0].value}</span>
                          </div>
                        </div>
                      )}

                      {/* Price Section */}
                      <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                        <span className="text-xs text-slate-500">Price:</span>
                        {product.price ? (
                          <span className="text-sm font-bold text-slate-900 tabular-nums">
                            {product.price}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-amber-700">
                            Market Rate on Request
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
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
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Building Materials Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find materials matching your search terms or filter. Try clearing filters or contacting our sales desk directly.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setInStockOnly(false);
              }}
              className="px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
