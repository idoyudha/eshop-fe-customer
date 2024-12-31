import { Category } from "./category";

export interface Product {
    id: string;
    sku: string;
    name: string;
    category: Category;
    image_url: string;
    description: string;
    price: number;
    quantity: number;
    category_id: string;
}
