
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">QuickShop</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for quality products at affordable prices.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#products" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <address className="text-gray-600 not-italic">
              <p>123 Shopping Street</p>
              <p>Commerce City, ST 12345</p>
              <p>Email: info@quickshop.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {currentYear} QuickShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
