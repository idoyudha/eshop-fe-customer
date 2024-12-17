import { formatMoney } from "@/lib/utils";
import { ShoppingBagIcon } from "lucide-react";
import { Suspense } from "react";
import { CartLink } from "./cart-link";
import { getCartAction } from "@/actions/cart-actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const CartFallback = () => (
	<div className="h-6 w-6 opacity-30">
		<ShoppingBagIcon />
	</div>
);

export const CartSummaryNav = () => {
	return (
		<Suspense fallback={<CartFallback />}>
			<CartSummaryNavInner />
		</Suspense>
	);
};

const CartSummaryNavInner = async () => {
	const carts = await getCartAction();
	if (!carts) {
		return <CartFallback />;
	}
	if (!carts) {
		return <CartFallback />;
	}

	const total = carts.reduce((acc, cart) => acc + (cart.product_price * cart.product_quantity), 0);
	const totalItems = carts.reduce((acc, cart) => acc + cart.product_quantity, 0);

	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<div>
						<CartLink>
							<ShoppingBagIcon />
							<span className="absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-center text-xs">
								<span className="sr-only">Total Items: </span>
								{totalItems}
							</span>
							<span className="sr-only">
								{"Total"}:{" "}
								{formatMoney({
									price: total,
									currency: "IDR",
								})}
							</span>
						</CartLink>
					</div>
				</TooltipTrigger>
				<TooltipContent side="left" sideOffset={25}>
					<p>Total Items { totalItems }</p>
					<p>
						{"Total"}: {formatMoney({ price: total, currency: "IDR" })}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};