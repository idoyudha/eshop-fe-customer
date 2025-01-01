"use client"

import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { uploadPaymentAction } from "@/actions/payment-action"
import { Loader2 } from "lucide-react"

export const PaymentProofUpload = ({ order_id }: { order_id: string }) => {
    const [loading, setLoading] = useState(false)
    const { isAuthenticated, getAccessToken } = useAuth();
    const { toast } = useToast();
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null);

    const handleUploadPayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isAuthenticated) {
			router.push('/auth/login');
			return;
		}

        try {
            setLoading(true)
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return
            }

            const fileInput = formRef.current?.querySelector<HTMLInputElement>('input[type="file"]');
            const file = fileInput?.files?.[0];;

            if (!file) {
                toast({
                    variant: "destructive",
                    title: "Failed to upload payment proof",
                    description: "Please select a file to upload.",    
                });
                return;
            }

            const paymentProofRequest = {
                orderId: order_id,
                image: file,
                note: "",
            }

            await uploadPaymentAction(paymentProofRequest, accessToken);

            toast({
                title: "Payment proof uploaded",
                description: "Your payment proof has been successfully uploaded.",
            });

            formRef.current?.reset();
            router.refresh()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed upload payment proof",
                description: "Failed upload payment proof. Please try again.",    
            })
            console.error("Failed to upload payment proof:", error);
        } finally {
            setLoading(false)
        }
    }

    
    return (
        <form ref={formRef} onSubmit={handleUploadPayment}>
            <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Please upload your payment proof</Label>
                    <Input 
                        id="picture" 
                        name="picture" 
                        type="file" 
                        accept="image/*"
                        required
                    />
                    <Button 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                        ) : (
                            "Upload"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    )
}