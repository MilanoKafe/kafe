import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-2xl font-bold text-green-400">Jelai</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Jelai - O'zbekistondagi eng sifatli jele mahsulotlari ishlab chiqaruvchisi. 
              Tabiiy ingredientlar va zamonaviy texnologiyalar yordamida mazali va foydali mahsulotlar yaratamiz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Aloqa</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">+998 94 773 03 02</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">info@jelai.uz</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-green-400 mt-1" />
                <span className="text-gray-300">
                  Toshkent shahar, Chilonzor tumani, 
                  Bunyodkor ko'chasi 1-uy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Jelai. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;