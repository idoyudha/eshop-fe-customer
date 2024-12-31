"use client"

import { Order } from "@/models/order";
import { OrderCard } from "./order-card";
import { useAuth } from "@/context/auth-context";
import { useCallback, useEffect, useState } from "react";
import { getOrdersAction } from "@/actions/order-action";

export const OrderList = () => {
    const { getAccessToken } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            const accessToken = await getAccessToken();
            if (accessToken) {
                const orderData = await getOrdersAction(accessToken);
                setOrders(orderData || []);
            }
        } catch (error) {
            setOrders([]);
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    }, [getAccessToken]);  
    
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <ul className="mt-6 gap-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </ul>
        </>
    )
}