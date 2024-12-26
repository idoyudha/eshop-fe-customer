import { getOrdersAction } from "@/actions/order-action";
import { OrderList } from "@/components/order/order-list";

export default async function OrderPage() {
    const orders = await getOrdersAction();
    if (orders === null) {
        return null;
    }
    return (
        <main className="pb-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">All Orders</h1>
            <OrderList orders={orders} />
        </main>
    )
}