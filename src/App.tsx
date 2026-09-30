import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, Category, JewelleryCertificate } from './types';
import { INITIAL_PRODUCTS } from './data/mockJewellery';
import { Currency, generateCertificate, getEstimatedDeliveryDate } from './utils/formatters';

// Components matching Kiara Jewellers
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CollectionsSection } from './components/CollectionsSection';
import { BestsellersSpotlight } from './components/BestsellersSpotlight';
import { FounderMessage } from './components/FounderMessage';
import { ProductCatalog } from './components/ProductCatalog';
import { StoreVisitBanner } from './components/StoreVisitBanner';
import { EditorialStories } from './components/EditorialStories';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CertificateModal } from './components/CertificateModal';
import { CertificateVerifier } from './components/CertificateVerifier';
import { AdminDashboard } from './components/AdminDashboard';
import { AppointmentModal } from './components/AppointmentModal';

export default function App() {
  // Currency State (Default INR)
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('subha_currency_v3');
      if (saved && ['INR', 'AED', 'USD', 'GBP'].includes(saved)) {
        return saved as Currency;
      }
      localStorage.setItem('subha_currency_v3', 'INR');
      localStorage.setItem('subha_currency', 'INR');
    } catch (e) {}
    return 'INR';
  });

  // Products state (can be modified by Admin)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      ['aurea_products', 'aurea_products_v2', 'aurea_products_v3', 'aurea_products_v4', 'aurea_products_v5'].forEach((k) =>
        localStorage.removeItem(k)
      );
      const saved = localStorage.getItem('subha_products_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return INITIAL_PRODUCTS.map((initial) => {
            const match = parsed.find((p: Product) => p.id === initial.id);
            return match
              ? { ...match, images: initial.images, bisHallmarkNumber: initial.bisHallmarkNumber }
              : initial;
          }).filter((p) => (p.category as string) !== 'Watches');
        }
      }
    } catch (e) {}
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('subha_cart_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item: CartItem) => {
              const fresh = INITIAL_PRODUCTS.find((p) => p.id === item.product.id);
              return fresh ? { ...item, product: { ...item.product, images: fresh.images } } : item;
            })
            .filter((i) => (i.product.category as string) !== 'Watches');
        }
      }
    } catch (e) {}
    // Initial sample piece in bag
    return [
      {
        id: 'cart-init-1',
        product: INITIAL_PRODUCTS[1], // Moonlight Teardrop Solitaire Pendant
        quantity: 1,
        selectedSize: '18 inch',
        engravingText: 'Subha • Forever'
      }
    ];
  });

  // Wishlist IDs
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('subha_wishlist_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return [INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[3].id];
  });

  // Orders State with initial mock orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('subha_orders_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}

    const initOrderNum = 'SUB-2026-94812';
    const sampleCert = generateCertificate(INITIAL_PRODUCTS[0], initOrderNum, 'Mariam Al Falasi');
    sampleCert.certificateNumber = 'SUB-VAULT-2026-94218';

    return [
      {
        id: 'ord-init-1',
        orderNumber: initOrderNum,
        createdAt: '22 Mar 2026, 03:45 PM',
        shipping: {
          fullName: 'Mariam Al Falasi',
          email: 'mariam.alfalasi@example.ae',
          phone: '+971 50 829 1198',
          streetAddress: 'Villa 24, Jumeirah 2',
          city: 'Dubai',
          state: 'Dubai',
          pincode: '00000',
          country: 'United Arab Emirates',
          isGiftPackaging: true,
          giftMessage: 'Celebratory milestone anniversary presentation.'
        },
        items: [
          {
            id: 'line-1',
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
            selectedSize: '14'
          }
        ],
        subtotal: 250000,
        gstAmount: 7500,
        shippingCharge: 0,
        total: 257500,
        paymentMethod: 'card',
        paymentReference: 'CARD-REF-984920194821',
        paymentStatus: 'Paid',
        orderStatus: 'Dispatched',
        estimatedDeliveryDate: getEstimatedDeliveryDate(),
        trackingNumber: 'BVC-SEC-DXB-490218',
        certificates: [sampleCert]
      }
    ];
  });

  // UI Navigation & Modal states
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [activeCertificateModal, setActiveCertificateModal] = useState<JewelleryCertificate | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCertVerifyOpen, setIsCertVerifyOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('subha_currency', currency);
    localStorage.setItem('subha_currency_v3', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('subha_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('subha_wishlist_v1', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('subha_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('subha_orders_v1', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const handleAddToCart = (product: Product, size?: string, engraving?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size && i.engravingText === engraving
      );
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          product,
          quantity: 1,
          selectedSize: size,
          engravingText: engraving
        }
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleToggleWishlistById = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Quick buy action
  const handleBuyNow = (product: Product, size?: string, engraving?: string) => {
    handleAddToCart(product, size, engraving);
    setActiveProductModal(null);
    setIsCheckoutOpen(true);
  };

  // Order Complete handler
  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const boughtItem = newOrder.items.find((i) => i.product.id === prod.id);
        if (boughtItem) {
          const updatedStock = Math.max(0, prod.stockCount - boughtItem.quantity);
          return {
            ...prod,
            stockCount: updatedStock,
            inStock: updatedStock > 0
          };
        }
        return prod;
      })
    );
    // Clear cart
    setCart([]);
  };

  // Admin updates
  const handleUpdateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
  };

  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === productId ? { ...prod, stockCount: newStock, inStock: newStock > 0 } : prod
      )
    );
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === productId ? { ...prod, price: newPrice } : prod))
    );
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  // Smooth scroll helper
  const scrollToCatalog = (cat?: Category) => {
    if (cat) setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // All certificates in system
  const allCertificates = orders.flatMap((o) => o.certificates);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917] font-sans selection:bg-[#C9A86A]/20">
      
      {/* Navigation Header matching Kiara Jewellers */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => scrollToCatalog()}
        onOpenCertVerify={() => setIsCertVerifyOpen(true)}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        isAdminOpen={isAdminOpen}
        onSelectCategory={(cat) => scrollToCatalog(cat)}
        selectedCategory={selectedCategory}
        onBookAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* 1. Hero Section matching Kiara Jewellers */}
        <Hero
          onDiscoverClick={() => scrollToCatalog('All')}
          onExploreHighJewellery={() => scrollToCatalog('High Jewellery')}
          onBookConsultation={() => setIsAppointmentOpen(true)}
        />

        {/* 2. Shop By Categories matching Kiara Jewellers */}
        <CategorySection
          onSelectCategory={(cat) => scrollToCatalog(cat)}
        />

        {/* 3. Signature Collections (Starlight, Moonlight, Daylight, Sunlight, Firelight) */}
        <CollectionsSection
          onSelectCollection={(_col) => scrollToCatalog('All')}
        />

        {/* 4. Most Loved Creations / Bestsellers Spotlight with Heart-throb animation */}
        <BestsellersSpotlight
          products={products}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlistById}
          onQuickView={(prod) => setActiveProductModal(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onViewAll={() => scrollToCatalog('All')}
        />

        {/* 5. A Message From Our Founder - Where Every Piece Tells a Story */}
        <FounderMessage />

        {/* 6. Full Boutique Product Catalog with Category Tabs, Metal Filters & Sort */}
        <ProductCatalog
          products={products}
          currency={currency}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onQuickView={(prod) => setActiveProductModal(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 7. Store Visit / Boutique Reservation Banner */}
        <StoreVisitBanner
          onBookVisit={() => setIsAppointmentOpen(true)}
        />

        {/* 8. Journal & Atelier Editorial Stories */}
        <EditorialStories />

        {/* 9. Client Care Frequently Asked Questions */}
        <FaqSection />

      </main>

      {/* 10. Luxury Maison Footer matching Kiara Jewellers */}
      <Footer
        onSelectCategory={(cat) => scrollToCatalog(cat)}
        onOpenCertVerify={() => setIsCertVerifyOpen(true)}
        onBookAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      
      {/* Product Detail & Inspection Modal */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          currency={currency}
          onClose={() => setActiveProductModal(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlistIds.includes(activeProductModal.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Shopping Bag Drawer */}
      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          currency={currency}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onProceedToCheckout={() => setIsCheckoutOpen(true)}
        />
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <WishlistDrawer
          isOpen={isWishlistOpen}
          currency={currency}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          onRemoveFromWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setActiveProductModal(prod)}
        />
      )}

      {/* Multi-step Secure Checkout */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          currency={currency}
          onClose={() => setIsCheckoutOpen(false)}
          items={cart}
          onOrderComplete={handleOrderComplete}
          onViewCertificate={(cert) => setActiveCertificateModal(cert)}
        />
      )}

      {/* Official Jewellery Certificate Modal */}
      {activeCertificateModal && (
        <CertificateModal
          certificate={activeCertificateModal}
          onClose={() => setActiveCertificateModal(null)}
        />
      )}

      {/* Digital Vault Certificate Authenticity Verification Tool */}
      {isCertVerifyOpen && (
        <CertificateVerifier
          isOpen={isCertVerifyOpen}
          onClose={() => setIsCertVerifyOpen(false)}
          allCertificates={allCertificates}
          onViewCertificate={(cert) => setActiveCertificateModal(cert)}
        />
      )}

      {/* Admin Management Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          products={products}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onUpdateProductStock={handleUpdateProductStock}
          onUpdateProductPrice={handleUpdateProductPrice}
          onAddProduct={handleAddProduct}
          onViewCertificate={(cert) => setActiveCertificateModal(cert)}
        />
      )}

      {/* Boutique Consultation Booking Modal */}
      {isAppointmentOpen && (
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
      )}

    </div>
  );
}
