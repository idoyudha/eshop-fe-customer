"use client"

import { getOrdersAction } from "@/actions/order-action";
import { OrderList } from "@/components/order/order-list";
import { useAuth } from "@/context/auth-context";
import { Order } from "@/models/order";
import { useCallback, useEffect, useState } from "react";

export default async function OrderPage() {
    const { getAccessToken } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = useCallback(async () => {
        try {
            const accessToken = await getAccessToken();
            if (accessToken) {
                const orderData = await getOrdersAction(accessToken);
                setOrders(orderData || []);
            }
        } catch (error) {
            setOrders([]);
            console.error('Error fetching orders:', error);
        }
    }, [getAccessToken]);  
    
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <main className="pb-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">All Orders</h1>
            <OrderList orders={orders} />
        </main>
    )
}