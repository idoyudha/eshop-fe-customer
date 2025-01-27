import { Badge } from "../ui/badge";

interface OrderStatusBadgeProps {
    status: string;
}


export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
    switch (status) {
        case "PENDING":
        case "ON_DELIVERY":
            return <Badge variant="secondary">{status}</Badge>;
        case "PAYMENT_ACCEPTED":
        case "DELIVERED":
            return <Badge>{status}</Badge>;
        case "REJECTED":
        case "EXPIRED":
            return <Badge variant="destructive">{status}</Badge>;        
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
} 