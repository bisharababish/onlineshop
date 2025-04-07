import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log("App component initializing");

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AdminAuthProvider>
            <ProductProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute>
                        <AdminProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/new"
                    element={
                      <ProtectedRoute>
                        <AdminEditProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/:id"
                    element={
                      <ProtectedRoute>
                        <AdminEditProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CartProvider>
            </ProductProvider>
          </AdminAuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
