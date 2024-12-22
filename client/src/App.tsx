import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Modal from '@/components/modal/Modal';
import Toast from '@/components/toast/Toast';
import Loading from '@/components/loading/Loading';
import CustomQueryClientProvider from '@/providers/CustomQueryClientProvider';

import HomePage from '@/pages/home/HomePage';
import CategoriesScreen from './pages/categories/page';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import ProfileScreen from './pages/profile/page';
import ProductDetailScreen from './pages/products/[slug]/page';
import CartScreen from './pages/cart/page';

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <CustomQueryClientProvider>
        <Router>
          <Loading />
          <Header />
          <Modal />
          <Toast />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/categories'
              element={
                <ProtectedRoute>
                  <CategoriesScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/:path'
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/product/:slug'
              element={
                <ProtectedRoute>
                  <ProductDetailScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/cart'
              element={
                <ProtectedRoute>
                  <CartScreen />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CustomQueryClientProvider>
    </Suspense>
  );
}
