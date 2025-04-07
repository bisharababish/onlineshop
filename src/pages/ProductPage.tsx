
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MinusIcon, PlusIcon } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  
  const product = getProduct(id || '');

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const incrementQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-teal-600 hover:underline flex items-center"
            >
              &larr; Back
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto rounded-lg shadow-md object-cover"
                style={{ maxHeight: "500px" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gray-500">{product.category}</span>
              <h1 className="text-3xl font-bold mt-1 mb-4">{product.name}</h1>
              <div className="text-2xl font-bold text-teal-600 mb-4">
                {formatPrice(product.price)}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-500 mb-2">Quantity</div>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.inStock}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-4 text-sm">
                <span className={product.inStock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.inStock > 0 
                    ? `${product.inStock} in stock` 
                    : "Out of stock"}
                </span>
              </div>
              
              <Button 
                className="w-full md:w-auto bg-teal-600 hover:bg-teal-700"
                onClick={handleAddToCart}
                disabled={product.inStock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
