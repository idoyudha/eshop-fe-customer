import { getOrderTTLAction } from "@/actions/order-action";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";

export const OrderCountdown = ({ orderId, onExpire }: { orderId: string; onExpire?: () => void }) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const { getAccessToken } = useAuth();

    const fetchOrderTTL = async () => {
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return;
            }
            const data = await getOrderTTLAction(accessToken, orderId);
            if (data && data.ttl_seconds) {
                setTimeLeft(data.ttl_seconds);
            }
        } catch (error) {
            console.error('Error fetching order TTL:', error);
        }
    };

    useEffect(() => {
        fetchOrderTTL();
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === null) return null;
                if (prev <= 0) {
                    if (onExpire) onExpire();
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [orderId, onExpire]);

    if (timeLeft === null) return null;

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="text-sm font-medium">
            Time remaining: {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
    )
}