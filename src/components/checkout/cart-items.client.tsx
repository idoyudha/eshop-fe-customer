import { deleteCartAction, updateCartAction } from "@/actions/cart-actions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { formatMoney } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export const CartItemQuantity = ({
    quantity,
    productId,
    cartId,
    onChange,
} : {
    quantity: number;
    productId: string;
    cartId: string;
    onChange: (args: { productId: string; action: "INCREASE" | "DECREASE" }) => void;
}) => {
    const { pending } = useFormStatus();
	const stateRef = useRef<{
		timer: ReturnType<typeof setTimeout> | null;
		promise: PromiseWithResolvers<void>;
	}>({
		timer: null,
		promise: Promise.withResolvers(),
	});

    const isPending = pending && stateRef.current !== null;
	const router = useRouter();
	const { getAccessToken } = useAuth();

    const formAction = async (action: "INCREASE" | "DECREASE") => {
		onChange({ productId, action });

		const doWork = async () => {
			try {
				const modifier = action === "INCREASE" ? 1 : -1;
				const accessToken = await getAccessToken();
				if (!accessToken) {
					return;
				}
				if ((quantity + modifier) === 0) {
					await deleteCartAction(cartId, accessToken);
				} else {
					await updateCartAction({ cart_id: cartId, product_quantity: quantity + modifier, note: "" }, accessToken);
				}
				router.refresh();
				stateRef.current?.promise.resolve();
			} catch (error) {
				stateRef.current?.promise.reject(error);
			} finally {
				if (stateRef.current) {
					stateRef.current.timer = null;
					stateRef.current.promise = Promise.withResolvers();
				}
			}
		};

		if (stateRef.current) {
			clearTimeout(stateRef.current.timer ?? undefined);
			stateRef.current.timer = setTimeout(doWork, 400);
		} else {
			stateRef.current = {
				timer: setTimeout(doWork, 400),
				promise: Promise.withResolvers(),
			};
		}
		return stateRef.current.promise.promise;
	};

    return (
        <span
			className={clsx(
				"flex flex-row items-center",
				isPending ? "cursor-wait text-foreground/50" : "text-foreground",
			)}
		>
			<Button
				variant="ghost"
				size="sm"
				type="submit"
				disabled={quantity <= 0}
				className="group aspect-square p-0"
				formAction={() => formAction("DECREASE")}
			>
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white">
					–
				</span>
			</Button>
			<span className="inline-block min-w-8 px-1 text-center tabular-nums">{quantity}</span>
			<Button
				variant="ghost"
				size="sm"
				type="submit"
				className="group aspect-square p-0"
				formAction={() => formAction("INCREASE")}
			>
				<span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white">
					+
				</span>
			</Button>
		</span>
    )
}

export const CartItemLineTotal = ({
	quantity,
	unitAmount,
	productId,
}: {
	unitAmount: number;
	quantity: number;
	productId: string;
}) => {
	const { pending, data: formData } = useFormStatus();
	const increaseQuantity = formData?.get("increaseQuantity")?.toString();
	const decreaseQuantity = formData?.get("decreaseQuantity")?.toString();
	const isPending = pending && (increaseQuantity === productId || decreaseQuantity === productId);

	return (
		<span
			className={clsx(
				"whitespace-nowrap tabular-nums",
				isPending ? "cursor-wait text-foreground/50" : "text-foreground",
			)}
		>
			{formatMoney({
                price: unitAmount * quantity,
                currency: "USD",
            })}
		</span>
	);
};

export const CartAmountWithSpinner = ({ total }: { total: number;  }) => {
	const { pending } = useFormStatus();

	return (
		<span
			className={clsx(
				"relative tabular-nums",
				pending ? "cursor-wait text-foreground/50" : "text-foreground",
			)}
		>
			{pending && (
				<Loader2 className="absolute -left-[.85rem] top-[.1rem] inline-block size-3 animate-spin text-foreground" />
			)}
			{formatMoney({
                price: total,
                currency: "USD",
            })}
		</span>
	);
};