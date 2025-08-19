import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'uz' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  uz: {
    // Navigation
    home: 'Bosh sahifa',
    products: 'Mahsulotlar',
    cart: 'Savatcha',
    contact: 'Aloqa',
    about: 'Biz haqimizda',
    login: 'Kirish',
    register: 'Ro\'yxatdan o\'tish',
    logout: 'Chiqish',
    admin: 'Admin panel',
    
    // Homepage
    heroTitle: 'Jelai - Eng mazali jele mahsulotlari',
    heroSubtitle: 'Tabiiy ingredientlardan tayyorlangan sifatli jele mahsulotlari',
    featuredProducts: 'Mashhur mahsulotlar',
    customerReviews: 'Mijozlar fikrlari',
    newsletter: 'Yangiliklar',
    
    // Products
    searchProducts: 'Mahsulotlarni qidirish...',
    filterByPrice: 'Narx bo\'yicha filtrlash',
    sortBy: 'Saralash',
    addToCart: 'Savatga qo\'shish',
    quickView: 'Tez ko\'rish',
    outOfStock: 'Tugagan',
    
    // Cart
    shoppingCart: 'Xarid savatchasi',
    quantity: 'Miqdor',
    price: 'Narx',
    total: 'Jami',
    checkout: 'To\'lov',
    continueShopping: 'Xaridni davom ettirish',
    
    // Auth
    email: 'Email',
    password: 'Parol',
    fullName: 'To\'liq ism',
    phoneNumber: 'Telefon raqam',
    
    // Contact
    contactUs: 'Biz bilan bog\'laning',
    subject: 'Mavzu',
    message: 'Xabar',
    send: 'Yuborish',
    
    // About
    aboutTitle: 'Jelai haqida',
    ourMission: 'Bizning missiyamiz',
    
    // Common
    loading: 'Yuklanmoqda...',
    error: 'Xatolik yuz berdi',
    success: 'Muvaffaqiyatli',
    cancel: 'Bekor qilish',
    save: 'Saqlash',
    edit: 'Tahrirlash',
    delete: 'O\'chirish',
    view: 'Ko\'rish'
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    contact: 'Contact',
    about: 'About',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    admin: 'Admin Panel',
    
    // Homepage
    heroTitle: 'Jelai - The Most Delicious Jelly Products',
    heroSubtitle: 'Quality jelly products made from natural ingredients',
    featuredProducts: 'Featured Products',
    customerReviews: 'Customer Reviews',
    newsletter: 'Newsletter',
    
    // Products
    searchProducts: 'Search products...',
    filterByPrice: 'Filter by price',
    sortBy: 'Sort by',
    addToCart: 'Add to Cart',
    quickView: 'Quick View',
    outOfStock: 'Out of Stock',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    
    // Auth
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    
    // Contact
    contactUs: 'Contact Us',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    
    // About
    aboutTitle: 'About Jelai',
    ourMission: 'Our Mission',
    
    // Common
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View'
  },
  ru: {
    // Navigation
    home: 'Главная',
    products: 'Продукты',
    cart: 'Корзина',
    contact: 'Контакты',
    about: 'О нас',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    admin: 'Админ панель',
    
    // Homepage
    heroTitle: 'Jelai - Самые вкусные желейные продукты',
    heroSubtitle: 'Качественные желейные продукты из натуральных ингредиентов',
    featuredProducts: 'Популярные продукты',
    customerReviews: 'Отзывы клиентов',
    newsletter: 'Новости',
    
    // Products
    searchProducts: 'Поиск продуктов...',
    filterByPrice: 'Фильтр по цене',
    sortBy: 'Сортировать по',
    addToCart: 'В корзину',
    quickView: 'Быстрый просмотр',
    outOfStock: 'Нет в наличии',
    
    // Cart
    shoppingCart: 'Корзина покупок',
    quantity: 'Количество',
    price: 'Цена',
    total: 'Итого',
    checkout: 'Оформить заказ',
    continueShopping: 'Продолжить покупки',
    
    // Auth
    email: 'Email',
    password: 'Пароль',
    fullName: 'Полное имя',
    phoneNumber: 'Номер телефона',
    
    // Contact
    contactUs: 'Свяжитесь с нами',
    subject: 'Тема',
    message: 'Сообщение',
    send: 'Отправить',
    
    // About
    aboutTitle: 'О Jelai',
    ourMission: 'Наша миссия',
    
    // Common
    loading: 'Загрузка...',
    error: 'Произошла ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    save: 'Сохранить',
    edit: 'Редактировать',
    delete: 'Удалить',
    view: 'Просмотр'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['uz']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};