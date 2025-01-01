import { OrderView } from "@/models/order";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EshopLink } from "../eshop-link";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import { OrderStatusBadge } from "./order-status-badge";
import { PaymentStatusBadge } from "../payment/payment-status-badge";

export const OrderCard = ({ order }: { order: OrderView }) => {
    return (
            <Card>
                <CardHeader>
                    <CardTitle>Order ID: {order.id}</CardTitle>
                    <CardDescription>
                        <small className="text-sm font-medium leading-none">{new Date(order.created_at).toDateString()}</small>
                        <OrderStatusBadge status={order.status} />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-8">
                        <div className="basis-1/6">
                            <Image 
                                src={order.items[0].image_url} 
                                alt="order item image" 
                                width={250} 
                                height={250} 
                            />
                        </div>
                        <div className="shrink basis-3/6 flex flex-col">
                            <small className="text-sm font-medium leading-none mb-2">Total: {formatMoney({ price: order.total_price, currency: "USD" })}</small>
                            <small className="text-sm font-medium leading-none mb-2">Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}</small>
                            <small className="text-sm font-medium leading-none mb-2">Notes: {order.address.note}</small>
                        </div>
                        <div className="basis-2/6 flex flex-col">
                            <small className="text-sm font-medium leading-none mb-2">Payment ID: {order.payment_id}</small>
                            <div>
                                <small className="text-sm font-medium leading-none mb-2">Payment Status: </small> 
                                <PaymentStatusBadge status={order.payment_status} />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <EshopLink href={`/orders/${order.id}`}>
                        <div className="text-lg font-semibold">View Detail Order</div>
                    </EshopLink>
                </CardFooter>
            </Card>
    )
}