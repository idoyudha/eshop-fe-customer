"use client"

import { formatMoney } from "@/lib/utils";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";
import { EshopLink } from "../eshop-link";
import { CartAmountWithSpinner, CartItemLineTotal, CartItemQuantity } from "./cart-items.client";
import { Cart } from "@/models/cart";

export const CartSummaryTable = ({
    optimisticCart,
    dispatchOptimisticCartAction,
    totalPrice,
}: {
    optimisticCart: Cart[];
    dispatchOptimisticCartAction: (action: { productId: string; action: "INCREASE" | "DECREASE" }) => void;
    totalPrice: number;
}) => {
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
                                        priority={false}
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
                <TableFooter>
                    <TableRow className="text-lg font-bold">
						<TableCell className="hidden w-24 sm:table-cell"></TableCell>
						<TableCell colSpan={3} className="text-right">
							Total
						</TableCell>
						<TableCell className="text-right">
							<CartAmountWithSpinner total={totalPrice} />
						</TableCell>
					</TableRow>
                </TableFooter>
            </Table>
        </form>
    )
}