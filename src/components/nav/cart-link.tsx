"use client";

import { useCartModal } from "@/context/cart-modal";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EshopLink } from "../eshop-link";

export const CartLink = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const { setOpen } = useCartModal();
	return (
		<EshopLink
			href="/cart"
			onClick={(e) => {
				e.preventDefault();
				if (pathname === "/cart") {
					return;
				}
				setOpen(true);
			}}
			scroll={false}
			className="relative block h-6 w-6"
			prefetch={true}
		>
			{children}
		</EshopLink>
	);
};