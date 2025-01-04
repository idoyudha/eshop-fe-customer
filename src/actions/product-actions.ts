import { getBaseUrl } from "@/lib/utils";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

const productService = 'PRODUCT_SERVICE';

interface ProductDetailResponse {
    code: number;
    data: Product;
    message: string;
} 

export async function getProductAction(id: string): Promise<Product | null> {
    try {
        const productServiceBaseUrl = getBaseUrl(productService)
        const response = await fetch(`${productServiceBaseUrl}/v1/products/${id}`, {
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
        const productServiceBaseUrl = getBaseUrl(productService)
        const response = await fetch(`${productServiceBaseUrl}/v1/products/`, {
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

export async function getProductsByCategoryIDsAction(ids: string[]): Promise<Product[] | null> {
    try {
        const productServiceBaseUrl = getBaseUrl(productService)
        const response = await fetch(`${productServiceBaseUrl}/v1/products/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_ids: ids
            })
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
        const productServiceBaseUrl = getBaseUrl(productService)
        const response = await fetch(`${productServiceBaseUrl}/v1/categories/${id}`, {
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

interface CategoriesResponse {
    code: number;
    data: Category[];
    message: string;
}

export async function getCategoriesByParentID(id: string): Promise<Category[] | null> {
    try {
        const productServiceBaseUrl = getBaseUrl(productService)
        const response = await fetch(`${productServiceBaseUrl}/v1/categories/parent/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const category: CategoriesResponse = await response.json();
        if (category && category.data) {
            return structuredClone(category.data);
        }

        return null;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}