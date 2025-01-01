"use client"

import { getOrderAction } from "@/actions/order-action";
import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { PaymentProofUpload } from "@/components/payment/payment-proof-upload";
import { PaymentStatusBadge } from "@/components/payment/payment-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { formatMoney } from "@/lib/utils";
import { OrderView } from "@/models/order";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function OrderPage(props: {
	params: Promise<{ id: string }>;
}) {
    const { getAccessToken } = useAuth();
    const [order, setOrder] = useState<OrderView | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrder = useCallback(async () => {
        try {
            setIsLoading(true);
            const params = await props.params;
            const accessToken = await getAccessToken();
            if (accessToken) {
                const orderData = await getOrderAction(accessToken, params.id);
                setOrder(orderData || null);
            }
        } catch (error) {
            setOrder(null);
            console.error('Error fetching order:', error);
        } finally {
            setIsLoading(false);
        }
    }, [getAccessToken]);  
    
    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!order) return notFound();

    return (
        <article className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Order Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">Order ID</p>
                                    <p className="font-medium">{order.id}</p>
                                </div>
                                <OrderStatusBadge status={order.status} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Order Date</p>
                                <p className="font-medium">
                                    {new Date(order.created_at).toDateString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Products</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={item.id}>
                                    <div className="flex gap-4">
                                        <div className="w-40 h-20 relative">
                                            <Image
                                                key={index}
                                                src={item.image_url}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 640px) 70vw, 450px"
                                                priority
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-sm font-medium">
                                                Price: {formatMoney({ price: item.price, currency: "USD" })}
                                            </p>
                                            <p className="text-sm font-medium">
                                                Subtotal: {formatMoney({ price: item.price * item.quantity, currency: "USD" })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p className="font-medium">
                                    {formatMoney({ price: order.total_price, currency: "USD" })}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Shipping Fee</p>
                                <p className="font-medium">
                                    {formatMoney({ price: 0, currency: "USD" })}
                                </p>
                            </div>
                            <div className="flex justify-between text-lg font-semibold">
                                <p>Total</p>
                                <p>{formatMoney({ price: order.total_price, currency: "USD" })}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Payment Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <PaymentStatusBadge status={order.payment_status} />
                            </div>
                            
                            {order.payment_status === "PENDING" || order.payment_status === "" ? (
                                <PaymentProofUpload order_id={order.id} />
                            ) : order.payment_image_url && (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Payment Proof:</p>
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={order.payment_image_url}
                                            alt="Payment proof"
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </article>
    );
}