import { Badge } from "../ui/badge";

interface OrderStatusBadgeProps {
    status: string;
}


export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
    switch (status) {
        case "PENDING":
            return <Badge variant="secondary">{status}</Badge>;
        case "APPROVED":
            return <Badge>{status}</Badge>;
        case "REJECTED":
            return <Badge variant="destructive">{status}</Badge>;        
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
} 