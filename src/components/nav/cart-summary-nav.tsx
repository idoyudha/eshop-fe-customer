"use client"

import { calculateCartTotalPrice, formatMoney } from "@/lib/utils";
import { ShoppingBagIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { CartLink } from "./cart-link";
import { getCartAction } from "@/actions/cart-actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useAuth } from "@/context/auth-context";
import { Cart } from "@/models/cart";
import { useCart } from "@/hooks/use-cart";

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
	const { carts } = useCart();

	if (!carts) {
		return <CartFallback />;
	}

	const totalPrice = calculateCartTotalPrice(carts);
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
									price: totalPrice,
									currency: "USD",
								})}
							</span>
						</CartLink>
					</div>
				</TooltipTrigger>
				<TooltipContent side="left" sideOffset={25}>
					<p>Total Items { totalItems }</p>
					<p>
						{"Total"}: {formatMoney({ price: totalPrice, currency: "USD" })}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};