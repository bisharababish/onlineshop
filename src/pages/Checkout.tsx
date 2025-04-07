import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { toast } from "sonner";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForms } from "@/components/checkout/PaymentForms";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { sendConfirmationEmail } from "@/services/emailService";
import { generateOrderNumber } from "@/utils/orderUtils";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { updateProduct } = useProducts();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });

  // Redirect to cart if empty
  if (items.length === 0 && !orderComplete) {
    navigate("/cart");
    return null;
  }

  // Check if any item is out of stock
  const outOfStockItem = items.find(item => item.product.inStock < item.quantity);
  if (outOfStockItem && !orderComplete) {
    toast.error(`${outOfStockItem.product.name} is out of stock or has insufficient quantity`);
    navigate("/cart");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Credit card validation
    if (paymentMethod === "creditCard") {
      if (!formData.cardName || !formData.cardNumber || !formData.expMonth ||
        !formData.expYear || !formData.cvv) {
        toast.error("Please fill in all payment details");
        return;
      }

      // Validate card number format
      const cardRegex = /^[0-9]{13,19}$/;
      const cardNumberWithoutSpaces = formData.cardNumber.replace(/\s/g, "");
      if (!cardRegex.test(cardNumberWithoutSpaces)) {
        toast.error("Please enter a valid card number");
        return;
      }

      // Validate CVV
      const cvvRegex = /^[0-9]{3,4}$/;
      if (!cvvRegex.test(formData.cvv)) {
        toast.error("Please enter a valid CVV");
        return;
      }
    }

    // Bank transfer validation
    if (paymentMethod === "bankTransfer") {
      if (!formData.bankName || !formData.accountNumber || !formData.routingNumber) {
        toast.error("Please fill in all bank details");
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate an order number
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);

      // Update product stock
      items.forEach(item => {
        const newStock = item.product.inStock - item.quantity;
        updateProduct(item.product.id, { inStock: newStock });
      });

      // Send confirmation email
      await sendConfirmationEmail(
        formData.email,
        newOrderNumber,
        items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        getCartTotal()
      );

      // Show success dialog instead of clearing cart immediately
      setOrderComplete(true);

      // Process the order
      toast.success("Payment processed successfully!");

    } catch (error) {
      toast.error("There was an error processing your payment. Please try again.");
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };

  const handlePayPalCheckout = async () => {
    setIsProcessing(true);

    try {
      // Here you would typically redirect to PayPal or handle the PayPal integration
      // For this demo, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate an order number
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);

      // Update product stock
      items.forEach(item => {
        const newStock = item.product.inStock - item.quantity;
        updateProduct(item.product.id, { inStock: newStock });
      });

      // Send confirmation email
      await sendConfirmationEmail(
        formData.email,
        newOrderNumber,
        items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        getCartTotal()
      );

      // Show success dialog instead of clearing cart immediately
      setOrderComplete(true);
      toast.success("PayPal payment successful!");

    } catch (error) {
      toast.error("PayPal payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleFinishOrder = () => {
    // Now we clear the cart and redirect
    clearCart();
    navigate("/");
  };

  // If order is complete, show the confirmation dialog
  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <OrderConfirmation
            orderNumber={orderNumber}
            getCartTotal={getCartTotal}
            formData={formData}
            handleFinishOrder={handleFinishOrder}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit}>
                <ShippingForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                />

                <PaymentForms
                  formData={formData}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                  handlePayPalCheckout={handlePayPalCheckout}
                  handleSubmit={handleSubmit}
                  isProcessing={isProcessing}
                  getCartTotal={getCartTotal}
                />
              </form>
            </motion.div>

            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OrderSummary
                items={items}
                getCartTotal={getCartTotal}
              />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
