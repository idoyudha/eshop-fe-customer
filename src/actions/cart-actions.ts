import { getBaseUrl } from "@/lib/utils";
import { Cart } from "@/models/cart";
import { Address } from "@/models/order";

const cartService = 'CART_SERVICE';

interface CartsResponse {
	code: number;
	data: Cart[];
	message: string;
}

export async function getCartAction(accessToken: string): Promise<Cart[]> {
	try {
		const cartServiceBaseUrl = getBaseUrl(cartService)

		const response = await fetch(`${cartServiceBaseUrl}/v1/carts/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const carts: CartsResponse = await response.json();
        if (carts && carts.data) {
            return structuredClone(carts.data);
        }

		return [];
	} catch (error) {
        console.error('Error create cart:', error);
		return [];
    }
}

interface CartResponse {
	code: number;
	data: Cart;
	message: string;
}

export interface createCartRequest {
	product_id: string
	product_name: string
    product_image_url: string
	product_price: number
	product_quantity: number
	note: string
}

export async function addToCartAction(data: createCartRequest, accessToken: string): Promise<Cart | null> {
	try {
		const cartServiceBaseUrl = getBaseUrl(cartService)
		const response = await fetch(`${cartServiceBaseUrl}/v1/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
            },
			body: JSON.stringify(data),
        });

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

export interface updateCartRequest {
    cart_id: string
	product_quantity: number
	note: string
}

export async function updateCartAction(data: updateCartRequest, accessToken: string): Promise<Cart | null> {
    try {
		const cartServiceBaseUrl = getBaseUrl(cartService)
		const response = await fetch(`${cartServiceBaseUrl}/v1/carts/${data.cart_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
            },
			body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cart: CartResponse = await response.json();
        if (cart && cart.data) {
            return structuredClone(cart.data);
        }

        return null;
	} catch (error) {
        console.error('Error update cart:', error);
        return null;
    }
}

export async function deleteCartAction(id: string, accessToken: string): Promise<null> {
    try {
        const cartServiceBaseUrl = getBaseUrl(cartService)
        const response = await fetch(`${cartServiceBaseUrl}/v1/carts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return null;
    } catch (error) {
        console.error('Error delete cart:', error);
        return null;
    }
}

export interface CartCheckoutRequest {
    cart_ids: string[]
    address: Address
}

export async function checkoutCartAction(data: CartCheckoutRequest, accessToken: string): Promise<void> {
    const cartServiceBaseUrl = getBaseUrl(cartService)
    const response = await fetch(`${cartServiceBaseUrl}/v1/carts/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `checkout failed with status: ${response.status}`);
    }
}