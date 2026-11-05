import { Product, ProductCategory, BusinessSettings, RoofingQuoteRequest, ProductEnquiry, EnquiryStatus } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SETTINGS, SAMPLE_INITIAL_QUOTES, SAMPLE_INITIAL_ENQUIRIES } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'bmn_products_v1',
  CATEGORIES: 'bmn_categories_v1',
  SETTINGS: 'bmn_settings_v1',
  ROOFING_QUOTES: 'bmn_roofing_quotes_v1',
  PRODUCT_ENQUIRIES: 'bmn_product_enquiries_v1',
  ADMIN_AUTH: 'bmn_admin_auth_v1'
};

// Custom event for cross-component reactive updates
const DATA_CHANGE_EVENT = 'bmn_data_change';

function triggerChange(type: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DATA_CHANGE_EVENT, { detail: { type } }));
  }
}

export function subscribeToDataChanges(callback: (type: string) => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail?.type || 'all');
  };
  window.addEventListener(DATA_CHANGE_EVENT, handler);
  return () => window.removeEventListener(DATA_CHANGE_EVENT, handler);
}

// ---------------- PRODUCTS ----------------
export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed: Product[] = JSON.parse(raw);
    let changed = false;
    const filtered = parsed.filter(p => 
      p.categoryId !== 'cat-plumbing-materials' && 
      p.categoryId !== 'cat-electrical-materials' &&
      p.categoryId !== 'cat-ceiling-materials' &&
      p.id !== 'prod-roofing-screws-hex'
    );
    if (filtered.length !== parsed.length) {
      changed = true;
    }
    const updated = filtered.map(p => {
      if (p.id === 'prod-stone-coated-bond' && p.image !== '/assets/aistudio/roof_tiles_3f4d4001.webp') {
        changed = true;
        return { ...p, image: '/assets/aistudio/roof_tiles_3f4d4001.webp' };
      }
      if (p.id === 'prod-ridge-caps-050' && p.image !== '/assets/aistudio/roofing_accessories_6b06760a.webp') {
        changed = true;
        return { ...p, image: '/assets/aistudio/roofing_accessories_6b06760a.webp' };
      }
      return p;
    });
    if (changed) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    }
    return updated;
  } catch (e) {
    console.error('Error reading products', e);
    return INITIAL_PRODUCTS;
  }
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function saveProduct(product: Product): void {
  const current = getProducts();
  const index = current.findIndex(p => p.id === product.id);
  let updated: Product[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = product;
  } else {
    updated = [product, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  triggerChange('products');
}

export function deleteProduct(id: string): void {
  const current = getProducts();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  triggerChange('products');
}

// ---------------- CATEGORIES ----------------
export function getCategories(): ProductCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    const parsed: ProductCategory[] = JSON.parse(raw);
    let changed = false;
    const filtered = parsed.filter(c => 
      c.id !== 'cat-plumbing-materials' && 
      c.id !== 'cat-electrical-materials' &&
      c.id !== 'cat-ceiling-materials'
    );
    if (filtered.length !== parsed.length) {
      changed = true;
    }
    const updated = filtered.map(c => {
      if (c.id === 'cat-roofing-sheets' && c.image !== '/assets/aistudio/roof_tiles_3f4d4001.webp') {
        changed = true;
        return { ...c, image: '/assets/aistudio/roof_tiles_3f4d4001.webp' };
      }
      if (c.id === 'cat-roofing-accessories' && c.image !== '/assets/aistudio/roofing_accessories_6b06760a.webp') {
        changed = true;
        return { ...c, image: '/assets/aistudio/roofing_accessories_6b06760a.webp' };
      }
      return c;
    });
    if (changed) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    }
    return updated;
  } catch (e) {
    console.error('Error reading categories', e);
    return INITIAL_CATEGORIES;
  }
}

export function saveCategory(category: ProductCategory): void {
  const current = getCategories();
  const index = current.findIndex(c => c.id === category.id);
  let updated: ProductCategory[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = category;
  } else {
    updated = [...current, category];
  }
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
  triggerChange('categories');
}

// ---------------- ROOFING QUOTES ----------------
export function getRoofingQuotes(): RoofingQuoteRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROOFING_QUOTES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ROOFING_QUOTES, JSON.stringify(SAMPLE_INITIAL_QUOTES));
      return SAMPLE_INITIAL_QUOTES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading quotes', e);
    return SAMPLE_INITIAL_QUOTES;
  }
}

export function saveRoofingQuote(quote: RoofingQuoteRequest): void {
  const current = getRoofingQuotes();
  const updated = [quote, ...current];
  localStorage.setItem(STORAGE_KEYS.ROOFING_QUOTES, JSON.stringify(updated));
  triggerChange('quotes');
}

export function updateQuoteStatus(id: string, status: EnquiryStatus, adminNotes?: string): void {
  const current = getRoofingQuotes();
  const updated = current.map(q => {
    if (q.id === id) {
      return {
        ...q,
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {})
      };
    }
    return q;
  });
  localStorage.setItem(STORAGE_KEYS.ROOFING_QUOTES, JSON.stringify(updated));
  triggerChange('quotes');
}

// ---------------- PRODUCT ENQUIRIES ----------------
export function getProductEnquiries(): ProductEnquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCT_ENQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCT_ENQUIRIES, JSON.stringify(SAMPLE_INITIAL_ENQUIRIES));
      return SAMPLE_INITIAL_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading enquiries', e);
    return SAMPLE_INITIAL_ENQUIRIES;
  }
}

export function saveProductEnquiry(enquiry: ProductEnquiry): void {
  const current = getProductEnquiries();
  const updated = [enquiry, ...current];
  localStorage.setItem(STORAGE_KEYS.PRODUCT_ENQUIRIES, JSON.stringify(updated));
  triggerChange('enquiries');
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus, adminNotes?: string): void {
  const current = getProductEnquiries();
  const updated = current.map(e => {
    if (e.id === id) {
      return {
        ...e,
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {})
      };
    }
    return e;
  });
  localStorage.setItem(STORAGE_KEYS.PRODUCT_ENQUIRIES, JSON.stringify(updated));
  triggerChange('enquiries');
}

// ---------------- SETTINGS ----------------
export function getSettings(): BusinessSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    // Migrate if previously stored numbers, email or address were old placeholders
    if (
      parsed.phone === '+234 803 000 4567' || 
      parsed.whatsapp === '+234 814 000 7890' ||
      parsed.email === 'info@buildingmomsnigeria.com' ||
      parsed.address?.includes('Lagos-Ibadan') ||
      !parsed.email ||
      !parsed.address
    ) {
      parsed.phone = INITIAL_SETTINGS.phone;
      parsed.whatsapp = INITIAL_SETTINGS.whatsapp;
      parsed.email = INITIAL_SETTINGS.email;
      parsed.address = INITIAL_SETTINGS.address;
      parsed.primaryDepotCity = INITIAL_SETTINGS.primaryDepotCity;
      parsed.deliveryCoverage = INITIAL_SETTINGS.deliveryCoverage;
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: BusinessSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  triggerChange('settings');
}

// ---------------- ADMIN AUTH ----------------
export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch (e) {
    return false;
  }
}

export function setAdminAuthenticated(val: boolean): void {
  try {
    if (val) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
    triggerChange('auth');
  } catch (e) {
    console.error('Auth storage error', e);
  }
}

// ---------------- EXPORT / BACKUP ----------------
export function exportAllDataJSON(): string {
  const payload = {
    exportDate: new Date().toISOString(),
    settings: getSettings(),
    categories: getCategories(),
    products: getProducts(),
    roofingQuotes: getRoofingQuotes(),
    productEnquiries: getProductEnquiries()
  };
  return JSON.stringify(payload, null, 2);
}

export function resetToDefaults(): void {
  localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.ROOFING_QUOTES);
  localStorage.removeItem(STORAGE_KEYS.PRODUCT_ENQUIRIES);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  triggerChange('all');
}
