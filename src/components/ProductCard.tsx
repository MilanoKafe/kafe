import React, { useState } from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={language === 'uz' ? product.nameUz : product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <button
                onClick={handleQuickView}
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {t('outOfStock')}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {language === 'uz' ? product.nameUz : product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {language === 'uz' ? product.descriptionUz : product.description}
          </p>

          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
            >
              {t('addToCart')}
            </button>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Omborda: {product.stock} dona
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;