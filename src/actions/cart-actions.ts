import { revalidateTag } from "next/cache";


export async function getCartAction() {
	const cart = null; // TODO: Fetch cart from the API
	if (cart) {
		return structuredClone(cart);
	}
	return null;
}
export async function addToCartAction(formData: FormData) {
	const productId = formData.get("productId");
	if (!productId || typeof productId !== "string") {
		throw new Error("Invalid product ID");
	}

	const cart = await getCartAction();

	const updatedCart = null;
	if (updatedCart) {
        // TODO: Update cart in the API
		// await setCartCookieJson({
		// 	id: updatedCart.id,
		// 	linesCount: Commerce.cartCount(updatedCart.metadata),
		// });
		return structuredClone(updatedCart);
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