
import { Link } from "react-router-dom";
import { Product } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-lg mb-1 hover:text-teal-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-gray-500 text-sm mb-2 block">
            {product.category}
          </span>
          <p className="text-xl font-bold text-teal-600 mb-3">
            {formatPrice(product.price)}
          </p>
        </div>
        <Button 
          onClick={() => addToCart(product, 1)}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
