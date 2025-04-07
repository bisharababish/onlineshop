import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatters";
import { Product } from "@/context/ProductContext";

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderSummaryProps {
  items: CartItem[];
  getCartTotal: () => number;
}

export const OrderSummary = ({ items, getCartTotal }: OrderSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center"
          >
            <div className="flex items-center">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
            <span>
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-teal-600">
              {formatPrice(getCartTotal())}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
