import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Package, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Star
} from 'lucide-react';
import { Order, Contact, User } from '../../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalContacts: 0,
    totalRevenue: 0,
    newOrdersToday: 0,
    newContactsToday: 0
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const users = JSON.parse(localStorage.getItem('jelai_users') || '[]');
    const orders = JSON.parse(localStorage.getItem('jelai_orders') || '[]');
    const contacts = JSON.parse(localStorage.getItem('jelai_contacts') || '[]');

    const today = new Date().toDateString();
    const newOrdersToday = orders.filter((order: Order) => 
      new Date(order.createdAt).toDateString() === today
    ).length;
    
    const newContactsToday = contacts.filter((contact: Contact) => 
      new Date(contact.createdAt).toDateString() === today
    ).length;

    const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total, 0);

    setStats({
      totalUsers: users.length,
      totalOrders: orders.length,
      totalContacts: contacts.length,
      totalRevenue,
      newOrdersToday,
      newContactsToday
    });

    // Get recent orders and contacts
    setRecentOrders(orders.slice(-5).reverse());
    setRecentContacts(contacts.slice(-5).reverse());
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ');
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

  const getContactStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContactStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Yangi';
      case 'replied': return 'Javob berilgan';
      case 'closed': return 'Yopilgan';
      default: return status;
    }
  };

  const statCards = [
    {
      title: 'Jami foydalanuvchilar',
      value: stats.totalUsers,
      icon: <Users className="w-8 h-8 text-blue-600" />,
      bgColor: 'bg-blue-50',
      change: `+${stats.totalUsers} jami`
    },
    {
      title: 'Jami buyurtmalar',
      value: stats.totalOrders,
      icon: <ShoppingBag className="w-8 h-8 text-green-600" />,
      bgColor: 'bg-green-50',
      change: `+${stats.newOrdersToday} bugun`
    },
    {
      title: 'Jami murojaat',
      value: stats.totalContacts,
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      bgColor: 'bg-purple-50',
      change: `+${stats.newContactsToday} bugun`
    },
    {
      title: 'Jami daromad',
      value: formatPrice(stats.totalRevenue),
      icon: <DollarSign className="w-8 h-8 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      change: 'Barcha vaqt'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Jelai e-commerce platformasi boshqaruv paneli</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className={`${card.bgColor} p-6 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {typeof card.value === 'number' && card.title !== 'Jami daromad' 
                    ? card.value.toLocaleString() 
                    : card.value
                  }
                </p>
                <p className="text-sm text-gray-500 mt-1">{card.change}</p>
              </div>
              <div className="flex-shrink-0">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">So'nggi buyurtmalar</h2>
            <ShoppingBag className="w-5 h-5 text-gray-400" />
          </div>
          
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        #{order.id.slice(-8)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.shippingAddress.fullName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                      <span className="font-semibold text-green-600">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Hozircha buyurtmalar yo'q</p>
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">So'nggi murojaat</h2>
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
          
          {recentContacts.length > 0 ? (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{contact.fullName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContactStatusColor(contact.status)}`}>
                      {getContactStatusText(contact.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{contact.subject}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{contact.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(contact.createdAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Hozircha murojaat yo'q</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tezkor amallar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-6 h-6 text-green-600" />
            <span className="font-medium">Yangi mahsulot qo'shish</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span className="font-medium">Hisobotlarni ko'rish</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Star className="w-6 h-6 text-yellow-600" />
            <span className="font-medium">Sharhlarni boshqarish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;