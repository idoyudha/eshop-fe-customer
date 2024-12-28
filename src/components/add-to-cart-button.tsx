"use client";

import { useCartModal } from "@/context/cart-modal";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { addToCartAction, createCartRequest } from "@/actions/cart-actions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export const AddToCartButton = ({
	createCartRequest,
	disabled,
	className,
}: {
	createCartRequest: createCartRequest;
	disabled?: boolean;
	className?: string;
}) => {
	const [pending, startTransition] = useTransition();
	const isDisabled = disabled || pending;
	const { setOpen } = useCartModal();

	const router = useRouter();
	const { isAuthenticated, getAccessToken } = useAuth();

	const handleAddToCart = async () => {
		if (!isAuthenticated) {
			router.push('/auth/login');
			return;
		}
		try {
            const accessToken = await getAccessToken();
			if (!accessToken) {
				return;
			}
            const result = await addToCartAction(createCartRequest, router, accessToken);
            
            if (result) {
                setOpen(true);
                toast.success('Added to cart successfully');
            }
        } catch (error) {
            toast.error('Failed to add to cart');
            console.error('Failed to add to cart:', error);
        }
	};

	return (
		<Button
			id="button-add-to-cart"
			size="lg"
			type="submit"
			className={cn("rounded-full text-lg relative", className)}
			onClick={async (e) => {
                if (isDisabled) {
                    e.preventDefault();
                    return;
                }

                startTransition(async () => {
                    await handleAddToCart();
                });
            }}
			aria-disabled={isDisabled}
		>
			<span className={cn("transition-opacity ease-in", pending ? "opacity-0" : "opacity-100")}>
				{disabled ? "Out of stock" : "Add to cart"}
			</span>
			<span
				className={cn(
					"ease-out transition-opacity pointer-events-none absolute z-10",
					pending ? "opacity-100" : "opacity-0",
				)}
			>
				<Loader2Icon className="h-4 w-4 animate-spin" />
			</span>
		</Button>
	);
};