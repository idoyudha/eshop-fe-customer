export interface Payment {
    id: string;
    orderId: string;
    imageUrl: string;
    status: string;
    note: string;
    createdAt: Date;
}