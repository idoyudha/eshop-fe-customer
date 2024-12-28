import { useAuth } from "@/context/auth-context";
import { Cart } from "@/models/cart";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


const cartService = process.env.NEXT_PUBLIC_CART_SERVICE;

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
		const response = await fetch(`${cartService}/v1/carts`, {
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

export async function increaseQuantity(productId: string) {
	const cart = await getCartAction();
	if (!cart) {
		throw new Error("Cart not found");
	}
	// await Commerce.cartChangeQuantity({
	// 	productId,
	// 	cartId: cart.cart.id,
	// 	operation: "INCREASE",
	// });
}

export async function decreaseQuantity(productId: string) {
	const cart = await getCartAction();
	if (!cart) {
		throw new Error("Cart not found");
	}
	// await Commerce.cartChangeQuantity({
	// 	productId,
	// 	cartId: cart.cart.id,
	// 	operation: "DECREASE",
	// });
}

export async function setQuantity({
	productId,
	cartId,
	quantity,
}: {
	productId: string;
	cartId: string;
	quantity: number;
}) {
	const cart = await getCartAction();
	if (!cart) {
		throw new Error("Cart not found");
	}
	// await Commerce.cartSetQuantity({ productId, cartId, quantity });
}