"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductActionsProps {
    initialProduct: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    };
}

export function ProductActions({ initialProduct }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);

    const createCartRequest = {
        product_id: initialProduct.id,
        product_name: initialProduct.name,
        product_price: initialProduct.price,
        product_quantity: quantity,
        note: "",
    };

    const incrementQuantity = () => {
        if (quantity < initialProduct.quantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                    >
                        <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={quantity >= initialProduct.quantity}
                    >
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <AddToCartButton 
                createCartRequest={createCartRequest} 
                disabled={initialProduct.quantity <= 0} 
            />
        </div>
    );
}