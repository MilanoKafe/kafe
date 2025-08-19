import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login
      return;
    }
    
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Buyurtma muvaffaqiyatli qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Savatingiz bo'sh
          </h2>
          <p className="text-gray-600 mb-8">
            Hozircha hech qanday mahsulot qo'shilmagan
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>Xarid qilishni boshlash</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Xaridni davom ettirish</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('shoppingCart')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  Mahsulotlar ({items.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.product.nameUz}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.product.descriptionUz}
                        </p>
                        <div className="text-lg font-semibold text-green-600 mt-2">
                          {formatPrice(item.product.price)}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-700 transition-colors mt-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">
                Buyurtma xulosasi
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Mahsulotlar narxi:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="text-green-600">Bepul</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Jami:</span>
                    <span className="text-green-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              {user ? (
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Buyurtma berilmoqda...' : 'Buyurtma berish'}
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 text-center">
                    Buyurtma berish uchun tizimga kiring
                  </p>
                  <Link
                    to="/login"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors block text-center"
                  >
                    Tizimga kirish
                  </Link>
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 transition-colors text-sm"
                >
                  Savatchani tozalash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;