import { getBaseUrl } from "@/lib/utils";
import { Order, OrderView } from "@/models/order";

const orderService = 'ORDER_SERVICE';

interface OrdersResponse {
    code: number;
    data: OrderView[];
    message: string;
}

export async function getOrdersAction(accessToken: string): Promise<OrderView[]> {
    var orderServiceBaseUrl = getBaseUrl(orderService)
    if (!orderServiceBaseUrl) {
        orderServiceBaseUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE || "http://localhost:2003"
    }

    const response = await fetch(`${orderServiceBaseUrl}/v1/orders/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const orders: OrdersResponse = await response.json();

    if (orders && orders.data) {
        return structuredClone(orders.data);
    }

    return [];
}

interface OrderResponse {
    code: number;
    data: OrderView;
    message: string;
}

export async function getOrderAction(accessToken: string, id: string): Promise<OrderView> {
    var orderServiceBaseUrl = getBaseUrl(orderService)
    const response = await fetch(`${orderServiceBaseUrl}/v1/orders/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const orders: OrderResponse = await response.json();

    if (orders && orders.data) {
        return structuredClone(orders.data);
    }

    return {} as OrderView;
}