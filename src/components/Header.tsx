import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-2xl font-bold text-green-600">Jelai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {t('products')}
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {t('contact')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'uz' | 'en' | 'ru')}
                className="flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors border-none bg-transparent cursor-pointer"
              >
                <option value="uz">O'ZB</option>
                <option value="en">ENG</option>
                <option value="ru">РУС</option>
              </select>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="hidden md:block text-sm text-gray-700">
                    {user.fullName}
                  </span>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="hidden md:block px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                      {t('admin')}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-3 py-1 text-sm text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {t('home')}
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/products') 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {t('products')}
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {t('about')}
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/contact') 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {t('contact')}
              </Link>
              
              {user ? (
                <div className="pt-2 border-t border-gray-200">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    {user.fullName}
                  </div>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    >
                      {t('admin')}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;