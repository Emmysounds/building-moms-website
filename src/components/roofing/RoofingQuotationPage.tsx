import React, { useState } from 'react';
import { 
  Building, 
  Layers, 
  User, 
  CheckCircle2, 
  Upload, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  AlertCircle, 
  MessageSquare, 
  ShieldCheck, 
  Phone,
  FileCheck2,
  Trash2
} from 'lucide-react';
import { RoofingQuoteRequest, BusinessSettings } from '../../types';
import { NIGERIAN_STATES } from '../../data/initialData';
import { saveRoofingQuote } from '../../services/storage';
import { createRoofingQuoteWhatsAppLink } from '../../utils/whatsapp';

interface RoofingQuotationPageProps {
  settings: BusinessSettings;
  onNavigateHome: () => void;
  onExploreProducts: () => void;
}

export const RoofingQuotationPage: React.FC<RoofingQuotationPageProps> = ({
  settings,
  onNavigateHome,
  onExploreProducts
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<RoofingQuoteRequest | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Customer
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    state: 'Lagos',
    city: '',
    sameAsPhone: true,

    // Step 2: Building
    projectType: 'New building' as 'New building' | 'Roof replacement',
    buildingType: 'Bungalow' as 'Bungalow' | 'Duplex' | 'Two-storey building' | 'Commercial building' | 'Other',
    otherBuildingType: '',

    // Step 3: Roofing
    dimensionsKnown: false,
    approxDimensions: '',
    numberOfBedroomsOrSections: '4 Bedrooms',
    roofType: 'Hip roof (standard pitched 4 sides)',
    preferredSheet: 'Long-span aluminium roofing sheets' as any,
    hasArchitecturalDrawing: false,
    drawingFileName: '',
    drawingFileDataUrl: '',

    // Step 4: Additional Requirements
    additionalMaterials: [
      'Roofing sheets',
      'Roofing nails',
      'Roofing accessories'
    ] as string[],
    additionalNotes: ''
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const ROOFING_SHEET_OPTIONS = [
    {
      id: 'Long-span aluminium roofing sheets',
      name: 'Long-Span Aluminium Roofing Sheets',
      desc: 'Seamless continuous custom-cut sheets, zero horizontal overlaps, rust-free endurance.'
    },
    {
      id: 'Step-tile roofing sheets',
      name: 'Step-Tile Aluminium Roofing Sheets',
      desc: 'Classic decorative stepped tile appearance with lightweight aluminium durability.'
    },
    {
      id: 'Stone-coated roofing sheets',
      name: 'Stone-Coated Roofing Sheets (Gerard / Bond / Shingle)',
      desc: 'Premium natural stone granule coating, superior sound deadening, 50-year longevity.'
    },
    {
      id: 'Metcoppo roofing sheets',
      name: 'Metcoppo Roofing Sheets',
      desc: 'Mediterranean clay tile aesthetic roll-formed in modern aluminium profile.'
    },
    {
      id: 'Aluzinc roofing sheets',
      name: 'Aluzinc / Galvalume Roofing Sheets',
      desc: 'Corrosion-resistant aluminium-zinc alloy coated sheet.'
    },
    {
      id: 'Not sure; I need professional guidance',
      name: 'Not Sure; I Need Professional Guidance',
      desc: 'Our quantity surveyors and roofing experts will advise based on your building style.'
    }
  ];

  const MATERIAL_CHECKLIST = [
    'Roofing sheets',
    'Roofing nails',
    'Roofing accessories',
    'Roofing wood or trusses',
    'Fascia boards',
    'Ceiling materials',
    'Other materials'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setValidationError('File size exceeds 15MB limit. Please upload a smaller file or send via WhatsApp.');
        return;
      }
      setValidationError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          hasArchitecturalDrawing: true,
          drawingFileName: file.name,
          drawingFileDataUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      hasArchitecturalDrawing: false,
      drawingFileName: '',
      drawingFileDataUrl: ''
    }));
  };

  const toggleMaterial = (mat: string) => {
    setFormData(prev => {
      const exists = prev.additionalMaterials.includes(mat);
      if (exists) {
        return { ...prev, additionalMaterials: prev.additionalMaterials.filter(m => m !== mat) };
      } else {
        return { ...prev, additionalMaterials: [...prev.additionalMaterials, mat] };
      }
    });
  };

  const validateStep = (currentStep: number): boolean => {
    setValidationError(null);
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setValidationError('Please enter your full name.');
        return false;
      }
      if (!formData.phone.trim() || formData.phone.length < 9) {
        setValidationError('Please enter a valid phone number so we can reach you.');
        return false;
      }
      if (!formData.city.trim()) {
        setValidationError('Please specify your town, city, or site area.');
        return false;
      }
    } else if (currentStep === 2) {
      if (formData.buildingType === 'Other' && !formData.otherBuildingType.trim()) {
        setValidationError('Please specify your building type.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    setStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    const quoteId = `BMN-RF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const effectiveWhatsApp = formData.sameAsPhone ? formData.phone : (formData.whatsapp || formData.phone);

    const newQuote: RoofingQuoteRequest = {
      id: quoteId,
      createdAt: new Date().toISOString(),
      status: 'New enquiry',
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        whatsapp: effectiveWhatsApp.trim(),
        email: formData.email.trim() || undefined,
        state: formData.state,
        city: formData.city.trim()
      },
      building: {
        projectType: formData.projectType,
        buildingType: formData.buildingType,
        otherBuildingType: formData.otherBuildingType.trim() || undefined
      },
      roofing: {
        dimensionsKnown: formData.dimensionsKnown,
        approxDimensions: formData.dimensionsKnown ? formData.approxDimensions : undefined,
        numberOfBedroomsOrSections: formData.numberOfBedroomsOrSections,
        roofType: formData.roofType,
        preferredSheet: formData.preferredSheet,
        hasArchitecturalDrawing: formData.hasArchitecturalDrawing,
        drawingFileName: formData.drawingFileName || undefined,
        drawingFileDataUrl: formData.drawingFileDataUrl || undefined
      },
      additionalRequirements: {
        items: formData.additionalMaterials,
        additionalNotes: formData.additionalNotes.trim() || undefined
      }
    };

    setTimeout(() => {
      saveRoofingQuote(newQuote);
      setSubmittedQuote(newQuote);
      setIsSubmitting(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 600);
  };

  // ---------------- SUCCESS SCREEN ----------------
  if (submittedQuote) {
    const whatsappLink = createRoofingQuoteWhatsAppLink(settings.whatsapp, submittedQuote);

    return (
      <div className="py-16 bg-slate-50 min-h-[80vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 sm:p-12 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              Quotation Request Received
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thank You, {submittedQuote.customer.fullName}!
            </h1>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Your roofing quote request has been registered in our system with reference code <strong className="text-slate-900 font-mono font-bold">{submittedQuote.id}</strong>.
            </p>

            {/* Crucial Business Notice */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs sm:text-sm text-amber-900 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-amber-950 mb-1">Technical Review Notice:</strong>
                  To protect our customers from costly shortages or surplus, Building Moms Nigeria does not generate speculative final prices from incomplete estimates. Our technical estimating team will review your roof measurements and contact you with a transparent, verified bill of materials and delivery cost.
                </div>
              </div>
            </div>

            {/* Summary Details */}
            <div className="mt-8 p-6 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Project Location:</span>
                <span className="font-semibold text-slate-800">{submittedQuote.customer.city}, {submittedQuote.customer.state} State</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Building Type:</span>
                <span className="font-semibold text-slate-800">{submittedQuote.building.buildingType} ({submittedQuote.building.projectType})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Selected Sheet:</span>
                <span className="font-semibold text-slate-800">{submittedQuote.roofing.preferredSheet}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Drawing Attached:</span>
                <span className="font-semibold text-slate-800">
                  {submittedQuote.roofing.hasArchitecturalDrawing ? `Yes (${submittedQuote.roofing.drawingFileName})` : 'None uploaded'}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Instant Transmit Button */}
            <div className="mt-8 space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Send Summary to Sales Team on WhatsApp</span>
              </a>

              <p className="text-xs text-slate-500">
                Clicking above opens WhatsApp with your quotation reference pre-filled for prioritized attention.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onExploreProducts}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Explore Other Construction Supplies
              </button>
              <span className="hidden sm:inline text-slate-300">·</span>
              <button
                onClick={onNavigateHome}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Return to Homepage
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ---------------- MULTI-STEP WIZARD ----------------
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Headline & Subtitle */}
        <div className="mb-8 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            Dedicated Quotation System
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get a Roofing Quote for Your Building Project.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Planning to roof your house? Tell us about your building and roofing requirements. Our team will review your information and contact you with a quotation.
          </p>
        </div>

        {/* Wizard Stepper Progress Bar */}
        <div className="mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Customer Info' },
              { num: 2, label: 'Building Details' },
              { num: 3, label: 'Roofing Specs' },
              { num: 4, label: 'Additional Items' },
              { num: 5, label: 'Review & Submit' }
            ].map(s => {
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div key={s.num} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                    isDone 
                      ? 'bg-emerald-600 text-white' 
                      : isActive 
                        ? 'bg-amber-600 text-white ring-4 ring-amber-100' 
                        : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`hidden sm:inline font-medium text-[11px] ${
                    isActive ? 'text-amber-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Card Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: CUSTOMER INFORMATION */}
            {step === 1 && (
              <div className="p-6 sm:p-10 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-amber-600" />
                    <span>Step 1: Customer Contact & Site Location</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Provide the details of where your project is located so we can calculate logistics and contact you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name or Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Babatunde Adeleke / Apex Builders Ltd"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm outline-none"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm outline-none"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      disabled={formData.sameAsPhone}
                      placeholder={formData.sameAsPhone ? "Same as phone number" : "e.g. 0814 987 6543"}
                      value={formData.sameAsPhone ? formData.phone : formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border text-sm outline-none ${
                        formData.sameAsPhone ? 'bg-slate-50 text-slate-400 border-slate-200' : 'border-slate-300 focus:ring-2 focus:ring-amber-500'
                      }`}
                    />
                    <label className="flex items-center gap-2 mt-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sameAsPhone}
                        onChange={e => setFormData({ ...formData, sameAsPhone: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>My WhatsApp number is the same as my phone number</span>
                    </label>
                  </div>

                  {/* Email Address (optional) */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-slate-400 font-normal">(Optional for receiving written quotation PDF)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm outline-none"
                    />
                  </div>

                  {/* State in Nigeria */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      State in Nigeria <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm outline-none bg-white"
                    >
                      {NIGERIAN_STATES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {/* City / Area */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      City, Town or Site Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lekki Phase 2, Magboro, Bodija, Gwarinpa"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: BUILDING INFORMATION */}
            {step === 2 && (
              <div className="p-6 sm:p-10 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-5 h-5 text-amber-600" />
                    <span>Step 2: Building Project Details</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Help us understand the architectural structure of the building being roofed.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* New building or replacement */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Is this a new building or a roof replacement? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'New building', title: 'New Building Project', desc: 'Fresh construction roof installation from newly erected trusses.' },
                        { id: 'Roof replacement', title: 'Roof Replacement / Renovation', desc: 'Replacing old corrugated sheets, asbestos, or damaged existing roof.' }
                      ].map(item => (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, projectType: item.id as any })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            formData.projectType === item.id
                              ? 'border-amber-600 bg-amber-50/60 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-slate-900">{item.title}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              formData.projectType === item.id ? 'border-amber-600 bg-amber-600' : 'border-slate-300'
                            }`}>
                              {formData.projectType === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Building Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      What type of building are you roofing? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        'Bungalow',
                        'Duplex',
                        'Two-storey building',
                        'Commercial building',
                        'Other'
                      ].map(type => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, buildingType: type as any })}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            formData.buildingType === type
                              ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                          }`}
                        >
                          <span className="text-xs sm:text-sm block">{type}</span>
                        </button>
                      ))}
                    </div>

                    {formData.buildingType === 'Other' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Please specify (e.g. Church auditorium, School block, Filling station, Factory)"
                          value={formData.otherBuildingType}
                          onChange={e => setFormData({ ...formData, otherBuildingType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ROOFING INFORMATION */}
            {step === 3 && (
              <div className="p-6 sm:p-10 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-600" />
                    <span>Step 3: Roofing Materials & Drawings</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your preferred roofing sheet profile and specify dimensions or upload drawings.
                  </p>
                </div>

                {/* Preferred Roofing Sheet */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Preferred Roofing Sheet <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {ROOFING_SHEET_OPTIONS.map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, preferredSheet: opt.id as any })}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.preferredSheet === opt.id
                            ? 'border-amber-600 bg-amber-50/70 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">{opt.name}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                            formData.preferredSheet === opt.id ? 'border-amber-600 bg-amber-600' : 'border-slate-300'
                          }`}>
                            {formData.preferredSheet === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dimensions and Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Number of Bedrooms / Building Sections
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 Bedrooms, or 6 Flats, or 2 Halls"
                      value={formData.numberOfBedroomsOrSections}
                      onChange={e => setFormData({ ...formData, numberOfBedroomsOrSections: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Roof Style / Pitch
                    </label>
                    <select
                      value={formData.roofType}
                      onChange={e => setFormData({ ...formData, roofType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm bg-white"
                    >
                      <option value="Hip roof (standard pitched 4 sides)">Hip roof (pitched on 4 sides)</option>
                      <option value="Gable roof (2 slopes)">Gable roof (2 slopes)</option>
                      <option value="Mansard / Dutch Gable roof">Mansard / Dutch Gable roof</option>
                      <option value="Flat pitch / Skillion roof">Flat pitch / Modern lean-to roof</option>
                      <option value="Complex multi-hipped architectural design">Complex multi-hipped architectural design</option>
                      <option value="Not sure; need advice">Not sure; please recommend</option>
                    </select>
                  </div>
                </div>

                {/* Approximate Dimensions Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={formData.dimensionsKnown}
                      onChange={e => setFormData({ ...formData, dimensionsKnown: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-semibold">I know the approximate building / roof dimensions</span>
                  </label>

                  {formData.dimensionsKnown && (
                    <input
                      type="text"
                      placeholder="e.g. 18 meters length x 14 meters width, or 120ft x 80ft"
                      value={formData.approxDimensions}
                      onChange={e => setFormData({ ...formData, approxDimensions: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
                    />
                  )}
                </div>

                {/* Architectural Drawing / File Upload Box */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Do you have an Architectural Drawing or Roof Plan?
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Uploading your roof plan helps our quantity surveyor calculate exact sheet counts and prevent wastage.
                  </p>

                  {formData.hasArchitecturalDrawing ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="w-6 h-6 text-emerald-600" />
                        <div>
                          <div className="text-xs font-bold text-emerald-900">{formData.drawingFileName}</div>
                          <div className="text-[11px] text-emerald-700">Document ready for technical calculation</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-6 text-center transition-colors">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <label className="cursor-pointer text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 block">
                        <span>Click to upload roofing plan, architectural drawing or photo</span>
                        <input
                          type="file"
                          accept="image/*,.pdf,.dwg,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Supported: PDF, JPG, PNG (Max 15MB)
                      </span>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* STEP 4: ADDITIONAL REQUIREMENTS */}
            {step === 4 && (
              <div className="p-6 sm:p-10 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <span>Step 4: Additional Materials & Notes</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select any complementary roofing accessories, ceiling, or structural materials you will need.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Select All Materials to Include in Quotation:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MATERIAL_CHECKLIST.map(item => {
                      const selected = formData.additionalMaterials.includes(item);
                      return (
                        <div
                          key={item}
                          onClick={() => toggleMaterial(item)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            selected
                              ? 'border-amber-600 bg-amber-50 text-slate-900 font-semibold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{item}</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            selected ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-300'
                          }`}>
                            {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Additional Project Notes or Special Requests
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide any details about site accessibility, delivery timeline, specific color preferences, or contractor instructions..."
                    value={formData.additionalNotes}
                    onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW & FINAL SUBMISSION */}
            {step === 5 && (
              <div className="p-6 sm:p-10 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Step 5: Review & Submit Roofing Quote Request</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Please double-check your project summary before final submission.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 py-1 border-b border-slate-200">
                    <span className="text-slate-500">Contact:</span>
                    <span className="font-semibold text-slate-900">{formData.fullName} ({formData.phone})</span>
                  </div>
                  <div className="grid grid-cols-2 py-1 border-b border-slate-200">
                    <span className="text-slate-500">Site Location:</span>
                    <span className="font-semibold text-slate-900">{formData.city}, {formData.state} State</span>
                  </div>
                  <div className="grid grid-cols-2 py-1 border-b border-slate-200">
                    <span className="text-slate-500">Building Type:</span>
                    <span className="font-semibold text-slate-900">{formData.buildingType} ({formData.projectType})</span>
                  </div>
                  <div className="grid grid-cols-2 py-1 border-b border-slate-200">
                    <span className="text-slate-500">Preferred Sheet:</span>
                    <span className="font-semibold text-amber-800">{formData.preferredSheet}</span>
                  </div>
                  <div className="grid grid-cols-2 py-1 border-b border-slate-200">
                    <span className="text-slate-500">Included Materials:</span>
                    <span className="font-semibold text-slate-800">
                      {formData.additionalMaterials.join(', ') || 'Roofing sheets only'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 py-1">
                    <span className="text-slate-500">Plan Uploaded:</span>
                    <span className="font-semibold text-slate-800">
                      {formData.hasArchitecturalDrawing ? formData.drawingFileName : 'None (Will send later via WhatsApp)'}
                    </span>
                  </div>
                </div>

                {/* Important Review Disclaimer */}
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-600 leading-relaxed">
                  <strong>Notice:</strong> Your quotation request will be evaluated by our technical estimating department to verify truss spans and accessories. A transparent quotation schedule will be sent to your phone and WhatsApp.
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING ESTIMATE TO SALES DESK...</span>
                    ) : (
                      <>
                        <span>SUBMIT MY ROOFING QUOTE REQUEST</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            {step < 5 && (
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Continue to Step {step + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <span className="text-xs text-slate-400">Step 5 of 5</span>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};
