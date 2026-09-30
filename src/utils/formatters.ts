import { CartItem, JewelleryCertificate, Order, Product, ShippingAddress } from '../types';

export type Currency = 'INR' | 'AED' | 'USD' | 'GBP';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rateFromAED: number; label: string }> = {
  INR: { symbol: '₹', rateFromAED: 22.8, label: 'INR' },
  AED: { symbol: 'Dhs.', rateFromAED: 1, label: 'AED' },
  USD: { symbol: '$', rateFromAED: 0.272, label: 'USD' },
  GBP: { symbol: '£', rateFromAED: 0.215, label: 'GBP' }
};

export function formatPrice(amountInAED: number, currency: Currency = 'INR'): string {
  const meta = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = amountInAED * meta.rateFromAED;
  
  if (currency === 'INR') {
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  }
  if (currency === 'AED') {
    return `Dhs. ${converted.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AED`;
  }
  if (currency === 'USD') {
    return `$${Math.round(converted).toLocaleString('en-US')}`;
  }
  return `£${Math.round(converted).toLocaleString('en-GB')}`;
}

export function formatINR(amount: number): string {
  return formatPrice(amount, 'INR');
}

export function generateOrderNumber(): string {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `SUB-2026-${randomDigits}`;
}

export function generateTrackingNumber(): string {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `EXP-SUB-DXB-${randomSuffix}`;
}

export function generateCertificate(product: Product, orderNumber: string, ownerName: string): JewelleryCertificate {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const certNumber = `SUB-CERT-2026-${randomNum}`;
  const giaId = product.diamondCarats ? `GIA-DXB-${Math.floor(2000000 + Math.random() * 8000000)}` : undefined;

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return {
    certificateNumber: certNumber,
    orderNumber,
    issueDate: todayStr,
    productId: product.id,
    productName: product.name,
    productImage: product.images[0],
    ownerName: ownerName || 'Valued Collector',
    metalType: product.metal,
    metalPurity: product.metalPurity,
    grossWeightGrams: product.grossWeight,
    netGoldWeightGrams: product.netGoldWeight,
    bisHallmarkId: product.bisHallmarkNumber,
    giaReportId: giaId,
    diamondWeightCarats: product.diamondCarats,
    diamondCut: product.diamondCut || 'Triple Excellent Ideal',
    diamondColor: product.diamondColor || 'E-F Exceptional White',
    diamondClarity: product.diamondClarity || 'VVS1 Superior',
    gemstoneDetails: product.gemstone,
    valuationINR: product.price,
    certifiedGemologist: 'S. Al-Mansoor, FGA, GIA Graduate Gemologist',
    qrVerificationCode: `https://subha.luxury/verify?cert=${certNumber}&sku=${product.id}`
  };
}

export function getEstimatedDeliveryDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
