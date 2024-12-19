import { getCartAction } from "@/actions/cart-actions";
import { CheckoutCart } from "@/components/checkout/checkout-cart";

export default async function CartPage() {
	const carts = await getCartAction();
	if (!carts) {
		return null;
	}

	return <CheckoutCart carts={carts} />;
}