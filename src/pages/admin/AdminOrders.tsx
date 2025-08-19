import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Truck, CheckCircle } from 'lucide-react';
import { Order } from '../../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('jelai_orders') || '[]');
    setOrders(storedOrders);
    setFilteredOrders(storedOrders);
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress.phoneNumber.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Kutilmoqda';
      case 'confirmed': return 'Tasdiqlangan';
      case 'processing': return 'Tayyorlanmoqda';
      case 'shipped': return 'Yuborilgan';
      case 'delivered': return 'Yetkazilgan';
      default: return status;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as Order['status'] }
        : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('jelai_orders', JSON.stringify(updatedOrders));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus as Order['status'] });
    }
  };

  const viewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buyurtmalar</h1>
          <p className="text-gray-600 mt-2">Barcha buyurtmalarni boshqaring</p>
        </div>
        <div className="text-sm text-gray-500">
          Jami: {filteredOrders.length} ta buyurtma
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buyurtma ID, mijoz nomi yoki telefon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Barcha holatlar</option>
                <option value="pending">Kutilmoqda</option>
                <option value="confirmed">Tasdiqlangan</option>
                <option value="processing">Tayyorlanmoqda</option>
                <option value="shipped">Yuborilgan</option>
                <option value="delivered">Yetkazilgan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyurtma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mijoz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order.id.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items.length} ta mahsulot
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.shippingAddress.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.shippingAddress.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => viewOrder(order)}
                        className="text-green-600 hover:text-green-900 inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ko'rish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Buyurtmalar topilmadi
            </h3>
            <p className="text-gray-500">
              Qidiruv shartlaringizni o'zgartirib ko'ring
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Buyurtma #{selectedOrder.id.slice(-8)}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Buyurtma holati</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Tasdiqlash</span>
                    </button>
                  )}
                  {selectedOrder.status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Tayyorlashga yuborish</span>
                    </button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Yuborildi</span>
                    </button>
                  )}
                  {selectedOrder.status === 'shipped' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Yetkazildi</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Mijoz ma'lumotlari</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">To'liq ism</p>
                    <p className="font-medium">{selectedOrder.shippingAddress.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telefon</p>
                    <p className="font-medium">{selectedOrder.shippingAddress.phoneNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Yetkazib berish manzili</p>
                    <p className="font-medium">
                      {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Buyurtma tarkibi</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.nameUz}</h4>
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.product.price)} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Jami summa:</span>
                  <span className="text-green-600">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;