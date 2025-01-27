"use client"

import { CartSummaryTable } from "./cart-summary-table"
import { CheckoutAddress } from "./checkout-address"
import { calculateCartTotalPrice } from "@/lib/utils";
import { useOptimistic } from "react";
import { CartEmpty } from "./cart-empty";
import { useCart } from "@/context/cart-modal";
import { Loader2Icon } from "lucide-react";

export const CheckoutCart = () => {
    const { carts, isLoading } = useCart();
    
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
        return (
            <div className="col-span-12 flex h-[calc(100dvh-7rem)] items-center justify-center">
                <Loader2Icon className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (carts.length === 0) {
        return (
            <div className="col-span-12 flex h-[calc(100dvh-7rem)] items-center justify-center">
                <CartEmpty />
            </div>
        )
    }

    const totalPrice = calculateCartTotalPrice(optimisticCart);
    return (
        <>
            <div className="my-8 xl:col-span-7">
                <div className="sticky top-1">
                    <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight">Cart</h1>
                    <CartSummaryTable 
                        optimisticCart={optimisticCart}
                        dispatchOptimisticCartAction={dispatchOptimisticCartAction}
                        totalPrice={totalPrice}
                    />
                </div>
            </div>
            <div className="my-8 xl:col-span-5">
                <CheckoutAddress />
            </div>
        </>
    )
}