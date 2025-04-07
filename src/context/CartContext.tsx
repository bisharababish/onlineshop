
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './ProductContext';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setItems(parsedCart);
            console.log("Cart loaded from localStorage:", parsedCart);
          }
        } catch (e) {
          console.error('Error parsing cart data', e);
          localStorage.removeItem('cart');
        }
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!product) {
      console.error("Cannot add undefined product to cart");
      return;
    }

    if (product.inStock < quantity) {
      toast.error(`Sorry, only ${product.inStock} items available`);
      return;
    }

    setItems(prevItems => {
      // Check if product is already in cart
      const exists = prevItems.find(item => item.product.id === product.id);

      if (exists) {
        // Check if we have enough stock for the increased quantity
        const newQuantity = exists.quantity + quantity;
        if (product.inStock < newQuantity) {
          toast.error(`Sorry, only ${product.inStock} items available`);
          return prevItems;
        }

        // Update quantity if product exists
        return prevItems.map(item =>
          item.product.id === product.id ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Add new item if product doesn't exist
        return [...prevItems, { product, quantity }];
      }
    });

    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems => {
      const productItem = prevItems.find(item => item.product.id === productId);

      if (productItem && productItem.product.inStock < quantity) {
        toast.error(`Sorry, only ${productItem.product.inStock} items available`);
        return prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: productItem.product.inStock }
            : item
        );
      }

      return prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    try {
      setItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}