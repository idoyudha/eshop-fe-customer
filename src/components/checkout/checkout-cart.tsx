import { Cart } from "@/models/cart";

export const CheckoutCart = async ({ carts }: { carts: Cart[] }) => {
    return (
		<section className="max-w-md pb-12">
			<h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
			<p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below</p>
			{/* <StripePayment
				shippingRateId={cart.cart.metadata.shippingRateId}
				shippingRates={structuredClone(shippingRates)}
				allProductsDigital={cart.lines.every((line) =>
					isDefined(line.product.shippable) ? !line.product.shippable : false,
				)}
				locale={locale}
			/> */}
		</section>
	);
}