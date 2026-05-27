import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Lazy-loaded: blog detail (includes marked Markdown parser)
const BlogDetail = lazy(() => import('./components/BlogDetail.tsx'))

// Lazy-loaded: admin pages (heavy, not needed on initial load)
const AdminLogin = lazy(() => import('./admin/AdminLogin.tsx'))
const AdminLayout = lazy(() => import('./admin/AdminLayout.tsx'))
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute.tsx'))
const Dashboard = lazy(() => import('./admin/Dashboard.tsx'))
const InquiriesPage = lazy(() => import('./admin/InquiriesPage.tsx'))
const ProductsPage = lazy(() => import('./admin/ProductsPage.tsx'))
const BlogPage = lazy(() => import('./admin/BlogPage.tsx'))
const SettingsPage = lazy(() => import('./admin/SettingsPage.tsx'))

// Loading placeholder for lazy routes
const Loading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-gray-400">Loading...</span>
    </div>
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public website */}
          <Route path="/" element={<App />} />

          {/* Blog detail */}
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin protected area */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
