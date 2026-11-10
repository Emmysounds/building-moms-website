import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Package, 
  Calculator, 
  MessageSquare, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ExternalLink, 
  Download, 
  Search, 
  Filter,
  Phone,
  Eye,
  X,
  Upload,
  AlertCircle
} from 'lucide-react';
import { 
  Product, 
  ProductCategory, 
  RoofingQuoteRequest, 
  ProductEnquiry, 
  BusinessSettings, 
  EnquiryStatus 
} from '../../types';
import { 
  getProducts, 
  saveProduct, 
  deleteProduct, 
  getCategories, 
  saveCategory, 
  getRoofingQuotes, 
  updateQuoteStatus, 
  getProductEnquiries, 
  updateEnquiryStatus, 
  getSettings, 
  saveSettings, 
  isAdminAuthenticated, 
  setAdminAuthenticated, 
  exportAllDataJSON, 
  resetToDefaults 
} from '../../services/storage';
import { createAdminToCustomerWhatsAppLink } from '../../utils/whatsapp';

interface AdminDashboardProps {
  onExit: () => void;
}

const ALL_STATUSES: EnquiryStatus[] = [
  'New enquiry',
  'Contacted',
  'Quotation in progress',
  'Quote sent',
  'Order confirmed',
  'Completed'
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab: 'quotes' | 'enquiries' | 'products' | 'settings'
  const [activeTab, setActiveTab] = useState<'quotes' | 'enquiries' | 'products' | 'settings'>('quotes');

  // Loaded Data
  const [quotes, setQuotes] = useState<RoofingQuoteRequest[]>([]);
  const [enquiries, setEnquiries] = useState<ProductEnquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [settings, setSettingsState] = useState<BusinessSettings>(getSettings());

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedQuote, setSelectedQuote] = useState<RoofingQuoteRequest | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [drawingPreviewUrl, setDrawingPreviewUrl] = useState<string | null>(null);

  // Load state on mount
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    refreshData();
  }, []);

  const refreshData = () => {
    setQuotes(getRoofingQuotes());
    setEnquiries(getProductEnquiries());
    setProducts(getProducts());
    setCategories(getCategories());
    setSettingsState(getSettings());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === '2026' || passwordInput === 'bmn2026') {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError(null);
      refreshData();
    } else {
      setAuthError('Invalid administrator credentials. Try PIN: 2026 or admin123');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleStatusChange = (id: string, newStatus: EnquiryStatus, type: 'quote' | 'enquiry') => {
    if (type === 'quote') {
      updateQuoteStatus(id, newStatus);
    } else {
      updateEnquiryStatus(id, newStatus);
    }
    refreshData();
  };

  // ---------------- AUTHENTICATION GATE ----------------
  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-slate-900 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-800 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-500 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Building Moms Nigeria Staff Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized access for sales engineers and procurement coordinators.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 text-left mb-1.5">
                Staff Access PIN / Password
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter authorized PIN (e.g. 2026)"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setPasswordInput('2026');
                setAdminAuthenticated(true);
                setIsAuthenticated(true);
                refreshData();
              }}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline"
            >
              Click Here for 1-Click Demo Staff Access (PIN: 2026)
            </button>
          </div>

          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-600 block mx-auto"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    );
  }

  // ---------------- AUTHENTICATED DASHBOARD ----------------
  const filteredQuotes = quotes.filter(q => {
    if (statusFilter !== 'all' && q.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      return (
        q.id.toLowerCase().includes(qLower) ||
        q.customer.fullName.toLowerCase().includes(qLower) ||
        q.customer.phone.includes(qLower) ||
        q.customer.city.toLowerCase().includes(qLower) ||
        q.roofing.preferredSheet.toLowerCase().includes(qLower)
      );
    }
    return true;
  });

  const filteredEnquiries = enquiries.filter(e => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      return (
        e.id.toLowerCase().includes(qLower) ||
        e.customerName.toLowerCase().includes(qLower) ||
        e.phone.includes(qLower) ||
        e.productName.toLowerCase().includes(qLower)
      );
    }
    return true;
  });

  const newQuotesCount = quotes.filter(q => q.status === 'New enquiry').length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New enquiry').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-slate-800 shadow shrink-0 flex items-center justify-center">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_tg8p4ltg8p4ltg8p_43847f3c.jfif"
                alt="Building Moms Nigeria Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Building Moms Nigeria Admin</span>
              <span className="text-[10px] text-slate-400">Order & Material Sourcing Desk</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="text-xs text-slate-300 hover:text-white transition-colors"
            >
              View Public Website
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Total Roofing Quotes</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">{quotes.length}</span>
              {newQuotesCount > 0 && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {newQuotesCount} new
                </span>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Product Enquiries</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">{enquiries.length}</span>
              {newEnquiriesCount > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {newEnquiriesCount} new
                </span>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Active Material Items</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">{products.length}</span>
              <span className="text-xs text-slate-400">8 Categories</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Active WhatsApp Desk</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-xs font-mono font-bold text-slate-800">{settings.whatsapp}</span>
              <span className="text-xs text-emerald-600 font-semibold">Online</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-2 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('quotes'); setStatusFilter('all'); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'quotes' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Roofing Quotes ({quotes.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('enquiries'); setStatusFilter('all'); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'enquiries' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Product Enquiries ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'products' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Manage Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'settings' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Company Settings</span>
            </button>
          </div>

          <button
            onClick={() => {
              const json = exportAllDataJSON();
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `building_moms_nigeria_backup_${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
            }}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg flex items-center gap-1.5 hover:bg-slate-50 shrink-0"
            title="Download JSON Database Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
        </div>

        {/* ---------------- TAB 1: ROOFING QUOTES ---------------- */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Table Header Filter & Search */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search quote ref, client name, city..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Status Segmented Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  All ({quotes.length})
                </button>
                {ALL_STATUSES.map(st => {
                  const count = quotes.filter(q => q.status === st).length;
                  return (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                        statusFilter === st ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quotes Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Ref ID & Date</th>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Building & Location</th>
                    <th className="px-5 py-3.5">Roofing Sheet</th>
                    <th className="px-5 py-3.5">Drawing</th>
                    <th className="px-5 py-3.5">Workflow Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuotes.map(quote => {
                    const waReplyLink = createAdminToCustomerWhatsAppLink(
                      quote.customer.phone,
                      quote.id,
                      quote.customer.fullName
                    );

                    return (
                      <tr key={quote.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-slate-900">
                          {quote.id}
                          <span className="block text-[11px] text-slate-400 font-sans font-normal mt-0.5">
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-bold text-slate-900 block">{quote.customer.fullName}</span>
                          <span className="text-slate-500 font-mono">{quote.customer.phone}</span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-medium text-slate-800 block">
                            {quote.building.buildingType} ({quote.building.projectType})
                          </span>
                          <span className="text-slate-500">
                            {quote.customer.city}, {quote.customer.state}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-700 max-w-xs truncate">
                          {quote.roofing.preferredSheet}
                        </td>

                        <td className="px-5 py-4">
                          {quote.roofing.hasArchitecturalDrawing ? (
                            <button
                              onClick={() => {
                                if (quote.roofing.drawingFileDataUrl) {
                                  setDrawingPreviewUrl(quote.roofing.drawingFileDataUrl);
                                } else {
                                  alert(`Drawing filename: ${quote.roofing.drawingFileName || 'Roof Plan'}`);
                                }
                              }}
                              className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded text-[11px] font-semibold inline-flex items-center gap-1"
                            >
                              <FileText className="w-3 h-3" />
                              <span>View Plan</span>
                            </button>
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <select
                            value={quote.status}
                            onChange={e => handleStatusChange(quote.id, e.target.value as EnquiryStatus, 'quote')}
                            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                          >
                            {ALL_STATUSES.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>

                        <td className="px-5 py-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedQuote(quote)}
                            className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold"
                          >
                            Details
                          </button>
                          <a
                            href={waReplyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold inline-flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3 fill-current" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredQuotes.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500">
                  No roofing quote requests match the selected criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: PRODUCT ENQUIRIES ---------------- */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Search & Filter Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search enquiry ref, client, material..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  All ({enquiries.length})
                </button>
                {ALL_STATUSES.map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                      statusFilter === st ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Ref ID & Date</th>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Material Requested</th>
                    <th className="px-5 py-3.5">Required Quantity</th>
                    <th className="px-5 py-3.5">Delivery Destination</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.map(enq => (
                    <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-slate-900">
                        {enq.id}
                        <span className="block text-[11px] text-slate-400 font-sans font-normal mt-0.5">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-900 block">{enq.customerName}</span>
                        <span className="text-slate-500 font-mono">{enq.phone}</span>
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-900 max-w-xs truncate">
                        {enq.productName}
                      </td>

                      <td className="px-5 py-4 font-bold text-amber-800">
                        {enq.requiredQuantity}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {enq.deliveryLocation.city}, {enq.deliveryLocation.state} State
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={enq.status}
                          onChange={e => handleStatusChange(enq.id, e.target.value as EnquiryStatus, 'enquiry')}
                          className="text-xs px-2 py-1 rounded-lg border border-slate-300 bg-white font-semibold outline-none"
                        >
                          {ALL_STATUSES.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <a
                          href={createAdminToCustomerWhatsAppLink(enq.phone, enq.id, enq.customerName)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3 fill-current" />
                          <span>Reply WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredEnquiries.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500">
                  No product price requests found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: MANAGE PRODUCTS ---------------- */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Building Material Inventory</h3>
                <p className="text-xs text-slate-500">Add, edit descriptions, change prices, and toggle stock availability.</p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    name: '',
                    categoryId: categories[0]?.id || 'cat-roofing-sheets',
                    categoryName: categories[0]?.name || 'Roofing Sheets',
                    description: '',
                    fullDescription: '',
                    specifications: [{ label: 'Standard Gauge', value: '0.50mm' }],
                    availableSizes: ['Standard'],
                    price: '',
                    priceNote: 'Current market rate',
                    inStock: true,
                    image: '/src/assets/images/category_roofing_sheets_1793631188773.jpg',
                    unit: 'Per Piece'
                  });
                  setIsAddingProduct(true);
                }}
                className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Building Material</span>
              </button>
            </div>

            {/* Product Cards Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-amber-700 block uppercase tracking-wider">
                        {prod.categoryName}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{prod.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {prod.price || 'Market Rate'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">{prod.description}</p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const updated = { ...prod, inStock: !prod.inStock };
                        saveProduct(updated);
                        refreshData();
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      {prod.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsAddingProduct(false);
                        }}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${prod.name}?`)) {
                            deleteProduct(prod.id);
                            refreshData();
                          }
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ---------------- TAB 4: SETTINGS ---------------- */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Company & Contact Configuration</h3>
              <p className="text-xs text-slate-500">
                Update the official WhatsApp number, phone, email, and distribution depot address.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Official Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={e => setSettingsState({ ...settings, companyName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official WhatsApp Number (Nigeria)</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={e => setSettingsState({ ...settings, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Service Phone Line</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={e => setSettingsState({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={e => setSettingsState({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Office & Warehouse Address</label>
                <textarea
                  rows={2}
                  value={settings.address}
                  onChange={e => setSettingsState({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Hours</label>
                <input
                  type="text"
                  value={settings.businessHours}
                  onChange={e => setSettingsState({ ...settings, businessHours: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    saveSettings(settings);
                    alert('Settings updated successfully!');
                    refreshData();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs"
                >
                  Save Business Changes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all demo data back to default state?')) {
                      resetToDefaults();
                      refreshData();
                    }
                  }}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Reset Demo Data
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ---------------- MODAL: QUOTE DETAIL VIEW ---------------- */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700 block">{selectedQuote.id}</span>
                <h3 className="text-lg font-bold text-slate-900">Roofing Quotation Details</h3>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="p-1 rounded text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Customer:</span>
                <span className="font-bold text-slate-900 block">{selectedQuote.customer.fullName}</span>
                <span className="text-slate-600 block">{selectedQuote.customer.phone}</span>
                <span className="text-slate-600 block">{selectedQuote.customer.email || 'No email provided'}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Site Location:</span>
                <span className="font-bold text-slate-900 block">{selectedQuote.customer.city}</span>
                <span className="text-slate-600 block">{selectedQuote.customer.state} State, Nigeria</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 mb-2">Building & Roof Profile:</div>
              <div><strong>Project Type:</strong> {selectedQuote.building.projectType}</div>
              <div><strong>Building Type:</strong> {selectedQuote.building.buildingType}</div>
              <div><strong>Sections / Bedrooms:</strong> {selectedQuote.roofing.numberOfBedroomsOrSections}</div>
              <div><strong>Roof Style:</strong> {selectedQuote.roofing.roofType}</div>
              <div><strong>Selected Sheet:</strong> {selectedQuote.roofing.preferredSheet}</div>
              {selectedQuote.roofing.approxDimensions && (
                <div><strong>Dimensions:</strong> {selectedQuote.roofing.approxDimensions}</div>
              )}
            </div>

            {selectedQuote.roofing.hasArchitecturalDrawing && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <span>Drawing File: {selectedQuote.roofing.drawingFileName || 'Plan Attached'}</span>
                {selectedQuote.roofing.drawingFileDataUrl && (
                  <button
                    onClick={() => setDrawingPreviewUrl(selectedQuote.roofing.drawingFileDataUrl!)}
                    className="underline font-bold"
                  >
                    View Plan
                  </button>
                )}
              </div>
            )}

            {selectedQuote.additionalRequirements.items.length > 0 && (
              <div className="text-xs">
                <span className="font-bold text-slate-800 block mb-1">Selected Material Add-ons:</span>
                <span className="text-slate-600">{selectedQuote.additionalRequirements.items.join(', ')}</span>
              </div>
            )}

            {selectedQuote.additionalRequirements.additionalNotes && (
              <div className="text-xs p-3 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Client Notes:</span>
                <span className="text-slate-600">{selectedQuote.additionalRequirements.additionalNotes}</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <a
                href={createAdminToCustomerWhatsAppLink(selectedQuote.customer.phone, selectedQuote.id, selectedQuote.customer.fullName)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Chat with Customer on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: DRAWING PREVIEW ---------------- */}
      {drawingPreviewUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-4 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-bold text-slate-900">Uploaded Architectural Plan / Document</span>
              <button onClick={() => setDrawingPreviewUrl(null)} className="p-1 text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-slate-100 rounded-lg p-2">
              <img src={drawingPreviewUrl} alt="Architectural Plan" className="max-w-full max-h-[70vh] object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: ADD / EDIT PRODUCT ---------------- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-base font-bold text-slate-900">
                {isAddingProduct ? 'Add New Building Material' : 'Edit Product'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. 0.50mm Long-Span Aluminium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={e => {
                      const cat = categories.find(c => c.id === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        categoryId: e.target.value,
                        categoryName: cat?.name || 'Building Material'
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    value={editingProduct.unit}
                    onChange={e => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. Per Meter, Per Tonne, Per Bag"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (leave empty for Market Rate)</label>
                  <input
                    type="text"
                    value={editingProduct.price || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                    placeholder="e.g. ₦18,500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Availability</label>
                  <select
                    value={editingProduct.inStock ? 'true' : 'false'}
                    onChange={e => setEditingProduct({ ...editingProduct, inStock: e.target.value === 'true' })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!editingProduct.name.trim()) return alert('Product name required');
                    saveProduct(editingProduct);
                    setEditingProduct(null);
                    refreshData();
                  }}
                  className="px-5 py-2 rounded-lg bg-amber-600 text-white font-bold"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
