import { OrderList } from "@/components/order/order-list";

export default function OrderPage() {
    return (
        <main className="pb-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">All Orders</h1>
            <OrderList />
        </main>
    )
}