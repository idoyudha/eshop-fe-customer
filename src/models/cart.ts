export interface Cart {
    id: string;
    user_id: string;
    product_id: string;
    product_name: string;
    product_image_url: string;
    product_price: number;
    product_quantity: number;
    note: string;
}
