import { Order } from "@/models/order";

const orderService = 'ORDER_SERVICE';

export async function getOrdersAction(): Promise<Order[] | null> {
    const cart = null; // TODO: Fetch cart from the API
    if (cart) {
        return structuredClone(cart);
    }
    return cart;
}