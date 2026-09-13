import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

// The dashboard pulls in charts and admin-only code. Loading it only when an
// admin visits these routes keeps the public site much lighter on mobile.
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));

function AdminRouteLoader({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-graphite" aria-label="Loading admin area" />}>
      {children}
    </Suspense>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <Route path="admin/login" element={<AdminRouteLoader><AdminLogin /></AdminRouteLoader>} />
      <Route
        path="admin"
        element={
          <AdminRouteLoader>
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          </AdminRouteLoader>
        }
      />
    </Routes>
  );
}
