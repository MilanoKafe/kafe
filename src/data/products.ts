import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Strawberry Jelly',
    nameUz: 'Qulupnay jelesi',
    description: 'Delicious strawberry flavored jelly made with real fruit extracts',
    descriptionUz: 'Haqiqiy meva ekstraktlari bilan tayyorlangan mazali qulupnay jelesi',
    price: 15000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    images: [
      'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    ingredients: 'Sugar, Strawberry extract, Gelatin, Natural flavoring, Food coloring',
    ingredientsUz: 'Shakar, Qulupnay ekstrakti, Jelatin, Tabiiy lazzat beruvchi, Oziq-ovqat bo\'yog\'i',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Orange Jelly',
    nameUz: 'Apelsin jelesi',
    description: 'Fresh orange jelly with vitamin C boost',
    descriptionUz: 'C vitamini bilan boyitilgan yangi apelsin jelesi',
    price: 14000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.6,
    reviewCount: 89,
    stock: 35,
    ingredients: 'Sugar, Orange extract, Gelatin, Vitamin C, Natural flavoring',
    ingredientsUz: 'Shakar, Apelsin ekstrakti, Jelatin, C vitamini, Tabiiy lazzat beruvchi',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'Apple Jelly',
    nameUz: 'Olma jelesi',
    description: 'Classic apple jelly with natural sweetness',
    descriptionUz: 'Tabiiy shirinlik bilan klassik olma jelesi',
    price: 13000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    images: [
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.5,
    reviewCount: 67,
    stock: 42,
    ingredients: 'Sugar, Apple extract, Gelatin, Natural flavoring',
    ingredientsUz: 'Shakar, Olma ekstrakti, Jelatin, Tabiiy lazzat beruvchi',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    name: 'Mixed Berry Jelly',
    nameUz: 'Aralash rezavorlar jelesi',
    description: 'A delightful mix of berries in one jelly',
    descriptionUz: 'Bir jeledagi rezavorlarning ajoyib aralashmasi',
    price: 16000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    images: [
      'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.9,
    reviewCount: 156,
    stock: 28,
    ingredients: 'Sugar, Mixed berry extract, Gelatin, Natural flavoring, Food coloring',
    ingredientsUz: 'Shakar, Aralash rezavor ekstrakti, Jelatin, Tabiiy lazzat beruvchi, Oziq-ovqat bo\'yog\'i',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: '5',
    name: 'Grape Jelly',
    nameUz: 'Uzum jelesi',
    description: 'Rich grape flavored jelly with antioxidants',
    descriptionUz: 'Antioksidantlar bilan boy uzum ta\'mli jele',
    price: 15500,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.7,
    reviewCount: 98,
    stock: 33,
    ingredients: 'Sugar, Grape extract, Gelatin, Antioxidants, Natural flavoring',
    ingredientsUz: 'Shakar, Uzum ekstrakti, Jelatin, Antioksidantlar, Tabiiy lazzat beruvchi',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-19T10:00:00Z'
  },
  {
    id: '6',
    name: 'Lemon Jelly',
    nameUz: 'Limon jelesi',
    description: 'Tangy lemon jelly perfect for summer',
    descriptionUz: 'Yoz uchun mukammal achchiq limon jelesi',
    price: 14500,
    category: 'Citrus Jellies',
    categoryUz: 'Sitrus jeleler',
    images: [
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.4,
    reviewCount: 76,
    stock: 39,
    ingredients: 'Sugar, Lemon extract, Gelatin, Citric acid, Natural flavoring',
    ingredientsUz: 'Shakar, Limon ekstrakti, Jelatin, Limon kislotasi, Tabiiy lazzat beruvchi',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '7',
    name: 'Peach Jelly',
    nameUz: 'Shaftoli jelesi',
    description: 'Sweet peach jelly with natural fruit pieces',
    descriptionUz: 'Tabiiy meva bo\'laklari bilan shirin shaftoli jelesi',
    price: 16500,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    images: [
      'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.8,
    reviewCount: 112,
    stock: 25,
    ingredients: 'Sugar, Peach extract, Gelatin, Real peach pieces, Natural flavoring',
    ingredientsUz: 'Shakar, Shaftoli ekstrakti, Jelatin, Haqiqiy shaftoli bo\'laklari, Tabiiy lazzat beruvchi',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-21T10:00:00Z'
  },
  {
    id: '8',
    name: 'Cherry Jelly',
    nameUz: 'Olcha jelesi',
    description: 'Premium cherry jelly with intense flavor',
    descriptionUz: 'Kuchli ta\'m bilan premium olcha jelesi',
    price: 17000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.9,
    reviewCount: 143,
    stock: 31,
    ingredients: 'Sugar, Cherry extract, Gelatin, Natural flavoring, Food coloring',
    ingredientsUz: 'Shakar, Olcha ekstrakti, Jelatin, Tabiiy lazzat beruvchi, Oziq-ovqat bo\'yog\'i',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    createdAt: '2024-01-22T10:00:00Z'
  }
];