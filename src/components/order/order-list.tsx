import { Order } from "@/models/order";
import { OrderCard } from "./order-card";

export const OrderList = async ({ orders }: { orders: Order[] }) => {
    return (
        <>
            <ul className="mt-6 gap-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </ul>
        </>
    )
}