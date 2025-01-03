import { Cart } from "@/models/cart";
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

export function getBaseUrl(serviceName: string) {
	if (typeof window === 'undefined') {
        // server-side
        switch(serviceName) {
            case 'PRODUCT_SERVICE':
                return process.env.PRODUCT_SERVICE || '';
            case 'CART_SERVICE':
                return process.env.CART_SERVICE || '';
            case 'ORDER_SERVICE':
                return process.env.ORDER_SERVICE || '';
            case 'PAYMENT_SERVICE':
                return process.env.PAYMENT_SERVICE || '';
            default:
                return '';
        }
    }
    
    // client-side
    switch(serviceName) {
        case 'PRODUCT_SERVICE':
            return process.env.NEXT_PUBLIC_PRODUCT_SERVICE || '';
        case 'CART_SERVICE':
            return process.env.NEXT_PUBLIC_CART_SERVICE || '';
        case 'ORDER_SERVICE':
            return process.env.NEXT_PUBLIC_ORDER_SERVICE || '';
        case 'PAYMENT_SERVICE':
            return process.env.NEXT_PUBLIC_PAYMENT_SERVICE || '';
        default:
            return '';
    }
}

type Money = { price: number; currency: string };

export const formatMoney = ({ price, currency }: Money & { locale?: string }) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency
	}).format(price);
};

export const slugify = (text: string) => {
	return text
		.toString() // Cast to string (optional)
		.normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string (optional)
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w-]+/g, "") // Remove all non-word chars
		.replace(/_/g, "-") // Replace _ with -
		.replace(/--+/g, "-") // Replace multiple - with single -
		.replace(/-$/g, ""); // Remove trailing -
};

export const capitalize = (str: string) => (str[0] ? str[0].toUpperCase() + str.slice(1) : "");

export const deslugify = (slug: string) => {
	return slug
		.split("-")
		.map((part) => capitalize(part))
		.join(" ");
};

export const calculateCartTotalPrice = (cart : Cart[]) => {
	return cart.reduce((acc, item) => acc + item.product_price * item.product_quantity, 0);
}

export const calculateCartTotalItems = (cart : Cart[]) => {
	return cart.reduce((acc, item) => acc + item.product_quantity, 0);
}

