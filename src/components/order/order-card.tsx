import { Order } from "@/models/order";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { EshopLink } from "../eshop-link";
import Image from "next/image";

export const OrderCard = ({ order }: { order: Order }) => {
    return (
        <EshopLink href={`/order/${order.id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>Order ID: {order.id}</CardTitle>
                    <CardDescription>Status: {order.status}</CardDescription>
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
                        <div className="shrink basis-5/6">
                            <p>Total: {order.total}</p>
                            <p>Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}</p>
                            <p>Notes: {order.address.note}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    
                </CardFooter>
            </Card>
        </EshopLink>
        
    )
}