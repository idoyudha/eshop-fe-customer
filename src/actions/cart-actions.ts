import { getBaseUrl } from "@/lib/utils";
import { Cart } from "@/models/cart";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const cartService = 'CART_SERVICE';

interface CartsResponse {
	code: number;
	data: Cart[];
	message: string;
}

export async function getCartAction(): Promise<Cart[] | null> {
	const cart = null; // TODO: Fetch cart from the API
	if (cart) {
		return structuredClone(cart);
	}
	return cart;
}

interface CartResponse {
	code: number;
	data: Cart;
	message: string;
}

export interface createCartRequest {
	product_id: string
	product_name: string
	product_price: number
	product_quantity: number
	note: string
}

export async function addToCartAction(data: createCartRequest, router: AppRouterInstance, accessToken: string): Promise<Cart | null> {
	try {
		var cartServiceBaseUrl = getBaseUrl(cartService)
		if (!cartServiceBaseUrl) {
			cartServiceBaseUrl = process.env.NEXT_PUBLIC_CART_SERVICE || "http://localhost:2002"
		}
		const response = await fetch(`${cartServiceBaseUrl}/v1/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
            },
			body: JSON.stringify(data),
        });

		if (response.status === 401) {
            router.push(`/auth/login`);
            return null;
		}

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cart: CartResponse = await response.json();
        if (cart && cart.data) {
            return structuredClone(cart.data);
        }

        return null;
	} catch (error) {
        console.error('Error create cart:', error);
        return null;
    }
}