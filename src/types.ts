export type Category = 
  | 'All'
  | 'Rings'
  | 'Necklaces'
  | 'Pendants'
  | 'Earrings'
  | 'Bracelets'
  | 'High Jewellery';

export type MetalType = 
  | 'All Metals'
  | '18K Yellow Gold'
  | '18K Rose Gold'
  | '18K White Gold'
  | '22K Heritage Gold'
  | 'Platinum 950';

export type GemstoneType = 
  | 'All Gemstones'
  | 'Natural Diamond'
  | 'Zambian Emerald'
  | 'Burmese Ruby'
  | 'Ceylon Sapphire'
  | 'South Sea Pearl'
  | 'Black Onyx';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  collection: string;
  category: 'Rings' | 'Necklaces' | 'Pendants' | 'Earrings' | 'Bracelets' | 'High Jewellery';
  price: number; // in INR
  originalPrice?: number;
  metal: string;
  metalPurity: string; // e.g. "18K (750)" or "22K (916)"
  grossWeight: number; // grams
  netGoldWeight: number; // grams
  gemstone: string;
  diamondCarats?: number;
  diamondClarity?: string; // e.g. "VVS1-VVS2"
  diamondColor?: string; // e.g. "E-F Colorless"
  diamondCut?: string; // e.g. "Triple Excellent Ideal"
  bisHallmarkNumber: string;
  inStock: boolean;
  stockCount: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  images: string[];
  videoUrl?: string;
  dimensions?: string;
  availableSizes?: string[];
}

export interface CartItem {
  id: string; // unique cart line id
  product: Product;
  quantity: number;
  selectedSize?: string;
  engravingText?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isGiftPackaging: boolean;
  giftMessage?: string;
}

export interface JewelleryCertificate {
  certificateNumber: string;
  orderNumber: string;
  issueDate: string;
  productId: string;
  productName: string;
  productImage: string;
  ownerName: string;
  metalType: string;
  metalPurity: string;
  grossWeightGrams: number;
  netGoldWeightGrams: number;
  bisHallmarkId: string;
  giaReportId?: string;
  diamondWeightCarats?: number;
  diamondCut?: string;
  diamondColor?: string;
  diamondClarity?: string;
  gemstoneDetails?: string;
  valuationINR: number;
  certifiedGemologist: string;
  qrVerificationCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  shipping: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  gstAmount: number; // 3% GST standard on luxury gold jewellery in India
  shippingCharge: number; // 0 for insured express shipping
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'emi';
  paymentReference: string;
  paymentStatus: 'Paid' | 'Processing';
  orderStatus: 'Processing' | 'BIS Hallmarked' | 'Dispatched' | 'Delivered';
  estimatedDeliveryDate: string;
  trackingNumber: string;
  certificates: JewelleryCertificate[];
}

export interface ProductFilters {
  searchQuery: string;
  category: Category;
  metal: MetalType;
  gemstone: GemstoneType;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'popular' | 'newest';
  inStockOnly: boolean;
}
