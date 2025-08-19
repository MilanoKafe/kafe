export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  nameUz: string;
  description: string;
  descriptionUz: string;
  price: number;
  category: string;
  categoryUz: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  ingredients: string;
  ingredientsUz: string;
  usage: string;
  usageUz: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    phoneNumber: string;
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
  trackingNumber?: string;
}

export interface Contact {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}