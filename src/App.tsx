import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Homepage components
import { HeroSection } from './components/home/HeroSection';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { RoofingSolutionsSection } from './components/home/RoofingSolutionsSection';
import { FeaturedProductsSection } from './components/home/FeaturedProductsSection';
import { HowItWorks } from './components/home/HowItWorks';
import { CustomerTrustSection } from './components/home/CustomerTrustSection';

// Other Pages
import { RoofingQuotationPage } from './components/roofing/RoofingQuotationPage';
import { RoofingSolutionsPage } from './components/roofing/RoofingSolutionsPage';
import { ProductCataloguePage } from './components/products/ProductCataloguePage';
import { ProductEnquiryModal } from './components/products/ProductEnquiryModal';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { AboutUsPage } from './components/about/AboutUsPage';
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Data & Services
import { Product, ProductCategory, BusinessSettings, RoofingQuoteRequest, ProductEnquiry } from './types';
import { 
  getProducts, 
  getCategories, 
  getSettings, 
  getRoofingQuotes, 
  getProductEnquiries, 
  subscribeToDataChanges 
} from './services/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  
  // Modals
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Storage synced state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(getSettings());
  const [quotes, setQuotes] = useState<RoofingQuoteRequest[]>([]);
  const [enquiries, setEnquiries] = useState<ProductEnquiry[]>([]);

  const reloadData = () => {
    setProducts(getProducts());
    setCategories(getCategories());
    setSettings(getSettings());
    setQuotes(getRoofingQuotes());
    setEnquiries(getProductEnquiries());
  };

  useEffect(() => {
    reloadData();
    const unsubscribe = subscribeToDataChanges(() => {
      reloadData();
    });
    return unsubscribe;
  }, []);

  const handleNavigate = (view: string, categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    } else {
      setSelectedCategorySlug('all');
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromHome = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const newActivityCount = 
    quotes.filter(q => q.status === 'New enquiry').length + 
    enquiries.filter(e => e.status === 'New enquiry').length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        settings={settings}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <div>
            <HeroSection
              onExploreProducts={() => handleNavigate('products')}
              onGetRoofingQuote={() => handleNavigate('quote-wizard')}
            />

            <CategoryShowcase
              categories={categories}
              onSelectCategory={handleSelectCategoryFromHome}
            />

            <WhyChooseUs />

            <RoofingSolutionsSection
              onOpenRoofingQuote={() => handleNavigate('quote-wizard')}
            />

            <FeaturedProductsSection
              products={products}
              companyWhatsApp={settings.whatsapp}
              onRequestPrice={(prod) => setEnquiryProduct(prod)}
              onViewProduct={(prod) => setDetailProduct(prod)}
              onViewAllProducts={() => handleNavigate('products')}
            />

            <HowItWorks
              onStartQuote={() => handleNavigate('quote-wizard')}
              onBrowseCatalogue={() => handleNavigate('products')}
            />

            <CustomerTrustSection
              companyWhatsApp={settings.whatsapp}
              companyPhone={settings.phone}
            />
          </div>
        )}

        {/* VIEW: PRODUCT CATALOGUE */}
        {currentView === 'products' && (
          <ProductCataloguePage
            products={products}
            categories={categories}
            initialCategorySlug={selectedCategorySlug}
            settings={settings}
            onRequestPrice={(prod) => setEnquiryProduct(prod)}
            onViewProduct={(prod) => setDetailProduct(prod)}
            onOpenRoofingWizard={() => handleNavigate('quote-wizard')}
          />
        )}

        {/* VIEW: ROOFING SOLUTIONS (Educational & Guide) */}
        {currentView === 'roofing' && (
          <RoofingSolutionsPage
            settings={settings}
            onOpenRoofingWizard={() => handleNavigate('quote-wizard')}
          />
        )}

        {/* VIEW: DEDICATED ROOFING QUOTATION WIZARD */}
        {currentView === 'quote-wizard' && (
          <RoofingQuotationPage
            settings={settings}
            onNavigateHome={() => handleNavigate('home')}
            onExploreProducts={() => handleNavigate('products')}
          />
        )}

        {/* VIEW: ABOUT US */}
        {currentView === 'about' && (
          <AboutUsPage
            settings={settings}
            onGetQuote={() => handleNavigate('quote-wizard')}
            onExploreProducts={() => handleNavigate('products')}
          />
        )}

        {/* VIEW: CONTACT */}
        {currentView === 'contact' && (
          <ContactPage
            settings={settings}
            onOpenRoofingWizard={() => handleNavigate('quote-wizard')}
          />
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboard
            onExit={() => handleNavigate('home')}
          />
        )}

      </main>

      {/* Footer (omitted only in admin full-screen dashboard) */}
      {currentView !== 'admin' && (
        <Footer
          settings={settings}
          categories={categories}
          onNavigate={handleNavigate}
        />
      )}

      {/* Floating WhatsApp Action Button */}
      {currentView !== 'admin' && (
        <WhatsAppFloatingButton whatsappNumber={settings.whatsapp} />
      )}

      {/* Global Product Price Enquiry Modal */}
      {enquiryProduct && (
        <ProductEnquiryModal
          product={enquiryProduct}
          settings={settings}
          onClose={() => setEnquiryProduct(null)}
        />
      )}

      {/* Global Product Technical Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          settings={settings}
          onClose={() => setDetailProduct(null)}
          onRequestPrice={(prod) => {
            setDetailProduct(null);
            setEnquiryProduct(prod);
          }}
        />
      )}

    </div>
  );
}
