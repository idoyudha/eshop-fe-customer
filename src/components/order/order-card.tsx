import { Order } from "@/models/order";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EshopLink } from "../eshop-link";

export const OrderCard = ({ order }: { order: Order }) => {
    return (
        <EshopLink href={`/order/${order.id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>Order ID: {order.id}</CardTitle>
                    <CardDescription>Status: {order.status}</CardDescription>
                </CardHeader>
                <CardContent>
                    {order.items.map((item) => (
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                    <p>Total: {order.total}</p>
                </CardContent>
                <CardFooter>
                    <p>Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zip}</p>
                    <p>Notes: {order.address.notes}</p>
                </CardFooter>
            </Card>
        </EshopLink>
        
    )
}