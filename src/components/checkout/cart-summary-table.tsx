"use client"

import { calculateCartTotalPrice, formatMoney } from "@/lib/utils";
import { Cart } from "@/models/cart";
import { useOptimistic } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";
import { EshopLink } from "../eshop-link";
import { CartItemLineTotal, CartItemQuantity } from "./cart-items.client";

export const CartSummaryTable = ({carts}: {carts: Cart[]}) => {
    const [optimisticCart, dispatchOptimisticCartAction] = useOptimistic(
		carts,
		(prevCart, action: { productId: string; action: "INCREASE" | "DECREASE" }) => {
			const modifier = action.action === "INCREASE" ? 1 : -1;

			return {
				...prevCart,
				items: prevCart.map((cart) => {
					if (cart.id === action.productId) {
						return { ...cart, quantity: cart.product_quantity + modifier };
					}
					return cart;
				}),
			};
		},
	);

    const totalPrice = calculateCartTotalPrice(optimisticCart);
    return (
        <form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-24 sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className="">Product</TableHead>
						<TableHead className="w-1/6 min-w-32">Price</TableHead>
						<TableHead className="w-1/6 min-w-32">Quantity</TableHead>
						<TableHead className="w-1/6 min-w-32 text-right">Total</TableHead>
                    </TableRow>
                    <TableBody>
                        {optimisticCart.map((cart) => {
                            return (
                                <TableRow key={cart.id}>
                                    <TableCell className="hidden sm:table-cell sm:w-24">
                                        {cart.product_image && (
                                            <Image
                                                className="aspect-square rounded-md object-cover"
                                                src={cart.product_image}
                                                width={96}
                                                height={96}
                                                alt=""
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <EshopLink
                                            className="transition-colors hover:text-muted-foreground"
                                            href={`/product/${cart.product_id}`}
                                        >
                                            {cart.product_name}
                                        </EshopLink>
                                    </TableCell>
                                    <TableCell>
                                        {formatMoney({
                                            price: totalPrice,
                                            currency: "USD",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <CartItemQuantity
                                            cartId={cart.id}
                                            quantity={cart.product_quantity}
                                            productId={cart.product_id}
                                            onChange={dispatchOptimisticCartAction}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <CartItemLineTotal
                                            quantity={cart.product_quantity}
                                            unitAmount={cart.product_price ?? 0}
                                            productId={cart.product_id}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </TableHeader>
            </Table>
        </form>
    )
}