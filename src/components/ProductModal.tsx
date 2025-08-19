import React, { useState } from 'react';
import { X, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {language === 'uz' ? product.nameUz : product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={language === 'uz' ? product.nameUz : product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                        selectedImage === index 
                          ? 'border-green-500' 
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.reviewCount} baho)
                </span>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-4">
                {formatPrice(product.price)}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Tavsif</h3>
                <p className="text-gray-600">
                  {language === 'uz' ? product.descriptionUz : product.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Tarkib</h3>
                <p className="text-gray-600">
                  {language === 'uz' ? product.ingredientsUz : product.ingredients}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Foydalanish</h3>
                <p className="text-gray-600">
                  {language === 'uz' ? product.usageUz : product.usage}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-sm text-gray-500">
                  Omborda: {product.stock} dona
                </span>
              </div>

              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('quantity')}
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {product.stock === 0 ? t('outOfStock') : t('addToCart')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;