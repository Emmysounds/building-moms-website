import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, AlertCircle, Tag, Truck } from 'lucide-react';
import { Product, ProductEnquiry, BusinessSettings } from '../../types';
import { NIGERIAN_STATES } from '../../data/initialData';
import { saveProductEnquiry } from '../../services/storage';
import { createProductEnquiryWhatsAppLink } from '../../utils/whatsapp';

interface ProductEnquiryModalProps {
  product: Product;
  settings: BusinessSettings;
  onClose: () => void;
}

export const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({
  product,
  settings,
  onClose
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsapp: '',
    email: '',
    requiredQuantity: '',
    state: 'Lagos',
    city: '',
    additionalRequirements: '',
    sameAsPhone: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<ProductEnquiry | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setError('Please provide a valid phone number.');
      return;
    }
    if (!formData.requiredQuantity.trim()) {
      setError('Please indicate your required quantity or project scale.');
      return;
    }
    if (!formData.city.trim()) {
      setError('Please specify your delivery town or city.');
      return;
    }

    setIsSubmitting(true);
    const enquiryId = `BMN-ENQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const effectiveWhatsApp = formData.sameAsPhone ? formData.phone : (formData.whatsapp || formData.phone);

    const newEnquiry: ProductEnquiry = {
      id: enquiryId,
      createdAt: new Date().toISOString(),
      status: 'New enquiry',
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      whatsapp: effectiveWhatsApp.trim(),
      email: formData.email.trim() || undefined,
      productId: product.id,
      productName: product.name,
      requiredQuantity: formData.requiredQuantity.trim(),
      deliveryLocation: {
        state: formData.state,
        city: formData.city.trim()
      },
      additionalRequirements: formData.additionalRequirements.trim() || undefined
    };

    setTimeout(() => {
      saveProductEnquiry(newEnquiry);
      setSubmittedEnquiry(newEnquiry);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              Direct Price Quotation
            </span>
            <h3 className="text-base font-bold text-white">
              Request Price for Building Material
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Product Pill */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <span className="text-xs text-amber-700 font-semibold block">{product.categoryName}</span>
            <span className="text-sm font-bold text-slate-900 truncate block">{product.name}</span>
            <span className="text-xs text-slate-500">Unit: {product.unit}</span>
          </div>
        </div>

        {/* Success View */}
        {submittedEnquiry ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h4 className="text-xl font-bold text-slate-900">Enquiry Submitted!</h4>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your price request for <strong>{product.name}</strong> has been assigned reference code <strong className="font-mono text-slate-900">{submittedEnquiry.id}</strong>. Our sales desk is preparing your quote.
            </p>

            <div className="pt-2">
              <a
                href={createProductEnquiryWhatsAppLink(settings.whatsapp, submittedEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Transmit Immediately to WhatsApp Desk</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="mt-4 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Johnson or Mrs. Eze"
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0802 334 1188"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Required Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 500 pcs / 10 tonnes / 200 bags"
                  value={formData.requiredQuantity}
                  onChange={e => setFormData({ ...formData, requiredQuantity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery State <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none bg-white"
                >
                  {NIGERIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Site Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ikeja, Ibadan, Asaba, Abuja"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Specifications or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Specify gauge, color preference, delivery deadline, offloading requirements..."
                  value={formData.additionalRequirements}
                  onChange={e => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Tag className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Enquiry...' : 'SEND PRICE REQUEST'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
