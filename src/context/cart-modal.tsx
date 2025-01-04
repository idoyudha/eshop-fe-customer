"use client";

import { invariant } from "@/lib/utils";
import { Cart } from "@/models/cart";
import { usePathname } from "next/navigation";
import { type ReactNode, createContext, use, useCallback, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { getCartAction } from "@/actions/cart-actions";

type CartModalProviderValue = { 
	open: boolean; 
	setOpen: (open: boolean) => void,
	carts: Cart[]
	setCarts: (carts: Cart[]) => void
	isLoading: boolean
	refreshCart: () => Promise<void>
};
const CartModalContext = createContext<CartModalProviderValue | null>(null);

export const CartModalProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [carts, setCarts] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState(true);
	const { getAccessToken } = useAuth();
	const pathname = usePathname();

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

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<CartModalContext.Provider 
			value={{ 
				open, 
				setOpen,
				carts,
				setCarts,
				isLoading,
				refreshCart: fetchCart
			}}
		>
			{children}
		</CartModalContext.Provider>
	)
};

export const useCartModal = () => {
	const ctx = use(CartModalContext);
	invariant(ctx, "useCartModal must be used within a provider ");
	return ctx;
};

export const useCart = () => {
	const ctx = use(CartModalContext);
	invariant(ctx, "useCart must be used within a provider ");
	
	const { carts, setCarts, isLoading, refreshCart } = ctx;
    return { carts, setCarts, isLoading, refreshCart };
};