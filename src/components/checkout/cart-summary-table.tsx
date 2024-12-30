"use client"

import { calculateCartTotalPrice, formatMoney } from "@/lib/utils";
import { Cart } from "@/models/cart";
import { useEffect, useOptimistic, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";
import { EshopLink } from "../eshop-link";
import { CartItemLineTotal, CartItemQuantity } from "./cart-items.client";
import { useAuth } from "@/context/auth-context";
import { getCartAction } from "@/actions/cart-actions";
import { CartEmpty } from "./cart-empty";

export const CartSummaryTable = () => {
    const { getAccessToken } = useAuth();
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const accessToken = await getAccessToken();
                if (accessToken) {
                    const cartData = await getCartAction(accessToken);
                    setCarts(cartData || []);
                }
            } catch (error) {
                setCarts([])
                console.error('Error fetching cart:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, [getAccessToken]);

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!carts) {
        return <CartEmpty />;
    }

    // const totalPrice = calculateCartTotalPrice(optimisticCart);

    return (
        <form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-24 sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="w-1/6 min-w-32">Price</TableHead>
                        <TableHead className="w-1/6 min-w-32">Quantity</TableHead>
                        <TableHead className="w-1/6 min-w-32 text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {optimisticCart.map((cart) => (
                        <TableRow key={cart.id}>
                            <TableCell className="hidden sm:table-cell sm:w-24">
                                {cart.product_image_url && (
                                    <Image
                                        className="aspect-square rounded-md object-cover"
                                        src={cart.product_image_url}
                                        width={96}
                                        height={96}
                                        alt={cart.product_name || ""}
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
                                    price: cart.product_price || 0,
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
                    ))}
                </TableBody>
            </Table>
        </form>
    )
}