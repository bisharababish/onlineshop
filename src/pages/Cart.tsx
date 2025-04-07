
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Trash,
  MinusIcon, 
  PlusIcon,
  ShoppingBag,
} from "lucide-react";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

          {items.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-medium text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.product.id}>
                          <TableCell>
                            <Link to={`/product/${item.product.id}`}>
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-medium hover:text-teal-600 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-500">
                              {item.product.category}
                            </p>
                          </TableCell>
                          <TableCell className="text-right">
                            {formatPrice(item.product.price)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <MinusIcon className="h-3 w-3" />
                              </Button>
                              <span className="mx-2 w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={item.quantity >= item.product.inStock}
                              >
                                <PlusIcon className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-teal-600">{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link
                      to="/"
                      className="text-sm text-teal-600 hover:underline"
                    >
                      or continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
