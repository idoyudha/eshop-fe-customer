import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function invariant(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

type Money = { price: number; currency: string };

export const formatMoney = ({ price, currency }: Money & { locale?: string }) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency
	}).format(price);
};