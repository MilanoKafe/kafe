const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'jelai-secret-key-2024';

// In-memory database (replace with real database in production)
let users = [
  {
    id: 'admin-1',
    email: 'devolper2011@gmail.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // admin123
    fullName: 'Admin',
    phoneNumber: '947730302',
    isAdmin: true,
    isVerified: true,
    createdAt: new Date().toISOString(),
    isBlocked: false
  }
];

let products = [
  {
    id: '1',
    name: 'Strawberry Jelly',
    nameUz: 'Qulupnay jelesi',
    nameRu: 'Клубничное желе',
    description: 'Delicious strawberry flavored jelly made with real fruit extracts',
    descriptionUz: 'Haqiqiy meva ekstraktlari bilan tayyorlangan mazali qulupnay jelesi',
    descriptionRu: 'Вкусное клубничное желе из натуральных фруктовых экстрактов',
    price: 15000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    categoryRu: 'Фруктовые желе',
    images: [
      'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    ingredients: 'Sugar, Strawberry extract, Gelatin, Natural flavoring, Food coloring',
    ingredientsUz: 'Shakar, Qulupnay ekstrakti, Jelatin, Tabiiy lazzat beruvchi, Oziq-ovqat bo\'yog\'i',
    ingredientsRu: 'Сахар, экстракт клубники, желатин, натуральные ароматизаторы, пищевые красители',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Orange Jelly',
    nameUz: 'Apelsin jelesi',
    nameRu: 'Апельсиновое желе',
    description: 'Fresh orange jelly with vitamin C boost',
    descriptionUz: 'C vitamini bilan boyitilgan yangi apelsin jelesi',
    descriptionRu: 'Свежее апельсиновое желе с витамином C',
    price: 14000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    categoryRu: 'Фруктовые желе',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.6,
    reviewCount: 89,
    stock: 35,
    ingredients: 'Sugar, Orange extract, Gelatin, Vitamin C, Natural flavoring',
    ingredientsUz: 'Shakar, Apelsin ekstrakti, Jelatin, C vitamini, Tabiiy lazzat beruvchi',
    ingredientsRu: 'Сахар, экстракт апельсина, желатин, витамин C, натуральные ароматизаторы',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'Apple Jelly',
    nameUz: 'Olma jelesi',
    nameRu: 'Яблочное желе',
    description: 'Classic apple jelly with natural sweetness',
    descriptionUz: 'Tabiiy shirinlik bilan klassik olma jelesi',
    descriptionRu: 'Классическое яблочное желе с натуральной сладостью',
    price: 13000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    categoryRu: 'Фруктовые желе',
    images: [
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.5,
    reviewCount: 67,
    stock: 42,
    ingredients: 'Sugar, Apple extract, Gelatin, Natural flavoring',
    ingredientsUz: 'Shakar, Olma ekstrakti, Jelatin, Tabiiy lazzat beruvchi',
    ingredientsRu: 'Сахар, экстракт яблока, желатин, натуральные ароматизаторы',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    name: 'Mixed Berry Jelly',
    nameUz: 'Aralash rezavorlar jelesi',
    nameRu: 'Желе из смешанных ягод',
    description: 'A delightful mix of berries in one jelly',
    descriptionUz: 'Bir jeledagi rezavorlarning ajoyib aralashmasi',
    descriptionRu: 'Восхитительная смесь ягод в одном желе',
    price: 16000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    categoryRu: 'Фруктовые желе',
    images: [
      'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.9,
    reviewCount: 156,
    stock: 28,
    ingredients: 'Sugar, Mixed berry extract, Gelatin, Natural flavoring, Food coloring',
    ingredientsUz: 'Shakar, Aralash rezavor ekstrakti, Jelatin, Tabiiy lazzat beruvchi, Oziq-ovqat bo\'yog\'i',
    ingredientsRu: 'Сахар, экстракт смешанных ягод, желатин, натуральные ароматизаторы, пищевые красители',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: '5',
    name: 'Grape Jelly',
    nameUz: 'Uzum jelesi',
    nameRu: 'Виноградное желе',
    description: 'Rich grape flavored jelly with antioxidants',
    descriptionUz: 'Antioksidantlar bilan boy uzum ta\'mli jele',
    descriptionRu: 'Насыщенное виноградное желе с антиоксидантами',
    price: 15500,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    categoryRu: 'Фруктовые желе',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.7,
    reviewCount: 98,
    stock: 33,
    ingredients: 'Sugar, Grape extract, Gelatin, Antioxidants, Natural flavoring',
    ingredientsUz: 'Shakar, Uzum ekstrakti, Jelatin, Antioksidantlar, Tabiiy lazzat beruvchi',
    ingredientsRu: 'Сахар, экстракт винограда, желатин, антиоксиданты, натуральные ароматизаторы',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-19T10:00:00Z'
  },
  {
    id: '6',
    name: 'Lemon Jelly',
    nameUz: 'Limon jelesi',
    nameRu: 'Лимонное желе',
    description: 'Tangy lemon jelly perfect for summer',
    descriptionUz: 'Yoz uchun mukammal achchiq limon jelesi',
    descriptionRu: 'Острое лимонное желе, идеальное для лета',
    price: 14500,
    category: 'Citrus Jellies',
    categoryUz: 'Sitrus jeleler',
    categoryRu: 'Цитрусовые желе',
    images: [
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.4,
    reviewCount: 76,
    stock: 39,
    ingredients: 'Sugar, Lemon extract, Gelatin, Citric acid, Natural flavoring',
    ingredientsUz: 'Shakar, Limon ekstrakti, Jelatin, Limon kislotasi, Tabiiy lazzat beruvchi',
    ingredientsRu: 'Сахар, экстракт лимона, желатин, лимонная кислота, натуральные ароматизаторы',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '7',
    name: 'Peach Jelly',
    nameUz: 'Shaftoli jelesi',
    nameRu: 'Персиковое желе',
    description: 'Sweet peach jelly with natural fruit pieces',
    descriptionUz: 'Tabiiy meva bo\'laklari bilan shirin shaftoli jelesi',
    descriptionRu: 'Сладкое персиковое желе с натуральными кусочками фруктов',
    price: 16500,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    categoryRu: 'Фруктовые желе',
    images: [
      'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.8,
    reviewCount: 112,
    stock: 25,
    ingredients: 'Sugar, Peach extract, Gelatin, Real peach pieces, Natural flavoring',
    ingredientsUz: 'Shakar, Shaftoli ekstrakti, Jelatin, Haqiqiy shaftoli bo\'laklari, Tabiiy lazzat beruvchi',
    ingredientsRu: 'Сахар, экстракт персика, желатин, настоящие кусочки персика, натуральные ароматизаторы',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-21T10:00:00Z'
  },
  {
    id: '8',
    name: 'Cherry Jelly',
    nameUz: 'Olcha jelesi',
    nameRu: 'Вишневое желе',
    description: 'Premium cherry jelly with intense flavor',
    descriptionUz: 'Kuchli ta\'m bilan premium olcha jelesi',
    descriptionRu: 'Премиальное вишневое желе с насыщенным вкусом',
    price: 17000,
    category: 'Fruit Jellies',
    categoryUz: 'Mevali jeleler',
    categoryRu: 'Фруктовые желе',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.9,
    reviewCount: 143,
    stock: 31,
    ingredients: 'Sugar, Cherry extract, Gelatin, Natural flavoring, Food coloring',
    ingredientsUz: 'Shakar, Olcha ekstrakti, Jelatin, Tabiiy lazzat beruvchi, Oziq-ovqat bo\'yog\'i',
    ingredientsRu: 'Сахар, экстракт вишни, желатин, натуральные ароматизаторы, пищевые красители',
    usage: 'Ready to eat. Store in cool, dry place. Best consumed within 6 months.',
    usageUz: 'Iste\'mol uchun tayyor. Salqin, quruq joyda saqlang. 6 oy ichida iste\'mol qilish tavsiya etiladi.',
    usageRu: 'Готов к употреблению. Хранить в прохладном, сухом месте. Лучше употребить в течение 6 месяцев.',
    createdAt: '2024-01-22T10:00:00Z'
  }
];

let orders = [];
let contacts = [];
let reviews = [];

// Email transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify admin
const authenticateAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Helper function to send notifications
const sendNotification = (type, data) => {
  io.emit('notification', { type, data, timestamp: new Date().toISOString() });
};

// API Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, phoneNumber } = req.body;

    // Validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      fullName,
      phoneNumber,
      isAdmin: false,
      isVerified: true, // Auto-verify for demo
      isBlocked: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send welcome email (optional)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Jelai!',
        html: `
          <h1>Welcome to Jelai!</h1>
          <p>Thank you for registering with us, ${fullName}!</p>
          <p>Start exploring our delicious jelly products.</p>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
        isAdmin: newUser.isAdmin,
        isVerified: newUser.isVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ error: 'Account is blocked' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Product Routes
app.get('/api/products', (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sortBy, page = 1, limit = 12 } = req.query;
    
    let filteredProducts = [...products];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.nameUz.toLowerCase().includes(searchLower) ||
        product.nameRu.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.descriptionUz.toLowerCase().includes(searchLower) ||
        product.descriptionRu.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === category ||
        product.categoryUz === category ||
        product.categoryRu === category
      );
    }

    // Price filter
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => product.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseInt(maxPrice));
    }

    // Sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page: parseInt(page),
      totalPages: Math.ceil(filteredProducts.length / limit)
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get product reviews
    const productReviews = reviews.filter(r => r.productId === req.params.id);
    
    res.json({
      ...product,
      reviews: productReviews
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Review Routes
app.post('/api/products/:id/reviews', authenticateToken, (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({ error: 'Comment is required' });
    }

    // Check if product exists
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = reviews.find(r => r.productId === productId && r.userId === req.user.id);
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    // Get user info
    const user = users.find(u => u.id === req.user.id);

    // Create review
    const newReview = {
      id: uuidv4(),
      productId,
      userId: req.user.id,
      userName: user.fullName,
      rating: parseInt(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };

    reviews.push(newReview);

    // Update product rating
    const productReviews = reviews.filter(r => r.productId === productId);
    const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
    
    const productIndex = products.findIndex(p => p.id === productId);
    products[productIndex].rating = Math.round(avgRating * 10) / 10;
    products[productIndex].reviewCount = productReviews.length;

    res.status(201).json({
      message: 'Review added successfully',
      review: newReview
    });
  } catch (error) {
    console.error('Review creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Order Routes
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { items, shippingAddress, notes } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order items are required' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phoneNumber || !shippingAddress.address) {
      return res.status(400).json({ error: 'Complete shipping address is required' });
    }

    // Calculate total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.nameUz}` });
      }

      const orderItem = {
        id: uuidv4(),
        product,
        quantity: item.quantity
      };

      orderItems.push(orderItem);
      total += product.price * item.quantity;

      // Update product stock
      const productIndex = products.findIndex(p => p.id === item.productId);
      products[productIndex].stock -= item.quantity;
    }

    // Create order
    const newOrder = {
      id: uuidv4(),
      userId: req.user.id,
      items: orderItems,
      total,
      status: 'pending',
      shippingAddress,
      notes: notes || '',
      createdAt: new Date().toISOString(),
      trackingNumber: `JL${Date.now()}`
    };

    orders.push(newOrder);

    // Send notification to admin
    sendNotification('new_order', {
      orderId: newOrder.id,
      customerName: shippingAddress.fullName,
      total: newOrder.total
    });

    // Send confirmation email
    const user = users.find(u => u.id === req.user.id);
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Order Confirmation - Jelai',
        html: `
          <h1>Order Confirmation</h1>
          <p>Dear ${user.fullName},</p>
          <p>Your order #${newOrder.id.slice(-8)} has been received and is being processed.</p>
          <p>Total: ${total.toLocaleString()} so'm</p>
          <p>Tracking Number: ${newOrder.trackingNumber}</p>
          <p>Thank you for choosing Jelai!</p>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    let userOrders;
    
    if (req.user.isAdmin) {
      userOrders = orders;
    } else {
      userOrders = orders.filter(order => order.userId === req.user.id);
    }

    res.json(userOrders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/orders/:id/status', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    // Send notification to customer
    const order = orders[orderIndex];
    const customer = users.find(u => u.id === order.userId);
    
    if (customer) {
      try {
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: customer.email,
          subject: 'Order Status Update - Jelai',
          html: `
            <h1>Order Status Update</h1>
            <p>Dear ${customer.fullName},</p>
            <p>Your order #${order.id.slice(-8)} status has been updated to: <strong>${status}</strong></p>
            <p>Tracking Number: ${order.trackingNumber}</p>
            <p>Thank you for choosing Jelai!</p>
          `
        });
      } catch (emailError) {
        console.log('Email sending failed:', emailError);
      }
    }

    res.json({
      message: 'Order status updated successfully',
      order: orders[orderIndex]
    });
  } catch (error) {
    console.error('Order status update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact Routes
app.post('/api/contacts', (req, res) => {
  try {
    const { fullName, email, phoneNumber, subject, message } = req.body;

    // Validation
    if (!fullName || !email || !phoneNumber || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create contact
    const newContact = {
      id: uuidv4(),
      fullName,
      email,
      phoneNumber,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);

    // Send notification to admin
    sendNotification('new_contact', {
      contactId: newContact.id,
      name: fullName,
      subject: subject
    });

    // Send auto-reply email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Jelai',
        html: `
          <h1>Thank you for contacting us!</h1>
          <p>Dear ${fullName},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p>Your message: "${message}"</p>
          <p>Best regards,<br>Jelai Team</p>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }

    res.status(201).json({
      message: 'Contact message sent successfully',
      contact: newContact
    });
  } catch (error) {
    console.error('Contact creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/contacts', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    res.json(contacts);
  } catch (error) {
    console.error('Contacts fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/contacts/:id/reply', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const { reply } = req.body;
    const contactId = req.params.id;

    if (!reply || reply.trim().length === 0) {
      return res.status(400).json({ error: 'Reply message is required' });
    }

    const contactIndex = contacts.findIndex(c => c.id === contactId);
    if (contactIndex === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contacts[contactIndex].reply = reply.trim();
    contacts[contactIndex].status = 'replied';
    contacts[contactIndex].repliedAt = new Date().toISOString();

    const contact = contacts[contactIndex];

    // Send reply email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: contact.email,
        subject: `Re: ${contact.subject}`,
        html: `
          <h1>Reply from Jelai</h1>
          <p>Dear ${contact.fullName},</p>
          <p>Thank you for contacting us. Here is our response:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #4CAF50;">
            ${reply}
          </div>
          <p>If you have any further questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Jelai Team</p>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
    }

    res.json({
      message: 'Reply sent successfully',
      contact: contacts[contactIndex]
    });
  } catch (error) {
    console.error('Contact reply error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Routes
app.get('/api/admin/dashboard', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const today = new Date().toDateString();
    
    const stats = {
      totalUsers: users.filter(u => !u.isAdmin).length,
      totalOrders: orders.length,
      totalContacts: contacts.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      newOrdersToday: orders.filter(order => 
        new Date(order.createdAt).toDateString() === today
      ).length,
      newContactsToday: contacts.filter(contact => 
        new Date(contact.createdAt).toDateString() === today
      ).length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      newContacts: contacts.filter(contact => contact.status === 'new').length
    };

    const recentOrders = orders.slice(-5).reverse();
    const recentContacts = contacts.slice(-5).reverse();

    res.json({
      stats,
      recentOrders,
      recentContacts
    });
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/users', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const regularUsers = users.filter(u => !u.isAdmin).map(user => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt
    }));

    res.json(regularUsers);
  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/users/:id/block', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const userId = req.params.id;
    const { isBlocked } = req.body;

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (users[userIndex].isAdmin) {
      return res.status(400).json({ error: 'Cannot block admin user' });
    }

    users[userIndex].isBlocked = isBlocked;

    res.json({
      message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user: {
        id: users[userIndex].id,
        email: users[userIndex].email,
        fullName: users[userIndex].fullName,
        isBlocked: users[userIndex].isBlocked
      }
    });
  } catch (error) {
    console.error('User block/unblock error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/reviews', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const reviewsWithProducts = reviews.map(review => {
      const product = products.find(p => p.id === review.productId);
      return {
        ...review,
        productName: product ? product.nameUz : 'Unknown Product'
      };
    });

    res.json(reviewsWithProducts);
  } catch (error) {
    console.error('Reviews fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/reviews/:id', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const reviewId = req.params.id;
    
    const reviewIndex = reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const review = reviews[reviewIndex];
    reviews.splice(reviewIndex, 1);

    // Update product rating
    const productReviews = reviews.filter(r => r.productId === review.productId);
    const productIndex = products.findIndex(p => p.id === review.productId);
    
    if (productIndex !== -1) {
      if (productReviews.length > 0) {
        const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
        products[productIndex].rating = Math.round(avgRating * 10) / 10;
        products[productIndex].reviewCount = productReviews.length;
      } else {
        products[productIndex].rating = 0;
        products[productIndex].reviewCount = 0;
      }
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Review deletion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Profile Routes
app.get('/api/profile', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/profile', authenticateToken, (req, res) => {
  try {
    const { fullName, phoneNumber } = req.body;
    
    if (!fullName || !phoneNumber) {
      return res.status(400).json({ error: 'Full name and phone number are required' });
    }

    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].fullName = fullName;
    users[userIndex].phoneNumber = phoneNumber;

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: users[userIndex].id,
        email: users[userIndex].email,
        fullName: users[userIndex].fullName,
        phoneNumber: users[userIndex].phoneNumber,
        isVerified: users[userIndex].isVerified
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});