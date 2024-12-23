import { Product } from "./product";

export interface Order  {
    id: string;
    user_id: string;
    items: Product[];
    total: number;
    address: Address;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    notes: string;
}