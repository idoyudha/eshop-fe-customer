import { CarIcon } from "lucide-react";
import { EshopLink } from "../eshop-link";

export async function CartEmpty() {
	return (
		<div className="flex max-h-80 flex-1 flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-center justify-center space-y-2 text-center">
				<CarIcon className="h-12 w-12 text-neutral-500" />
				<h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
				<p className="text-neutral-500">Looks like you not add a car yet</p>
			</div>
			<EshopLink
				className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-6 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50"
				href="/"
			>
				Continue shopping
			</EshopLink>
		</div>
	);
}