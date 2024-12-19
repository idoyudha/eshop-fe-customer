import { Product } from "@/models/product";

export async function getProductAction(id: string): Promise<Product | null> {
    const product = null; // TODO: Fetch cart from the API
    if (product) {
        return structuredClone(product);
    }
    return product;
}