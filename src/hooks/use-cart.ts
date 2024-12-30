"use client"

import { getCartAction } from "@/actions/cart-actions";
import { useAuth } from "@/context/auth-context";
import { Cart } from "@/models/cart";
import { useCallback, useEffect, useState } from "react";

export const useCart = () => {
    const { getAccessToken } = useAuth();
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCart = useCallback(async () => {
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
    }, [getAccessToken]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return {
        carts,
        setCarts,
        isLoading,
        refreshCart: fetchCart
    };
}