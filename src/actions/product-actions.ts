import { Product } from "@/models/product";

const productService = process.env.NEXT_PUBLIC_PRODUCT_SERVICE;

export async function getProductAction(id: string): Promise<Product | null> {
    const product = null; // TODO: Fetch cart from the API
    if (product) {
        return structuredClone(product);
    }
    return product;
}

interface ProductResponse {
    code: number;
    data: Product[];
    message: string;
} 

export async function getAllProductsAction(): Promise<Product[] | null> {
    try {
        const response = await fetch(`${productService}/v1/products/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products: ProductResponse = await response.json();
        console.log("products response", products)
        if (products && products.data) {
            return structuredClone(products.data);
        }

        return null;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
    
}