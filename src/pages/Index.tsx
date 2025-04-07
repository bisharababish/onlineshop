
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import ProductGrid from "@/components/ProductGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Index = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Extract unique categories from products
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Online Shop</h1>
                <p className="text-xl mb-6">Discover amazing products at great prices!</p>
                <a 
                  href="#products" 
                  className="bg-white text-teal-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  Shop Now
                </a>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src="https://picsum.photos/id/21/600/400" 
                  alt="Shopping made easy" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((category, index) => (
                category !== "All" && (
                  <motion.a 
                    key={index}
                    href="#products"
                    onClick={() => setCategoryFilter(category)}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-teal-600 text-lg mb-2 font-medium">{category}</div>
                    <p className="text-gray-600 text-sm">Shop Now</p>
                  </motion.a>
                )
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Our Products</h2>

            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No products found matching your criteria
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
