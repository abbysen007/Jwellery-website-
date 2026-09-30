import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, Product, JewelleryCertificate, Category } from '../types';
import { formatINR } from '../utils/formatters';
import { 
  X, LayoutDashboard, Package, ShoppingCart, Award, Plus, 
  Search, Edit3, Trash2, CheckCircle2, Truck, ShieldAlert, 
  IndianRupee, TrendingUp, AlertCircle 
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  onUpdateProductStock: (productId: string, newStock: number) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onAddProduct: (product: Product) => void;
  onViewCertificate: (cert: JewelleryCertificate) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onUpdateOrderStatus,
  onUpdateProductStock,
  onUpdateProductPrice,
  onAddProduct,
  onViewCertificate,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'certificates'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    subtitle: '',
    collection: 'The Soirée Collection',
    category: 'Rings',
    price: 150000,
    metal: '18K Yellow Gold',
    metalPurity: '18K (750)',
    grossWeight: 6.5,
    netGoldWeight: 6.0,
    gemstone: 'Natural Diamond',
    diamondCarats: 0.85,
    diamondClarity: 'VVS1',
    diamondColor: 'E-F',
    diamondCut: 'Ideal Brilliant',
    bisHallmarkNumber: `BIS-750-HM-${Math.floor(10000 + Math.random() * 90000)}`,
    inStock: true,
    stockCount: 5,
    description: 'Bespoke hand-crafted creation with BIS hallmarked gold.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop'],
    details: ['Bureau of Indian Standards (BIS) 750 Hallmarked Gold', 'Includes Digital Vault Certificate'],
    availableSizes: ['12', '14', '16']
  });

  if (!isOpen) return null;

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCertificates = orders.reduce((sum, o) => sum + o.certificates.length, 0);
  const lowStockItems = products.filter((p) => p.stockCount <= 3);

  // Filtered lists
  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.shipping.fullName.toLowerCase().includes(q) ||
      o.shipping.city.toLowerCase().includes(q)
    );
  });

  const filteredInventory = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.metal.toLowerCase().includes(q) ||
      p.bisHallmarkNumber.toLowerCase().includes(q)
    );
  });

  const allIssuedCertificates = orders.flatMap((o) => o.certificates);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    const created: Product = {
      id: `aurea-custom-${Date.now()}`,
      name: newProd.name,
      subtitle: newProd.subtitle || `${newProd.metal} with ${newProd.gemstone}`,
      collection: newProd.collection || 'Atelier Collection',
      category: newProd.category as any || 'Rings',
      price: Number(newProd.price),
      metal: newProd.metal || '18K Yellow Gold',
      metalPurity: newProd.metalPurity || '18K (750)',
      grossWeight: Number(newProd.grossWeight) || 5,
      netGoldWeight: Number(newProd.netGoldWeight) || 4.5,
      gemstone: newProd.gemstone || 'Natural Diamond',
      diamondCarats: Number(newProd.diamondCarats) || undefined,
      diamondClarity: newProd.diamondClarity,
      diamondColor: newProd.diamondColor,
      diamondCut: newProd.diamondCut,
      bisHallmarkNumber: newProd.bisHallmarkNumber || 'BIS-750-HM-99012',
      inStock: true,
      stockCount: Number(newProd.stockCount) || 3,
      rating: 5.0,
      reviewsCount: 1,
      description: newProd.description || 'Artisanal jewellery.',
      details: newProd.details || ['BIS 750 Hallmarked'],
      images: newProd.images && newProd.images.length > 0 ? newProd.images : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop'],
      availableSizes: newProd.availableSizes
    };

    onAddProduct(created);
    setShowAddModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-6xl bg-[#FAF8F5] rounded-sm shadow-2xl border border-[#E3DBD0] my-auto overflow-hidden flex flex-col max-h-[92vh]"
      >
        
        {/* Header Bar */}
        <div className="bg-[#1C1A17] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#36322D]">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-[#C9A86A]" />
            <div>
              <h2 className="font-serif text-xl tracking-wider text-[#FAF8F5]">
                Subha Atelier Administration Portal
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-[#A89F91]">
                Inventory Management • Orders Dispatch • BIS Certificates Vault
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            id="close-admin-dashboard-btn"
            className="p-1.5 text-[#E6D7BD] hover:text-white"
            aria-label="Close Admin"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Executive Metric Cards */}
        <div className="p-6 bg-[#F5EFE6] border-b border-[#E3DBD0] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-white rounded-sm border border-[#E3DBD0] shadow-xs"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#7A7165] block font-medium">
              Gross Order Value
            </span>
            <span className="font-serif text-2xl font-bold text-[#1E1B18] mt-1 block">
              {formatINR(totalRevenue)}
            </span>
            <span className="text-[10px] text-[#166534] flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              Audited in INR (₹)
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-white rounded-sm border border-[#E3DBD0] shadow-xs"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#7A7165] block font-medium">
              Client Orders
            </span>
            <span className="font-serif text-2xl font-bold text-[#1E1B18] mt-1 block">
              {orders.length}
            </span>
            <span className="text-[10px] text-[#7A7165] mt-1 block">
              {orders.filter((o) => o.orderStatus === 'Delivered').length} Dispatched & Delivered
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-white rounded-sm border border-[#E3DBD0] shadow-xs"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#7A7165] block font-medium">
              Active Creations
            </span>
            <span className="font-serif text-2xl font-bold text-[#1E1B18] mt-1 block">
              {products.length}
            </span>
            <span className="text-[10px] text-[#B45309] mt-1 block">
              {lowStockItems.length} Low Stock Alert (&le;3)
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-white rounded-sm border border-[#E3DBD0] shadow-xs"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#7A7165] block font-medium">
              Certificates Issued
            </span>
            <span className="font-serif text-2xl font-bold text-[#1E1B18] mt-1 block">
              {totalCertificates}
            </span>
            <span className="text-[10px] text-[#4338CA] mt-1 block">
              100% BIS Hallmarked
            </span>
          </motion.div>
        </div>

        {/* Tab Controls and Actions */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E3DBD0] flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex gap-2">
            <button
              id="admin-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-[#1C1A17] text-[#FAF8F5]'
                  : 'bg-white text-[#554E43] hover:bg-[#F4EFE6] border border-[#D8CEBE]'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              id="admin-tab-inventory"
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'bg-[#1C1A17] text-[#FAF8F5]'
                  : 'bg-white text-[#554E43] hover:bg-[#F4EFE6] border border-[#D8CEBE]'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Inventory ({products.length})</span>
            </button>

            <button
              id="admin-tab-certificates"
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'bg-[#1C1A17] text-[#FAF8F5]'
                  : 'bg-white text-[#554E43] hover:bg-[#F4EFE6] border border-[#D8CEBE]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Certificates Vault ({allIssuedCertificates.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C7449] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, SKU..."
                className="pl-8 pr-3 py-1.5 bg-white border border-[#D8CEBE] rounded-sm text-xs focus:outline-none focus:border-[#C9A86A]"
              />
            </div>

            {/* Add product button */}
            {activeTab === 'inventory' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="admin-add-product-btn"
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-1.5 bg-[#C9A86A] text-[#1C1A17] text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#BFA57A] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Creation</span>
              </motion.button>
            )}
          </div>

        </div>

        {/* Tab Panel Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          <AnimatePresence mode="wait">
          {/* TAB 1: Orders */}
          {activeTab === 'orders' && (
            <motion.div
              key="tab-orders"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filteredOrders.length === 0 ? (
                <div className="text-center py-16 text-[#7A7165] bg-white border border-[#EAE3D6] rounded-sm">
                  <ShoppingCart className="w-10 h-10 text-[#D8CEBE] mx-auto mb-2" />
                  <p className="font-serif text-lg text-[#1E1B18]">No Orders Found</p>
                  <p className="text-xs">Place an order through the boutique to view client dispatches here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-sm border border-[#E3DBD0] overflow-x-auto shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F5EE] border-b border-[#E3DBD0] text-[#695F52] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Order Ref</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Total (INR)</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Certificates</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EBE1]">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="p-3 font-mono font-semibold text-[#1C1A17]">
                            {ord.orderNumber}
                          </td>
                          <td className="p-3 text-[#7A7165]">
                            {ord.createdAt}
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-[#1E1B18] block">{ord.shipping.fullName}</span>
                            <span className="text-[11px] text-[#7A7165]">{ord.shipping.city}, {ord.shipping.state}</span>
                          </td>
                          <td className="p-3">
                            {ord.items.map((it) => (
                              <div key={it.id} className="text-[11px] text-[#4A4338]">
                                {it.quantity}x {it.product.name}
                              </div>
                            ))}
                          </td>
                          <td className="p-3 font-serif font-bold text-sm text-[#1E1B18]">
                            {formatINR(ord.total)}
                          </td>
                          <td className="p-3">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                              className={`p-1 rounded text-[11px] font-medium border focus:outline-none ${
                                ord.orderStatus === 'Delivered'
                                  ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                                  : ord.orderStatus === 'Dispatched'
                                  ? 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]'
                                  : ord.orderStatus === 'BIS Hallmarked'
                                  ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                                  : 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]'
                              }`}
                            >
                              <option value="Processing">Processing</option>
                              <option value="BIS Hallmarked">BIS Hallmarked</option>
                              <option value="Dispatched">Dispatched (Armored)</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col gap-1">
                              {ord.certificates.map((cert) => (
                                <button
                                  key={cert.certificateNumber}
                                  onClick={() => onViewCertificate(cert)}
                                  className="text-[10px] text-[#8C7449] hover:underline flex items-center gap-1"
                                >
                                  <Award className="w-3 h-3" />
                                  <span>{cert.certificateNumber}</span>
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-[11px] text-[#7A7165] font-mono">
                            {ord.trackingNumber}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: Inventory */}
          {activeTab === 'inventory' && (
            <motion.div
              key="tab-inventory"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-sm border border-[#E3DBD0] overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F5EE] border-b border-[#E3DBD0] text-[#695F52] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Jewel</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Precious Specs</th>
                      <th className="p-3">BIS Hallmark</th>
                      <th className="p-3">Stock Units</th>
                      <th className="p-3">Price (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1]">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-sm border border-[#E8DEC8]"
                          />
                          <div>
                            <span className="font-serif font-medium text-sm text-[#1E1B18] block leading-tight">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-[#7A7165]">{item.collection}</span>
                          </div>
                        </td>
                        <td className="p-3 text-[#4A4338]">
                          {item.category}
                        </td>
                        <td className="p-3 text-[11px] text-[#4A4338]">
                          <div>{item.metal} ({item.metalPurity})</div>
                          <div className="text-[#7A7165]">
                            {item.diamondCarats ? `${item.diamondCarats} ctw • ${item.diamondClarity}` : item.gemstone}
                          </div>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[#1E1B18]">
                          {item.bisHallmarkNumber}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onUpdateProductStock(item.id, Math.max(0, item.stockCount - 1))}
                              className="w-6 h-6 rounded border border-[#D8CEBE] hover:bg-[#F4EFE6] flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className={`w-8 text-center font-semibold ${item.stockCount <= 2 ? 'text-[#B45309]' : 'text-[#1E1B18]'}`}>
                              {item.stockCount}
                            </span>
                            <button
                              onClick={() => onUpdateProductStock(item.id, item.stockCount + 1)}
                              className="w-6 h-6 rounded border border-[#D8CEBE] hover:bg-[#F4EFE6] flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              step="5000"
                              value={item.price}
                              onChange={(e) => onUpdateProductPrice(item.id, Number(e.target.value))}
                              className="w-28 p-1.5 border border-[#D8CEBE] rounded-sm font-serif font-bold text-xs"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Certificates Vault */}
          {activeTab === 'certificates' && (
            <motion.div
              key="tab-certificates"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="p-4 bg-[#F8F5EE] border border-[#E3DBD0] rounded-sm text-xs flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base text-[#1E1B18] font-medium">
                    Bureau of Indian Standards (BIS) Vault Registry
                  </h4>
                  <p className="text-[11px] text-[#7A7165]">
                    All certificates are cryptographically unique and verifiable via QR scan.
                  </p>
                </div>
                <span className="font-mono font-bold text-xs text-[#1E1B18] bg-white px-3 py-1 border border-[#D8CEBE] rounded-sm">
                  {allIssuedCertificates.length} Records In Vault
                </span>
              </div>

              {allIssuedCertificates.length === 0 ? (
                <div className="text-center py-16 text-[#7A7165] bg-white border border-[#EAE3D6] rounded-sm">
                  <Award className="w-10 h-10 text-[#D8CEBE] mx-auto mb-2" />
                  <p className="font-serif text-lg text-[#1E1B18]">No Certificates Issued Yet</p>
                  <p className="text-xs">Certificates are automatically generated and stamped upon customer checkout.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allIssuedCertificates.map((cert) => (
                    <motion.div
                      key={cert.certificateNumber}
                      whileHover={{ y: -3 }}
                      className="p-4 bg-white rounded-sm border border-[#D8CEBE] shadow-xs hover:border-[#C9A86A] transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={cert.productImage}
                          alt={cert.productName}
                          className="w-14 h-14 object-cover rounded-sm border border-[#E8DEC8] flex-shrink-0"
                        />
                        <div className="text-xs">
                          <span className="font-mono text-[10px] text-[#8C7449] font-bold block">
                            {cert.certificateNumber}
                          </span>
                          <h5 className="font-serif text-sm font-semibold text-[#1E1B18] leading-tight">
                            {cert.productName}
                          </h5>
                          <span className="text-[10px] text-[#7A7165] block mt-0.5">
                            Assayed to: {cert.ownerName}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#F0EBE1] text-[11px] text-[#554E43] space-y-1 mb-3">
                        <div className="flex justify-between">
                          <span>Hallmark:</span>
                          <span className="font-mono">{cert.bisHallmarkId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Gold:</span>
                          <span>{cert.netGoldWeightGrams}g ({cert.metalPurity})</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Valuation:</span>
                          <span className="font-serif font-bold text-[#1E1B18]">{formatINR(cert.valuationINR)}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onViewCertificate(cert)}
                        className="w-full py-2 bg-[#1C1A17] text-[#FAF8F5] text-xs uppercase tracking-wider rounded-sm hover:bg-[#C9A86A] hover:text-[#1C1A17] transition-all flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Inspect & Print Certificate</span>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
          </AnimatePresence>

        </div>

      </motion.div>

      {/* Add Product Modal Sub-dialog */}
      <AnimatePresence>
      {showAddModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-lg bg-[#FAF8F5] rounded-sm p-6 border border-[#E3DBD0] shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6] mb-4">
              <h3 className="font-serif text-xl text-[#1E1B18]">Add Atelier Jewellery Piece</h3>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowAddModal(false)}
                className="text-[#7A7165] hover:text-[#1E1B18]"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#695F52] uppercase mb-1">Creation Name</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Royal Emerald Solitaire Ring"
                  className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#695F52] uppercase mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                    className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="High Jewellery">High Jewellery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#695F52] uppercase mb-1">Price in INR (₹)</label>
                  <input
                    type="number"
                    step="5000"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#695F52] uppercase mb-1">Metal Alloy</label>
                  <input
                    type="text"
                    value={newProd.metal}
                    onChange={(e) => setNewProd({ ...newProd, metal: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#695F52] uppercase mb-1">BIS Purity</label>
                  <input
                    type="text"
                    value={newProd.metalPurity}
                    onChange={(e) => setNewProd({ ...newProd, metalPurity: e.target.value })}
                    placeholder="18K (750)"
                    className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#695F52] uppercase mb-1">Net Gold Wt (grams)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newProd.netGoldWeight}
                    onChange={(e) => setNewProd({ ...newProd, netGoldWeight: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#695F52] uppercase mb-1">Diamond Carats</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newProd.diamondCarats}
                    onChange={(e) => setNewProd({ ...newProd, diamondCarats: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#695F52] uppercase mb-1">High-Res Image URL</label>
                <input
                  type="url"
                  value={newProd.images?.[0]}
                  onChange={(e) => setNewProd({ ...newProd, images: [e.target.value] })}
                  className="w-full p-2 bg-white border border-[#D8CEBE] rounded-sm font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#D8CEBE] text-[#554E43] rounded-sm hover:bg-[#F4EFE6]"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-2 bg-[#1C1A17] text-white uppercase tracking-wider rounded-sm hover:bg-[#C9A86A] hover:text-[#1C1A17] transition-all font-semibold"
                >
                  Add To Vault
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

    </div>
  );
};
