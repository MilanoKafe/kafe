import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminContacts from './pages/admin/AdminContacts';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationSystem />
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Main App Routes */}
              <Route path="/*" element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="contacts" element={<AdminContacts />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
