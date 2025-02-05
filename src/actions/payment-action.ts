import { getBaseUrl } from "@/lib/utils";

const paymentService = 'PAYMENT_SERVICE';

// interface PaymentResponse {
//     code: number;
//     data: Payment;
//     message: string;
// }

export interface createPaymentRequest {
    orderId: string;
    image: File;
    note: string;
}

export async function uploadPaymentAction(data: createPaymentRequest, accessToken: string): Promise<void> {
    const paymentServiceBaseURL = getBaseUrl(paymentService)

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