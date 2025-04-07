import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Wallet } from "lucide-react";
import { formatPrice } from "@/utils/formatters";

interface PaymentFormsProps {
    formData: {
        cardName: string;
        cardNumber: string;
        expMonth: string;
        expYear: string;
        cvv: string;
        bankName: string;
        accountNumber: string;
        routingNumber: string;
    };
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (field: string, value: string) => void;
    handlePayPalCheckout: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    isProcessing: boolean;
    getCartTotal: () => number;
}

export const PaymentForms = ({
    formData,
    paymentMethod,
    setPaymentMethod,
    handleChange,
    handleSelectChange,
    handlePayPalCheckout,
    handleSubmit,
    isProcessing,
    getCartTotal
}: PaymentFormsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                    Choose how you'd like to pay
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs
                    defaultValue="creditCard"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="w-full"
                >
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="creditCard" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Credit Card</span>
                        </TabsTrigger>
                        <TabsTrigger value="paypal" className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            <span>PayPal</span>
                        </TabsTrigger>
                        <TabsTrigger value="cashOnDelivery" className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span>Cash on Delivery</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="creditCard" className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card *</Label>
                            <Input
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expMonth">Expiry Month *</Label>
                                <Select
                                    value={formData.expMonth}
                                    onValueChange={(value) =>
                                        handleSelectChange("expMonth", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="MM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const month = i + 1;
                                            return (
                                                <SelectItem
                                                    key={month}
                                                    value={month.toString().padStart(2, "0")}
                                                >
                                                    {month.toString().padStart(2, "0")}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expYear">Expiry Year *</Label>
                                <Select
                                    value={formData.expYear}
                                    onValueChange={(value) =>
                                        handleSelectChange("expYear", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="YYYY" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => {
                                            const year = new Date().getFullYear() + i;
                                            return (
                                                <SelectItem
                                                    key={year}
                                                    value={year.toString()}
                                                >
                                                    {year}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV *</Label>
                                <Input
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    placeholder="123"
                                    maxLength={4}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="mt-4">
                        <div className="p-4 bg-blue-50 rounded-md">
                            <p className="mb-4">You'll be redirected to PayPal to complete your purchase securely.</p>
                            <Button
                                type="button"
                                onClick={handlePayPalCheckout}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Checkout with PayPal"}
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="cashOnDelivery" className="mt-4">
                        <div className="p-4 bg-gray-50 rounded-md">
                            <p>You will pay when your order is delivered.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter>
                {paymentMethod !== 'paypal' && (
                    <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : `Place Order (${formatPrice(getCartTotal())})`}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};