import { getBaseUrl } from "@/lib/utils";
import { Payment } from "@/models/payment";

const paymentService = 'PAYMENT_SERVICE';

interface PaymentResponse {
    code: number;
    data: Payment;
    message: string;
}

export interface createPaymentRequest {
    orderId: string;
    image: File;
    note: string;
}

export async function uploadPaymentAction(data: createPaymentRequest, accessToken: string): Promise<void> {
    var paymentServiceBaseURL = getBaseUrl(paymentService)
    if (!paymentServiceBaseURL) {
        paymentServiceBaseURL = process.env.NEXT_PUBLIC_PAYMENT_SERVICE || "http://localhost:2006"
    }

    const formData = new FormData();
    formData.append('orderId', data.orderId);
    formData.append('image', data.image);
    formData.append('note', data.note);

    const response = await fetch(`${paymentServiceBaseURL}/v1/payments`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `payment failed with status: ${response.status}`);
    }
}