import { Product } from "./product";

export interface Order  {
    id: string;
    user_id: string;
    items: Product[];
    address: Address;
    status: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    note: string;
}

export interface OrderView {
    id: string;
    status: string;
    total_price: number;
    payment_id: string; 
    payment_status: string;
    payment_image_url: string;
    items: Product[];
    address: Address;
    created_at: Date;
}