export type EnquiryStatus = 
  | 'New enquiry' 
  | 'Contacted' 
  | 'Quotation in progress' 
  | 'Quote sent' 
  | 'Order confirmed' 
  | 'Completed';

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
  popularItems: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  fullDescription: string;
  specifications: ProductSpecification[];
  availableSizes: string[];
  colors?: string[];
  price?: string; // Verified price e.g. "₦18,500" or empty if market-rate/on request
  priceNote?: string; // e.g. "Per square meter" or "Per 50kg bag" or "Market rate applies"
  inStock: boolean;
  image: string;
  unit: string;
  featured?: boolean;
}

export interface CustomerContact {
  fullName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  state: string;
  city: string;
}

export interface BuildingDetails {
  projectType: 'New building' | 'Roof replacement';
  buildingType: 'Bungalow' | 'Duplex' | 'Two-storey building' | 'Commercial building' | 'Other';
  otherBuildingType?: string;
}

export interface RoofingDetails {
  dimensionsKnown: boolean;
  approxDimensions?: string; // e.g. "15m x 20m"
  numberOfBedroomsOrSections: string;
  roofType: string; // e.g. "Gable roof", "Hip roof", "Mansard / Dutch", "Flat pitched", "Not sure"
  preferredSheet: 
    | 'Long-span aluminium roofing sheets'
    | 'Step-tile roofing sheets'
    | 'Stone-coated roofing sheets'
    | 'Metcoppo roofing sheets'
    | 'Aluzinc roofing sheets'
    | 'Not sure; I need professional guidance';
  hasArchitecturalDrawing: boolean;
  drawingFileName?: string;
  drawingFileDataUrl?: string; // Stored base64 preview for uploaded roofing plans
}

export interface AdditionalRequirements {
  items: string[]; // ['Roofing sheets', 'Roofing nails', 'Roofing accessories', 'Roofing wood or trusses', 'Fascia boards', 'Ceiling materials', 'Other materials']
  additionalNotes?: string;
}

export interface RoofingQuoteRequest {
  id: string; // e.g. BMN-RF-1042
  createdAt: string;
  status: EnquiryStatus;
  customer: CustomerContact;
  building: BuildingDetails;
  roofing: RoofingDetails;
  additionalRequirements: AdditionalRequirements;
  adminNotes?: string;
  estimatedTotalNaira?: number;
}

export interface ProductEnquiry {
  id: string; // e.g. BMN-ENQ-2083
  createdAt: string;
  status: EnquiryStatus;
  customerName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  productId: string;
  productName: string;
  requiredQuantity: string;
  deliveryLocation: {
    state: string;
    city: string;
  };
  additionalRequirements?: string;
  adminNotes?: string;
}

export interface BusinessSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  primaryDepotCity: string;
  deliveryCoverage: string;
}
