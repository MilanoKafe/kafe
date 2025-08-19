import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage (simulate sending to backend)
    const contacts = JSON.parse(localStorage.getItem('jelai_contacts') || '[]');
    const newContact = {
      id: `contact-${Date.now()}`,
      ...formData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('jelai_contacts', JSON.stringify(contacts));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: ''
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: 'Telefon',
      details: ['+998 94 773 03 02', '+998 71 123 45 67'],
      description: 'Dushanba-Shanba: 9:00-18:00'
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: 'Email',
      details: ['info@jelai.uz', 'support@jelai.uz'],
      description: '24 soat ichida javob beramiz'
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: 'Manzil',
      details: ['Toshkent shahar, Chilonzor tumani', 'Bunyodkor ko\'chasi 1-uy'],
      description: 'Ofis: 9:00-18:00'
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: 'Ish vaqti',
      details: ['Dushanba - Juma: 9:00-18:00', 'Shanba: 9:00-14:00'],
      description: 'Yakshanba: Dam olish kuni'
    }
  ];

  const faqItems = [
    {
      question: 'Yetkazib berish qancha vaqt oladi?',
      answer: 'Toshkent shahar bo\'yicha 1-2 kun, viloyatlarga 3-5 kun ichida yetkazib beramiz.'
    },
    {
      question: 'Mahsulotlar qancha muddat saqlanadi?',
      answer: 'Bizning jele mahsulotlari ishlab chiqarilgan kundan boshlab 6 oy davomida saqlanadi.'
    },
    {
      question: 'Ulgurji xarid qilish mumkinmi?',
      answer: 'Ha, ulgurji xaridlar uchun maxsus narxlar mavjud. Batafsil ma\'lumot uchun bog\'laning.'
    },
    {
      question: 'Mahsulotlar halolmi?',
      answer: 'Ha, barcha mahsulotlarimiz halol sertifikatiga ega va tabiiy ingredientlardan tayyorlanadi.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contactUs')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Savollaringiz bormi? Biz bilan bog'laning! Sizga yordam berishdan mamnunmiz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Xabar yuborish
            </h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Send className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-green-800">
                      Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('subject')} *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Mavzuni tanlang</option>
                  <option value="product-inquiry">Mahsulot haqida savol</option>
                  <option value="order-status">Buyurtma holati</option>
                  <option value="wholesale">Ulgurji xarid</option>
                  <option value="complaint">Shikoyat</option>
                  <option value="suggestion">Taklif</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Xabaringizni yozing..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('send')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Aloqa ma'lumotlari
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                      <p className="text-sm text-gray-500 mt-1">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ko'p beriladigan savollar
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;