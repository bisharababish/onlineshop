import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatters";
import { motion } from "framer-motion";

interface OrderConfirmationProps {
    orderNumber: string;
    getCartTotal: () => number;
    formData: {
        firstName: string;
        lastName: string;
        email: string;
    };
    handleFinishOrder: () => void;
}

export const OrderConfirmation = ({
    orderNumber,
    getCartTotal,
    formData,
    handleFinishOrder
}: OrderConfirmationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-6"
        >
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-green-600">Order Confirmed!</CardTitle>
                    <CardDescription>Thank you for your purchase</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p>Your order #{orderNumber} has been placed successfully.</p>
                    </div>

                    <div className="border-t border-b py-4">
                        <p className="text-sm text-gray-500 mb-2">Order Summary</p>
                        <p>Total: <span className="font-semibold">{formatPrice(getCartTotal())}</span></p>
                        <p>Shipping to: <span className="font-semibold">{formData.firstName} {formData.lastName}</span></p>
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>A confirmation email has been sent to <span className="font-semibold">{formData.email}</span></p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleFinishOrder} className="w-full bg-teal-600 hover:bg-teal-700">
                        Continue Shopping
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
