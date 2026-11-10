import { Product, ProductCategory, BusinessSettings, RoofingQuoteRequest, ProductEnquiry } from '../types';

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const INITIAL_SETTINGS: BusinessSettings = {
  companyName: 'Building Moms Nigeria',
  tagline: 'Quality Building Materials for Every Construction Project',
  phone: '+2349061499920',
  whatsapp: '+2349061499920',
  email: 'buildingmomsnigeria@gmail.com',
  address: 'Shop 258A, line 2, Timber Shed Market, Uwani Enugu South LGA, Enugu State',
  businessHours: 'Monday – Saturday: 8:00 AM – 5:30 PM (Sunday: Closed)',
  primaryDepotCity: 'Timber Shed Market, Uwani, Enugu South, Enugu State',
  deliveryCoverage: 'Nationwide Delivery across Enugu, South-East, Lagos, Abuja, and all Nigerian States'
};

export const INITIAL_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-roofing-sheets',
    name: 'Roofing Sheets',
    slug: 'roofing-sheets',
    description: 'Long-span aluminium, step-tile, stone-coated metal roofing tiles, and Metcoppo profiles for residential and commercial roofs.',
    image: '/assets/aistudio/roof_tiles_3f4d4001.webp',
    popularItems: ['0.50mm Long-Span Aluminium', '0.55mm Step-Tile Profile', 'Stone-Coated Bond / Shingle']
  },
  {
    id: 'cat-iron-rods',
    name: 'Iron Rods & Rebars',
    slug: 'iron-rods',
    description: 'High-yield certified deformed reinforcement steel rebars for foundations, pillars, lintels, and structural slabs.',
    image: '/src/assets/images/category_iron_rods_1793631189292.jpg',
    popularItems: ['12mm High-Yield Rebar', '16mm Pillar Steel Rods', '10mm Slab Reinforcement']
  },
  {
    id: 'cat-cement-blocks',
    name: 'Cement & Building Blocks',
    slug: 'cement-blocks',
    description: 'Original 50kg standard Portland cement bags and precision machine-vibrated solid and hollow concrete masonry blocks.',
    image: '/src/assets/images/category_cement_blocks_1793631190688.jpg',
    popularItems: ['50kg Portland Cement Grade 42.5', '9-inch Solid Vibrated Blocks', '6-inch Hollow Partition Blocks']
  },
  {
    id: 'cat-roofing-accessories',
    name: 'Roofing Accessories',
    slug: 'roofing-accessories',
    description: 'Aluminium ridge caps, side flashings, valley gutters, water sealants, and self-tapping roofing screws with washers.',
    image: '/assets/aistudio/roofing_accessories_6b06760a.webp',
    popularItems: ['Aluminium Ridge Caps (0.50mm)', 'Valley Gutters', 'Heavy-Duty Screws with Washers']
  },
  {
    id: 'cat-nails-binding',
    name: 'Nails & Binding Wire',
    slug: 'nails-binding',
    description: 'Galvanized roofing nails with umbrella washers, concrete steel nails, carpentry nails, and annealed binding wire.',
    image: '/src/assets/images/category_roofing_accessories_1793631190788.jpg',
    popularItems: ['3" Umbrella Roofing Nails', '25kg Annealed Binding Wire', 'Assorted Carpentry Wire Nails']
  },
  {
    id: 'cat-construction-woods',
    name: 'Construction Woods & Timber',
    slug: 'construction-woods',
    description: 'Quality hardwood, softwood timber, roof trusses, purlins, facia boards, and formwork planks sourced from top timber mills.',
    image: '/assets/images/category_timber_woods.jpg',
    popularItems: ['2x4 Hardwood Timber', '2x6 Roof Rafters & Purlins', '1x12 Formwork & Facia Planks']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-ls-050-alum',
    name: '0.50mm Long-Span Aluminium Roofing Sheet',
    categoryId: 'cat-roofing-sheets',
    categoryName: 'Roofing Sheets',
    description: 'Industrial-grade corrosion-resistant aluminium sheet cut to custom pitch lengths with leak-proof overlaps.',
    fullDescription: 'Our 0.50mm Long-Span Aluminium Roofing Sheet is engineered for durability under harsh tropical weather. Roll-formed from premium alloy with baked fluorocarbon enamel coating, it resists rust, tropical rainstorms, and intense UV degradation. Cut to the exact ridge-to-eaves length of your building to eliminate transverse joints and leakage points.',
    specifications: [
      { label: 'Thickness Gauge', value: '0.50mm (Actual Micrometer Verified)' },
      { label: 'Profile Width', value: '1,000mm Effective Cover Width' },
      { label: 'Material Alloy', value: 'Aluminium-Manganese Premium Alloy' },
      { label: 'Surface Finish', value: 'Baked Polished / Matte Coil Coated' },
      { label: 'Standard Length', value: 'Custom rolled to project dimensions (1m - 12m)' }
    ],
    availableSizes: ['Custom Lengths Cut to Specification', '0.45mm gauge', '0.50mm gauge', '0.55mm gauge'],
    colors: ['Charcoal Black', 'Terracotta Red', 'Nut Brown', 'Dark Wine', 'Forest Green', 'Traffic Grey'],
    price: '', // Fluctuating market rate
    priceNote: 'Quote based on current coil market rate & custom cut lengths',
    inStock: true,
    image: '/src/assets/images/category_roofing_sheets_1793631188773.jpg',
    unit: 'Per Meter / Square Meter',
    featured: true
  },
  {
    id: 'prod-steptile-055',
    name: '0.55mm Step-Tile Aluminium Roofing Sheet',
    categoryId: 'cat-roofing-sheets',
    categoryName: 'Roofing Sheets',
    description: 'Architectural tile-look aluminium sheet offering the timeless elegance of roof tiles with lightweight durability.',
    fullDescription: 'Step-Tile profile sheets combine the aesthetic prestige of traditional clay or concrete roof tiles with the lightweight, rust-free endurance of heavy 0.55mm aluminium. Ideal for contemporary Nigerian duplexes, bungalows, and executive estates.',
    specifications: [
      { label: 'Thickness Gauge', value: '0.55mm Structural Grade' },
      { label: 'Step Height', value: '25mm Distinct Decorative Step' },
      { label: 'Overlap Protection', value: 'Capillary Groove Anti-Siphon Channel' },
      { label: 'Coating', value: 'High-Durability Polyester Powder Finish' }
    ],
    availableSizes: ['0.50mm gauge', '0.55mm gauge'],
    colors: ['Chocolate Brown', 'Midnight Black', 'Terracotta Red', 'Wine Red'],
    price: '',
    priceNote: 'Supplied cut to roof truss specifications',
    inStock: true,
    image: '/src/assets/images/hero_roofing_construction_1793631189514.jpg',
    unit: 'Per Meter Run',
    featured: true
  },
  {
    id: 'prod-stone-coated-bond',
    name: 'Stone-Coated Metal Roofing Tiles (Bond Profile)',
    categoryId: 'cat-roofing-sheets',
    categoryName: 'Roofing Sheets',
    description: 'Interlocking 50-year durability stone-coated aluzinc roof tiles with natural non-fading basalt granules.',
    fullDescription: 'Stone-Coated Metal Roofing Tiles represent the pinnacle of residential roofing prestige in Nigeria. Made with an Aluzinc core (55% aluminium, 43.4% zinc, 1.6% silicon), acrylic resin primer, and non-fading natural volcanic basalt stone chips. Offers exceptional acoustic sound deadening during torrential rain, thermal insulation, and interlocking wind-shear resistance.',
    specifications: [
      { label: 'Base Substrate', value: 'Aluzinc Galvalume Steel Core' },
      { label: 'Tile Dimensions', value: '1,340mm x 420mm' },
      { label: 'Effective Coverage', value: '1,280mm x 370mm (2.1 tiles/m²)' },
      { label: 'Weight', value: 'Approx. 2.8kg per tile' },
      { label: 'Warranty Rating', value: '50-Year Manufacturer Weather Resistance' }
    ],
    availableSizes: ['Bond Profile', 'Classic Profile', 'Shingle Profile', 'Roman Profile', 'Milano Profile'],
    colors: ['Black Stone', 'Coffee Brown', 'Terracotta Red', 'Patch Green', 'Charcoal Grey'],
    price: '',
    priceNote: 'Priced per piece / pallet quantity',
    inStock: true,
    image: '/assets/aistudio/roof_tiles_3f4d4001.webp',
    unit: 'Per Tile Piece',
    featured: true
  },
  {
    id: 'prod-iron-rod-12mm',
    name: '12mm High-Yield Deformed Steel Rebar (BS 4449 Standard)',
    categoryId: 'cat-iron-rods',
    categoryName: 'Iron Rods & Rebars',
    description: 'Standard 12mm certified structural rebar with high yield tensile strength for beams, columns, and decking.',
    fullDescription: 'Our 12mm High-Yield Deformed Steel Rebars are certified to BS 4449 / NIS 117 Nigerian industrial standards. Produced with uniform ribbing patterns for optimal concrete bonding, preventing slip and structural crack propagation in decking slabs and beam reinforcements.',
    specifications: [
      { label: 'Nominal Diameter', value: '12mm' },
      { label: 'Standard Length', value: '12 meters per length' },
      { label: 'Yield Strength', value: '500 MPa High-Yield' },
      { label: 'Pieces per Tonne', value: 'Approx. 93 - 94 full lengths' },
      { label: 'Certification', value: 'SON / NIS Certified Structural Grade' }
    ],
    availableSizes: ['12 meters standard length'],
    price: '',
    priceNote: 'Direct mill rate per tonne or per length',
    inStock: true,
    image: '/src/assets/images/category_iron_rods_1793631189292.jpg',
    unit: 'Per Length / Per Tonne',
    featured: true
  },
  {
    id: 'prod-iron-rod-16mm',
    name: '16mm High-Yield Deformed Steel Rebar (Pillar & Foundation)',
    categoryId: 'cat-iron-rods',
    categoryName: 'Iron Rods & Rebars',
    description: 'Heavy 16mm structural rebar for foundation footings, raft foundations, and structural building columns.',
    fullDescription: 'Engineered for high-load bearing structural components including raft foundations, ground beams, and multi-storey columns. Rigorously tested for ductile elongation and yield strength.',
    specifications: [
      { label: 'Nominal Diameter', value: '16mm' },
      { label: 'Standard Length', value: '12 meters per length' },
      { label: 'Yield Strength', value: 'Grade 500 High-Yield Deformed' },
      { label: 'Pieces per Tonne', value: 'Approx. 52 - 53 lengths' }
    ],
    availableSizes: ['12 meters standard length'],
    price: '',
    priceNote: 'Bulk truckload or retail bundle prices available',
    inStock: true,
    image: '/src/assets/images/category_iron_rods_1793631189292.jpg',
    unit: 'Per Length / Per Tonne',
    featured: true
  },
  {
    id: 'prod-iron-rod-10mm',
    name: '10mm High-Yield Reinforcement Rebar (Decking & Lintels)',
    categoryId: 'cat-iron-rods',
    categoryName: 'Iron Rods & Rebars',
    description: '10mm deformed structural steel bars essential for floor slabs, oversite concrete, and window lintels.',
    fullDescription: 'Standard 10mm reinforcement steel bar. Clean surface, consistent ribbed deformation, high ductility for cold bending on construction sites without brittle fracture.',
    specifications: [
      { label: 'Nominal Diameter', value: '10mm' },
      { label: 'Standard Length', value: '12 meters' },
      { label: 'Pieces per Tonne', value: 'Approx. 135 lengths' }
    ],
    availableSizes: ['12 meters standard length'],
    price: '',
    priceNote: 'Available per piece or ton bundle',
    inStock: true,
    image: '/src/assets/images/category_iron_rods_1793631189292.jpg',
    unit: 'Per Length / Per Tonne',
    featured: false
  },
  {
    id: 'prod-cement-50kg',
    name: 'Standard 50kg Portland Limestone Cement (Grade 42.5R)',
    categoryId: 'cat-cement-blocks',
    categoryName: 'Cement & Building Blocks',
    description: 'High-early strength 50kg Portland cement for structural casting, columns, beams, and block laying.',
    fullDescription: 'Premium fresh stock 50kg Portland Limestone Cement (Grade 42.5R). Perfect for high-strength concrete mixes, cast-in-place slabs, structural beams, and smooth plastering. Sourced directly from major certified production plants in Nigeria.',
    specifications: [
      { label: 'Bag Weight', value: '50kg Net Weight' },
      { label: 'Strength Grade', value: 'Grade 42.5R (High Early Strength)' },
      { label: 'Packaging', value: 'Multi-ply moisture-resistant paper bag' },
      { label: 'Standard Compliance', value: 'NIS 444-1:2014 & EN 197-1' }
    ],
    availableSizes: ['50kg bag (Single bag, pallet, or trailer load: 600/900 bags)'],
    price: '',
    priceNote: 'Direct warehouse pickup or site trailer dispatch rate',
    inStock: true,
    image: '/src/assets/images/category_cement_blocks_1793631190688.jpg',
    unit: 'Per 50kg Bag / Trailer Load',
    featured: true
  },
  {
    id: 'prod-solid-block-9inch',
    name: '9-inch Solid Vibrated Concrete Building Blocks',
    categoryId: 'cat-cement-blocks',
    categoryName: 'Cement & Building Blocks',
    description: 'Heavy-density hydraulic machine-vibrated solid blocks for foundation footing and perimeter load-bearing walls.',
    fullDescription: 'Molded using heavy hydraulic vibration machines with clean sharp sand, granite dust, and genuine cement content. Cured for a minimum of 14 days to achieve maximum compressive strength.',
    specifications: [
      { label: 'Block Dimensions', value: '9" x 9" x 18" (225mm x 225mm x 450mm)' },
      { label: 'Composition', value: 'Machine-Vibrated Concrete Solid' },
      { label: 'Compressive Strength', value: 'Certified load-bearing grade' }
    ],
    availableSizes: ['9" Solid', '9" Hollow', '6" Solid', '6" Hollow'],
    price: '',
    priceNote: 'Volume discounts for site delivery orders',
    inStock: true,
    image: '/src/assets/images/category_cement_blocks_1793631190688.jpg',
    unit: 'Per Block Piece',
    featured: false
  },
  {
    id: 'prod-roofing-nails-umbrella',
    name: 'Galvanized Roofing Nails with Umbrella Washers',
    categoryId: 'cat-nails-binding',
    categoryName: 'Nails & Binding Wire',
    description: 'Weatherproof zinc-coated 3" roofing nails with wide umbrella heads to prevent roof leakages.',
    fullDescription: 'Electro-galvanized high-carbon steel roofing nails featuring an integrated oversized umbrella washer head and twisted shank. The wide head firmly clamps aluminium and corrugated sheets against timber purlins while preventing water penetration.',
    specifications: [
      { label: 'Length', value: '3.0 inches (75mm)' },
      { label: 'Coating', value: 'Hot-Dip Galvanized Zinc' },
      { label: 'Head Type', value: 'Wide Umbrella Head with Rubber Washer' },
      { label: 'Packaging', value: 'Sold in 50kg bags or retail packs' }
    ],
    availableSizes: ['2.5 inch', '3.0 inch', '3.5 inch'],
    price: '',
    priceNote: 'Sold per 50kg sack or retail packets',
    inStock: true,
    image: '/src/assets/images/category_roofing_accessories_1793631190788.jpg',
    unit: 'Per Bag / Box',
    featured: false
  },
  {
    id: 'prod-binding-wire-25kg',
    name: 'Annealed Galvanized Binding Wire (25kg Roll)',
    categoryId: 'cat-nails-binding',
    categoryName: 'Nails & Binding Wire',
    description: 'Flexible soft-annealed steel wire for tying reinforcement iron rods and stirrups firmly on site.',
    fullDescription: 'Pliable 16-gauge soft black annealed steel wire. Treated with uniform heat annealing to allow easy twisting with tying pliers without snapping under tension.',
    specifications: [
      { label: 'Wire Gauge', value: 'Gauge 16 / 1.6mm' },
      { label: 'Roll Weight', value: '25kg Standard Bundle' },
      { label: 'Tensile Ductility', value: 'Soft Annealed High Flexibility' }
    ],
    availableSizes: ['25kg full bundle', 'Retail small coils'],
    price: '',
    priceNote: 'Standard bundle pricing',
    inStock: true,
    image: '/src/assets/images/category_roofing_accessories_1793631190788.jpg',
    unit: 'Per 25kg Roll',
    featured: false
  },
  {
    id: 'prod-ridge-caps-050',
    name: 'Aluminium Roof Ridge Caps & Valley Gutters (0.50mm)',
    categoryId: 'cat-roofing-accessories',
    categoryName: 'Roofing Accessories',
    description: 'Matching profile ridge caps, parapet flashings, and valley gutters to seal joints and prevent leaks.',
    fullDescription: 'Precision folded 0.50mm aluminium ridge caps engineered to cap the highest peaks and hips of your roof structure. Available in matching colors to seamlessly match long-span, step-tile, or corrugated sheets.',
    specifications: [
      { label: 'Length', value: '1.2 meters to 2.4 meters standard' },
      { label: 'Girth', value: '450mm unfolded girth' },
      { label: 'Thickness', value: '0.50mm / 0.55mm aluminium' }
    ],
    availableSizes: ['Standard Ridge Cap', 'Step-Tile Valley Gutter', 'Side Wall Flashing'],
    colors: ['Charcoal Black', 'Terracotta Red', 'Nut Brown', 'Wine Red'],
    price: '',
    priceNote: 'Per piece to match sheet color',
    inStock: true,
    image: '/assets/aistudio/roofing_accessories_6b06760a.webp',
    unit: 'Per Piece',
    featured: false
  },
  {
    id: 'prod-hardwood-2x4',
    name: '2x4 Hardwood Roof Truss & Framing Timber (12ft - 18ft)',
    categoryId: 'cat-construction-woods',
    categoryName: 'Construction Woods & Timber',
    description: 'Well-seasoned, untreated and treated structural hardwood timber for roof trusses, purlins, and wall framing.',
    fullDescription: 'High-strength structural hardwood timber selected specifically for roofing trusses, carcass framing, and load-bearing ceiling structures. Sourced directly from verified timber mills at Timber Shed Market with consistent cross-sectional sizing and minimal warp.',
    specifications: [
      { label: 'Dimensions', value: '2 inches x 4 inches (Actual Cut)' },
      { label: 'Available Lengths', value: '12 feet, 14 feet, 16 feet, 18 feet' },
      { label: 'Wood Grade', value: 'Seasoned Hardwood (Obeche / Mahogany / Hardwood)' },
      { label: 'Common Use', value: 'Roof trusses, king posts, purlins, wall framing' }
    ],
    availableSizes: ['12ft Length', '14ft Length', '16ft Length', '18ft Length'],
    colors: ['Natural Timber'],
    price: '',
    priceNote: 'Current Timber Shed daily market rate based on quantity and length',
    inStock: true,
    image: '/assets/images/category_timber_woods.jpg',
    unit: 'Per Piece / Length',
    featured: true
  },
  {
    id: 'prod-hardwood-2x6',
    name: '2x6 Structural Roof Rafters & Beams',
    categoryId: 'cat-construction-woods',
    categoryName: 'Construction Woods & Timber',
    description: 'Heavy-duty 2x6 timber rafters engineered for long-span roof pitches, tie beams, and decking supports.',
    fullDescription: 'Engineered for optimal load capacity under concrete roof tiles and aluminium sheets. Delivers superior flexural resistance without sagging over time.',
    specifications: [
      { label: 'Dimensions', value: '2 inches x 6 inches' },
      { label: 'Available Lengths', value: '14 feet, 16 feet, 18 feet' },
      { label: 'Wood Grade', value: 'Heavy Structural Hardwood' },
      { label: 'Common Use', value: 'Tie beams, primary roof rafters, floor joists' }
    ],
    availableSizes: ['14ft Length', '16ft Length', '18ft Length'],
    colors: ['Natural Timber'],
    price: '',
    priceNote: 'Direct sawmill rate available on enquiry',
    inStock: true,
    image: '/assets/images/category_timber_woods.jpg',
    unit: 'Per Piece',
    featured: false
  },
  {
    id: 'prod-formwork-1x12',
    name: '1x12 Marine Board & Formwork Planks',
    categoryId: 'cat-construction-woods',
    categoryName: 'Construction Woods & Timber',
    description: 'Smooth, durable wooden boards for concrete formwork, columns, lintels, and facia finishing.',
    fullDescription: 'High-density wooden formwork planks designed to withstand wet concrete pressure during casting of pillars, lintels, decking, and beams without blowout or deformation.',
    specifications: [
      { label: 'Dimensions', value: '1 inch x 12 inches x 12 feet' },
      { label: 'Surface', value: 'Clean sawed / planed' },
      { label: 'Common Use', value: 'Concrete formwork, facia board, scaffolding' }
    ],
    availableSizes: ['1x12x12ft', '3/4 inch Marine Board 8x4ft'],
    colors: ['Natural Wood / Dark Brown'],
    price: '',
    priceNote: 'Volume discounts for site deliveries',
    inStock: true,
    image: '/assets/images/category_timber_woods.jpg',
    unit: 'Per Sheet / Plank',
    featured: true
  }
];

export const SAMPLE_INITIAL_QUOTES: RoofingQuoteRequest[] = [
  {
    id: 'BMN-RF-2026-1042',
    createdAt: '2026-10-31T14:22:00Z',
    status: 'New enquiry',
    customer: {
      fullName: 'Engr. Babatunde Adeleke',
      phone: '+234 802 334 1188',
      whatsapp: '+234 802 334 1188',
      email: 'babatunde.adeleke@gmail.com',
      state: 'Lagos',
      city: 'Lekki Phase 1'
    },
    building: {
      projectType: 'New building',
      buildingType: 'Duplex'
    },
    roofing: {
      dimensionsKnown: true,
      approxDimensions: '22m x 18m',
      numberOfBedroomsOrSections: '5-Bedroom Fully Detached Duplex with Penthouse',
      roofType: 'Hip & Valley pitched roof',
      preferredSheet: 'Stone-coated roofing sheets',
      hasArchitecturalDrawing: true,
      drawingFileName: 'Lekki_Duplex_Roof_Plan_Rev2.pdf'
    },
    additionalRequirements: {
      items: ['Roofing sheets', 'Roofing accessories', 'Roofing nails', 'Ceiling materials'],
      additionalNotes: 'Need genuine stone-coated tiles (black or coffee brown) with matching ridge caps and rain gutters. Delivery directly to site in Lekki Phase 1.'
    },
    adminNotes: 'Architectural drawings reviewed. Customer requested quotation for 420 pieces Bond stone-coated tiles + 38 ridge caps.'
  },
  {
    id: 'BMN-RF-2026-1039',
    createdAt: '2026-10-30T10:15:00Z',
    status: 'Quotation in progress',
    customer: {
      fullName: 'Mrs. Chidinma Okafor',
      phone: '+234 818 902 4431',
      whatsapp: '+234 818 902 4431',
      email: 'chidinma.okafor@yahoo.com',
      state: 'Ogun',
      city: 'Mowe / Ofada Corridor'
    },
    building: {
      projectType: 'New building',
      buildingType: 'Bungalow'
    },
    roofing: {
      dimensionsKnown: true,
      approxDimensions: '16m x 14m',
      numberOfBedroomsOrSections: '4-Bedroom Bungalow',
      roofType: 'Dutch Gable pitched',
      preferredSheet: '0.50mm Long-span aluminium roofing sheets' as any,
      hasArchitecturalDrawing: false
    },
    additionalRequirements: {
      items: ['Roofing sheets', 'Roofing nails', 'Roofing wood or trusses'],
      additionalNotes: 'Prefers charcoal black 0.50mm aluminium. Please include delivery and offloading cost.'
    },
    adminNotes: 'Measurements calculated based on 16m x 14m span. Prepared initial estimate.'
  }
];

export const SAMPLE_INITIAL_ENQUIRIES: ProductEnquiry[] = [
  {
    id: 'BMN-ENQ-2026-441',
    createdAt: '2026-11-01T09:40:00Z',
    status: 'Contacted',
    customerName: 'Arch. Femi Balogun',
    phone: '+234 803 551 2290',
    whatsapp: '+234 803 551 2290',
    email: 'femi.balogun@constructions.ng',
    productId: 'prod-iron-rod-16mm',
    productName: '16mm High-Yield Deformed Steel Rebar (Pillar & Foundation)',
    requiredQuantity: '15 Tonnes',
    deliveryLocation: {
      state: 'Oyo',
      city: 'Ibadan (Alakia Industrial Zone)'
    },
    additionalRequirements: 'Need certified mill test certificate and invoice for corporate construction firm.',
    adminNotes: 'Spoke with client on phone. Agreed to send mill test certificate.'
  },
  {
    id: 'BMN-ENQ-2026-438',
    createdAt: '2026-10-29T16:20:00Z',
    status: 'New enquiry',
    customerName: 'Alhaji Usman Garba',
    phone: '+234 812 770 9931',
    whatsapp: '+234 812 770 9931',
    productId: 'prod-cement-50kg',
    productName: 'Standard 50kg Portland Limestone Cement (Grade 42.5R)',
    requiredQuantity: '600 Bags (1 Full Trailer)',
    deliveryLocation: {
      state: 'FCT - Abuja',
      city: 'Gwarinpa Estate, Abuja'
    },
    additionalRequirements: 'Urgent site delivery required by weekend.',
    adminNotes: 'Direct factory trailer dispatch requested.'
  }
];
