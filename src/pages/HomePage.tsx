import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, Truck } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const featuredProducts = products.slice(0, 6);

  const testimonials = [
    {
      id: 1,
      name: 'Malika Karimova',
      rating: 5,
      comment: 'Jelai mahsulotlari juda mazali va sifatli. Bolalarim juda yaxshi ko\'radi!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Bobur Rahimov',
      rating: 5,
      comment: 'Tabiiy ingredientlar va ajoyib ta\'m. Doimo Jelai mahsulotlarini tanlayman.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Nilufar Tosheva',
      rating: 5,
      comment: 'Sifat va narx jihatidan eng yaxshi tanlov. Tavsiya qilaman!',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Yuqori sifat',
      description: 'Faqat tabiiy ingredientlar va zamonaviy texnologiyalar'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Mijozlar ishonchi',
      description: '10,000+ mamnun mijozlar bizni tanladilar'
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: 'Tez yetkazib berish',
      description: 'Butun O\'zbekiston bo\'ylab tez va xavfsiz yetkazib berish'
    }
  ];

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/products"
                  className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Mahsulotlarni ko'rish</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="border border-green-600 text-green-600 px-8 py-3 rounded-md hover:bg-green-50 transition-colors text-center"
                >
                  Biz haqimizda
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Jelai Products"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <div>
                    <div className="font-semibold">Tabiiy</div>
                    <div className="text-sm text-gray-500">Ingredientlar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-xl text-gray-600">
              Eng mashhur va sevimli mahsulotlarimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Barcha mahsulotlar</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('customerReviews')}
            </h2>
            <p className="text-xl text-gray-600">
              Mijozlarimiz bizning mahsulotlarimiz haqida nima deyishadi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Yangiliklar va takliflardan xabardor bo'ling
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Eng so'nggi mahsulotlar va maxsus takliflar haqida birinchi bo'lib bilib oling
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Email manzilingizni kiriting"
              className="flex-1 px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-green-800 text-white px-6 py-3 rounded-r-md hover:bg-green-900 transition-colors">
              Obuna bo'lish
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;