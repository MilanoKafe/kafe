const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('jelai_token');
};

// Helper function to make authenticated requests
const makeRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
  }) => {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// Products API
export const productsAPI = {
  getProducts: async (params?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    return makeRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getProduct: async (id: string) => {
    return makeRequest(`/products/${id}`);
  },

  addReview: async (productId: string, review: { rating: number; comment: string }) => {
    return makeRequest(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  },
};

// Orders API
export const ordersAPI = {
  createOrder: async (orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: {
      fullName: string;
      phoneNumber: string;
      address: string;
      city: string;
    };
    notes?: string;
  }) => {
    return makeRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getOrders: async () => {
    return makeRequest('/orders');
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    return makeRequest(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Contacts API
export const contactsAPI = {
  createContact: async (contactData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
  }) => {
    return makeRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  getContacts: async () => {
    return makeRequest('/contacts');
  },

  replyToContact: async (contactId: string, reply: string) => {
    return makeRequest(`/contacts/${contactId}/reply`, {
      method: 'PUT',
      body: JSON.stringify({ reply }),
    });
  },
};

// Admin API
export const adminAPI = {
  getDashboard: async () => {
    return makeRequest('/admin/dashboard');
  },

  getUsers: async () => {
    return makeRequest('/admin/users');
  },

  blockUser: async (userId: string, isBlocked: boolean) => {
    return makeRequest(`/admin/users/${userId}/block`, {
      method: 'PUT',
      body: JSON.stringify({ isBlocked }),
    });
  },

  getReviews: async () => {
    return makeRequest('/admin/reviews');
  },

  deleteReview: async (reviewId: string) => {
    return makeRequest(`/admin/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  },
};

// Profile API
export const profileAPI = {
  getProfile: async () => {
    return makeRequest('/profile');
  },

  updateProfile: async (profileData: {
    fullName: string;
    phoneNumber: string;
  }) => {
    return makeRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};