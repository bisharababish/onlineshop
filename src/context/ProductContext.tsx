import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: number;
}

interface ProductContextType {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Sample products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation and long battery life.',
    price: 129.99,
    imageUrl: 'https://picsum.photos/id/3/400/400',
    category: 'Electronics',
    inStock: 15
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Track your fitness goals and stay connected with this sleek smart watch.',
    price: 249.99,
    imageUrl: 'https://picsum.photos/id/26/400/400',
    category: 'Electronics',
    inStock: 8
  },
  {
    id: '3',
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with RFID protection.',
    price: 49.99,
    imageUrl: 'https://picsum.photos/id/103/400/400',
    category: 'Accessories',
    inStock: 20
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with amazing sound quality and 16-hour battery life.',
    price: 79.99,
    imageUrl: 'https://picsum.photos/id/606/400/400',
    category: 'Electronics',
    inStock: 12
  }
];

// Helper function to validate product structure
const isValidProduct = (product: unknown): product is Product => {
  return (
    typeof product === 'object' &&
    product !== null &&
    'id' in product &&
    typeof (product as Product).id === 'string' &&
    'name' in product &&
    typeof (product as Product).name === 'string' &&
    'description' in product &&
    typeof (product as Product).description === 'string' &&
    'price' in product &&
    typeof (product as Product).price === 'number' &&
    !isNaN((product as Product).price) &&
    'imageUrl' in product &&
    typeof (product as Product).imageUrl === 'string' &&
    'category' in product &&
    typeof (product as Product).category === 'string' &&
    'inStock' in product &&
    typeof (product as Product).inStock === 'number' &&
    !isNaN((product as Product).inStock)
  );
};

// Helper function to validate products array
const isValidProductsArray = (products: unknown[]): products is Product[] => {
  return Array.isArray(products) && products.every(isValidProduct);
};

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage or use defaults
  useEffect(() => {
    try {
      setLoading(true);
      const savedProducts = localStorage.getItem('products');

      if (savedProducts) {
        try {
          const parsedProducts = JSON.parse(savedProducts);

          // Validate product structure
          if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
            if (isValidProductsArray(parsedProducts)) {
              setProducts(parsedProducts);
              console.log("Loaded products from localStorage:", parsedProducts);
            } else {
              console.warn("Invalid product structure in localStorage, using defaults");
              setProducts(initialProducts);
              localStorage.setItem('products', JSON.stringify(initialProducts));
            }
          } else {
            console.log("Empty or invalid products array in localStorage, using defaults");
            setProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
          }
        } catch (parseError) {
          console.error("Error parsing products from localStorage:", parseError);
          setProducts(initialProducts);
          localStorage.setItem('products', JSON.stringify(initialProducts));
        }
      } else {
        console.log("No products in localStorage, using defaults");
        setProducts(initialProducts);
        localStorage.setItem('products', JSON.stringify(initialProducts));
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts(initialProducts);
      try {
        localStorage.setItem('products', JSON.stringify(initialProducts));
      } catch (storageError) {
        console.error("Error saving initial products to localStorage:", storageError);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('products', JSON.stringify(products));
        console.log("Saved products to localStorage:", products);
      } catch (error) {
        console.error("Error saving products to localStorage:", error);
        toast.error("Failed to save product changes");
      }
    }
  }, [products, loading]);

  const getProduct = (id: string) => {
    if (!id) return undefined;
    return products.find(product => product.id === id);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    try {
      // Validate required fields
      if (!product.name || !product.category) {
        toast.error("Product name and category are required");
        return;
      }

      // Ensure valid number values
      const price = typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0;
      const inStock = typeof product.inStock === 'number' ? product.inStock : parseInt(String(product.inStock)) || 0;

      // Ensure valid image URL
      const imageUrl = product.imageUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/400/400`;

      const newProduct = {
        ...product,
        id: Date.now().toString(),
        price: price,
        inStock: inStock,
        imageUrl: imageUrl
      };

      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added successfully');
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    try {
      if (!id) {
        toast.error("Product ID is required for updates");
        return;
      }

      // Ensure valid number values if present
      const fieldsToUpdate: Partial<Product> = { ...updatedFields };

      if (fieldsToUpdate.price !== undefined) {
        fieldsToUpdate.price = typeof fieldsToUpdate.price === 'number'
          ? fieldsToUpdate.price
          : parseFloat(String(fieldsToUpdate.price)) || 0;
      }

      if (fieldsToUpdate.inStock !== undefined) {
        fieldsToUpdate.inStock = typeof fieldsToUpdate.inStock === 'number'
          ? fieldsToUpdate.inStock
          : parseInt(String(fieldsToUpdate.inStock)) || 0;
      }

      setProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...fieldsToUpdate } : product
        )
      );// Don't show a toast when updating stock during checkout
      if (!('inStock' in updatedFields && Object.keys(updatedFields).length === 1)) {
        toast.success('Product updated successfully');
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const deleteProduct = (id: string) => {
    try {
      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      getProduct,
      addProduct,
      updateProduct,
      deleteProduct,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextType {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}