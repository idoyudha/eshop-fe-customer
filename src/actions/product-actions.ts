import { Category } from "@/models/category";
import { Product } from "@/models/product";

const productService = process.env.NEXT_PUBLIC_PRODUCT_SERVICE;

interface ProductDetailResponse {
    code: number;
    data: Product;
    message: string;
} 

export async function getProductAction(id: string): Promise<Product | null> {
    try {
        const response = await fetch(`${productService}/v1/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const product: ProductDetailResponse = await response.json();
        if (product && product.data) {
            return structuredClone(product.data);
        }

        return null;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

interface ProductAllResponse {
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

        const products: ProductAllResponse = await response.json();
        if (products && products.data) {
            return structuredClone(products.data);
        }

        return null;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

interface CategoryResponse {
    code: number;
    data: Category;
    message: string;
}

export async function getCategoryByID(id: string): Promise<Category | null> {
    try {
        const response = await fetch(`${productService}/v1/categories/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const category: CategoryResponse = await response.json();
        if (category && category.data) {
            return structuredClone(category.data);
        }

        return null;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}