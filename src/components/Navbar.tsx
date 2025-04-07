
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAdminAuth } from "@/context/AdminAuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isAuthenticated } = useAdminAuth();
  const cartCount = getCartCount();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-teal-600">Online Shop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors">
            Home
          </Link>
          <Link to="/#products" className="text-gray-700 hover:text-teal-600 transition-colors">
            Products
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to={isAuthenticated ? "/admin" : "/admin/login"} className="relative">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              {isAuthenticated ? "Admin Panel" : "Admin Login"}
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" className="relative" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" className="relative" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/#products" 
              className="text-gray-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to={isAuthenticated ? "/admin" : "/admin/login"} 
              className="text-gray-700 hover:text-teal-600 transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Shield className="h-4 w-4" />
              {isAuthenticated ? "Admin Panel" : "Admin Login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
