
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { MenuIcon, Settings, LogOut, Package, Home } from "lucide-react";
import { useState } from "react";

const AdminHeader = () => {
  const { logout, adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/admin" className="text-xl font-bold">
        Online Shop Admin
        </Link>
      </div>

      {}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
          Dashboard
        </Link>
        <Link to="/admin/products" className="text-gray-300 hover:text-white transition-colors">
          Products
        </Link>
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">
          <Home className="h-4 w-4 inline mr-1" /> View Site
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <span className="text-sm text-gray-400">
          Logged in as: <span className="font-medium text-white">{adminUser}</span>
        </span>
        <Button 
          variant="ghost" 
          className="text-gray-300 hover:text-white" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      {}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MenuIcon className="h-5 w-5" />
      </Button>

      {}
      {isMenuOpen && (
        <div className="absolute right-0 top-16 z-50 w-48 bg-gray-900 shadow-lg rounded-md py-2 flex flex-col">
          <div className="px-4 py-2 border-b border-gray-800 text-sm text-gray-400">
            Logged in as: <span className="font-medium text-white block">{adminUser}</span>
          </div>
          <Link 
            to="/admin" 
            className="px-4 py-2 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/products" 
            className="px-4 py-2 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            <Package className="h-4 w-4 inline mr-2" /> Products
          </Link>
          <Link 
            to="/" 
            className="px-4 py-2 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="h-4 w-4 inline mr-2" /> View Site
          </Link>
          <Button 
            variant="ghost" 
            className="justify-start px-4 py-2 hover:bg-gray-800 rounded-none text-white" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
