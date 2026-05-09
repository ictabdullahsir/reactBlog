import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BlogProvider, useBlog } from './context/BlogContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminEditor from './pages/admin/AdminEditor';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useBlog();
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/post/:slug" element={<PublicLayout><PostDetail /></PublicLayout>} />
      <Route path="/category/:cat" element={<PublicLayout><CategoryPage /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
      <Route path="/admin/posts/new" element={<ProtectedRoute><AdminEditor /></ProtectedRoute>} />
      <Route path="/admin/posts/edit/:id" element={<ProtectedRoute><AdminEditor /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BlogProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </BlogProvider>
  );
}
