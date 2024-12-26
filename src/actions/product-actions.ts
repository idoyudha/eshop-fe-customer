import { Order } from "@/models/order";
import { Product } from "@/models/product";

export async function getProductAction(id: string): Promise<Product | null> {
    const product = null; // TODO: Fetch cart from the API
    if (product) {
        return structuredClone(product);
    }
    return product;
}

export async function getAllProductsAction(): Promise<Product[] | null> {
    const product = null; // TODO: Fetch cart from the API
    if (product) {
        return structuredClone(product);
    }
    return product;
}