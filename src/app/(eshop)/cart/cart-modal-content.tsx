"use client"

import { useEffect, useState } from "react";
import { Cart } from "@/models/cart";
import { useAuth } from "@/context/auth-context";
import { getCartAction } from "@/actions/cart-actions";
import { calculateCartTotalPrice, formatMoney } from "@/lib/utils";
import { EshopLink } from "@/components/eshop-link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartAsideContainer } from "./cart-aside";
import { useCart } from "@/hooks/use-cart";

export function CartModalContent() {
    const { carts } = useCart();
    const totalPrice = calculateCartTotalPrice(carts);

    return (
        <CartAsideContainer>
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral-700">Your cart</h2>
                    <EshopLink replace href="/cart" className="text-sm text-muted-foreground underline">
                        open full view
                    </EshopLink>
                </div>

                <div className="mt-8">
                    <ul role="list" className="-my-6 divide-y divide-neutral-200">
                        {carts.map((cart) => (
                            <li
                                key={cart.id}
                                className="grid grid-cols-[4rem,1fr,max-content] grid-rows-[auto,auto] gap-x-4 gap-y-2 py-6"
                            >
                                {cart.product_image_url ? (
                                    <div className="col-span-1 row-span-2 bg-neutral-100">
                                        <Image
                                            className="aspect-square rounded-md object-cover"
                                            src={cart.product_image_url}
                                            width={80}
                                            height={80}
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div className="col-span-1 row-span-2" />
                                )}

                                <h3 className="-mt-1 font-semibold leading-tight">
                                    {cart.product_name}
                                </h3>
                                <p className="text-sm font-medium leading-none">
                                    {formatMoney({
                                        price: totalPrice,
                                        currency: "USD",
                                    })}
                                </p>
                                <p className="self-end text-sm font-medium text-muted-foreground">
                                    Quantity: {cart.product_quantity}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-neutral-200 px-4 py-6 sm:px-6">
                <div
                    id="cart-overlay-description"
                    className="flex justify-between text-base font-medium text-neutral-900"
                >
                    <p>Total</p>
                    <p>
                        {formatMoney({
                            price: totalPrice,
                            currency: "USD",
                        })}
                    </p>
                </div>
                <p className="mt-0.5 text-sm text-neutral-500">Shipping will be calculated at next step</p>
                <Button asChild={true} size={"lg"} className="mt-6 w-full rounded-full text-lg">
                    <EshopLink href="/cart">Go to Payment</EshopLink>
                </Button>
            </div>
        </CartAsideContainer>
    );
}