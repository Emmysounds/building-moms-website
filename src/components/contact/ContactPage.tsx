import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BusinessSettings } from '../../types';
import { createGeneralWhatsAppLink } from '../../utils/whatsapp';

interface ContactPageProps {
  settings: BusinessSettings;
  onOpenRoofingWizard: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onOpenRoofingWizard }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const whatsappUrl = createGeneralWhatsAppLink(settings.whatsapp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Building Moms Nigeria
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions about material specifications, truckload deliveries, or site quotation reviews? Our sales and customer service team is ready to assist you.
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phone Consultation</h3>
                <p className="text-xs text-slate-500 mt-0.5">Speak with our sales engineers</p>
                <a href={`tel:${settings.phone}`} className="text-sm font-bold text-amber-700 hover:text-amber-800 mt-2 block">
                  {settings.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">WhatsApp Desk</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fast estimates & drawing uploads</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-emerald-700 hover:text-emerald-800 mt-2 inline-flex items-center gap-1"
                >
                  <span>Chat on {settings.whatsapp}</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Email Enquiries</h3>
                <p className="text-xs text-slate-500 mt-0.5">For formal tenders and invoices</p>
                <a href={`mailto:${settings.email}`} className="text-sm font-bold text-slate-800 hover:text-amber-600 mt-2 block">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-xs text-slate-600 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">Supply & Distribution Depot</h3>
                <p>{settings.address}</p>
                <div className="pt-2 flex items-center gap-2 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{settings.businessHours}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your enquiry details below and our sales representatives will contact you promptly.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">Message Received!</h3>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                    Thank you, {formState.name}. One of our sales specialists will respond to your phone number ({formState.phone}) within business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
                    }}
                    className="text-xs font-semibold text-emerald-700 underline mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arc. Johnson"
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
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
                        placeholder="e.g. 0803 000 0000"
                        value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. info@firm.ng"
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Enquiry Type
                      </label>
                      <select
                        value={formState.subject}
                        onChange={e => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none bg-white"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Roofing Sheets Supply">Roofing Sheets Supply</option>
                        <option value="Iron Rods & Rebar Bulk Order">Iron Rods & Rebar Bulk Order</option>
                        <option value="Cement Delivery">Cement Delivery</option>
                        <option value="Partnership / Contractor Supply">Partnership / Contractor Supply</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message or Material Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please share what materials you are looking for, site location, and any timeline constraints..."
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Send Enquiry Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Google Maps / Depot Location Preview Section */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Distribution & Offloading Warehouses
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Located at Timber Shed Market, Uwani, Enugu South LGA, with dedicated transport networks for fast direct site dispatches across Enugu State, the South-East, and nationwide.
            </p>
          </div>

          {/* Interactive Map Embed / Preview Container */}
          <div className="relative rounded-xl overflow-hidden border border-slate-300 aspect-[21/9] bg-slate-200">
            <iframe
              title="Building Moms Nigeria Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15861.27218698544!2d7.482000!3d6.435000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a3d6f1a8b941%3A0xb99990835f8c679a!2sUwani%2C%20Enugu%2C%20Enugu%20State!5e0!3m2!1sen!2sng!4v1710000000000!5m2!1sen!2sng"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Location pin tag */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-3 rounded-lg shadow-md border border-slate-200 text-xs hidden sm:block">
              <span className="font-bold text-slate-900 block">Shop 258A, Line 2, Timber Shed Market</span>
              <span className="text-slate-600">Uwani, Enugu South LGA, Enugu State</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
