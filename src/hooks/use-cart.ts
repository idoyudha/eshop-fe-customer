"use client"

import { getCartAction } from "@/actions/cart-actions";
import { useAuth } from "@/context/auth-context";
import { Cart } from "@/models/cart";
import { useEffect, useState } from "react";

export const useCart = () => {
    const { getAccessToken } = useAuth();
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const accessToken = await getAccessToken();
                if (accessToken) {
                    const cartData = await getCartAction(accessToken);
                    setCarts(cartData || []);
                }
            } catch (error) {
                setCarts([]);
                console.error('Error fetching cart:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, [getAccessToken]);

    return {
        carts,
        setCarts,
        isLoading
    };
}