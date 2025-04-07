import { toast } from "sonner";

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export const sendConfirmationEmail = async (
    email: string,
    orderNum: string,
    orderItems: OrderItem[],
    total: number
) => {
    // In a real app, this would make an API call to send an email
    // For demonstration purposes, we'll simulate this process
    console.log(`Sending confirmation email to ${email} for order ${orderNum}`);
    console.log("Order details:", orderItems);
    console.log("Order total:", total);

    // We'll simulate a successful email sending
    toast.success("Order confirmation email sent");
    return true;
};
