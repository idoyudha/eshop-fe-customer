"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { handleSendEmailVerificationCode } from "@/actions/cognito-auth"

const AccountSendVerificationCode = () => {
    const [response, dispatch] = useFormState(handleSendEmailVerificationCode, {
        message: "",
        errorMessage: "",
    })
    const { pending } = useFormStatus()
    return (
        <>
            <Button 
                variant="secondary"
                className="mt-4 w-full"
                aria-disabled={pending}
                formAction={dispatch}
            >
                Resend Verification Code
            </Button>
            <div className="flex h-8">
                {response?.errorMessage && (
                    toast.error(errorMessage, { duration: 5000 })
                )}
            </div>
        </>
    )
}

export default AccountSendVerificationCode