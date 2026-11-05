import { RoofingQuoteRequest, ProductEnquiry } from '../types';

/**
 * Normalizes phone number into international WhatsApp format (e.g. 2348140007890)
 */
export function normalizeWhatsAppNumber(phone: string): string {
  // Strip non-digits
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('234')) {
    return digits;
  }
  if (digits.startsWith('0')) {
    return '234' + digits.substring(1);
  }
  if (digits.length === 10) {
    return '234' + digits;
  }
  return digits;
}

/**
 * Creates general WhatsApp enquiry link
 */
export function createGeneralWhatsAppLink(companyWhatsApp: string, initialMessage?: string): string {
  const number = normalizeWhatsAppNumber(companyWhatsApp);
  const text = initialMessage || 'Hello Building Moms Nigeria! I would like to make an enquiry about your building and roofing materials.';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates formatted WhatsApp link for a submitted Roofing Quote Request
 */
export function createRoofingQuoteWhatsAppLink(companyWhatsApp: string, quote: RoofingQuoteRequest): string {
  const number = normalizeWhatsAppNumber(companyWhatsApp);
  const drawingNote = quote.roofing.hasArchitecturalDrawing
    ? `\n*Architectural Drawing:* Yes (${quote.roofing.drawingFileName || 'Uploaded'})`
    : `\n*Architectural Drawing:* Not yet available`;

  const materialsList = quote.additionalRequirements.items.length > 0
    ? quote.additionalRequirements.items.join(', ')
    : 'Roofing sheets only';

  const message = 
`*NEW ROOFING QUOTATION REQUEST*
*Reference ID:* ${quote.id}

*Customer Details:*
• *Name:* ${quote.customer.fullName}
• *Phone:* ${quote.customer.phone}
• *Location:* ${quote.customer.city}, ${quote.customer.state} State

*Building Information:*
• *Project:* ${quote.building.projectType}
• *Building Type:* ${quote.building.buildingType}
• *Sections/Rooms:* ${quote.roofing.numberOfBedroomsOrSections}
• *Dimensions:* ${quote.roofing.approxDimensions || 'To be measured'}

*Roofing Specifications:*
• *Roof Style:* ${quote.roofing.roofType}
• *Preferred Sheet:* ${quote.roofing.preferredSheet}${drawingNote}

*Required Materials:*
${materialsList}
${quote.additionalRequirements.additionalNotes ? `\n*Notes:* ${quote.additionalRequirements.additionalNotes}` : ''}

_Submitted via buildingmomsnigeria.com online quotation portal._`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates formatted WhatsApp link for a Product Price Request
 */
export function createProductEnquiryWhatsAppLink(companyWhatsApp: string, enquiry: ProductEnquiry): string {
  const number = normalizeWhatsAppNumber(companyWhatsApp);
  const message =
`*PRODUCT PRICE & AVAILABILITY ENQUIRY*
*Reference:* ${enquiry.id}

*Item Requested:* ${enquiry.productName}
*Required Quantity:* ${enquiry.requiredQuantity}

*Customer:* ${enquiry.customerName}
*Phone:* ${enquiry.phone}
*Delivery Destination:* ${enquiry.deliveryLocation.city}, ${enquiry.deliveryLocation.state} State

${enquiry.additionalRequirements ? `*Additional Notes:* ${enquiry.additionalRequirements}\n` : ''}
_Please provide current price quotation and delivery timeframe._`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates WhatsApp response link from Admin to Customer
 */
export function createAdminToCustomerWhatsAppLink(customerPhone: string, quoteRef: string, customerName: string): string {
  const number = normalizeWhatsAppNumber(customerPhone);
  const message = `Hello ${customerName}, this is Building Moms Nigeria regarding your quotation request (${quoteRef}). We are ready with your material estimate.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
