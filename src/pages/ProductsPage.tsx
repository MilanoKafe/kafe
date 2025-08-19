import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const { language, t } = useLanguage();

  const categories = useMemo(() => {
    const cats = products.map(p => language === 'uz' ? p.categoryUz : p.category);
    return [...new Set(cats)];
  }, [language]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const name = language === 'uz' ? product.nameUz : product.name;
      const description = language === 'uz' ? product.descriptionUz : product.description;
      const category = language === 'uz' ? product.categoryUz : product.category;
      
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          const nameA = language === 'uz' ? a.nameUz : a.name;
          const nameB = language === 'uz' ? b.nameUz : b.name;
          return nameA.localeCompare(nameB);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, language]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 50000 });
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('products')}
          </h1>
          <p className="text-gray-600">
            Bizning barcha mazali jele mahsulotlarimizni kashf eting
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchProducts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtrlar</span>
            </button>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                {t('sortBy')}:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Nomi</option>
                <option value="price-low">Narx (past)</option>
                <option value="price-high">Narx (yuqori)</option>
                <option value="rating">Reyting</option>
                <option value="newest">Yangi</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t border-gray-200`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoriya
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Barcha kategoriyalar</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filterByPrice')}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} mahsulot topildi
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Hech qanday mahsulot topilmadi
            </h3>
            <p className="text-gray-500 mb-4">
              Qidiruv shartlaringizni o'zgartirib ko'ring
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;