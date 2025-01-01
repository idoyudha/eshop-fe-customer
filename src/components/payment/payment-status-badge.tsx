import { Badge } from "../ui/badge";

interface PaymentStatusBadgeProps {
    status: string;
}


export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
    switch (status) {
        case "PENDING":
        case "ON_DELIVERY":
            return <Badge variant="secondary">{status}</Badge>;
        case "PAYMENT_ACCEPTED":
        case "DELIVERED":
            return <Badge>{status}</Badge>;
        case "REJECTED":
        case "FAILED":
        case "CANCELLED":
            return <Badge variant="destructive">{status}</Badge>;        
        default:
            return <Badge variant="secondary">PENDING</Badge>;
    }
} 