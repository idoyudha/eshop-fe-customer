import { getErrorMessage } from "@/lib/utils";
import {
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    resendSignUpCode,
    autoSignIn,
} from "aws-amplify/auth";
import { redirect } from "next/navigation";

const handleSignUp = async (
    prevState: string | undefined,
    formData: FormData
) => {
    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: String(formData.get("email")),
            password: String(formData.get("password")),
            options: {
                userAttributes: {
                    email: String(formData.get("email")),
                    given_name: String(formData.get("first_name")),
                    family_name: String(formData.get("last_name")),
                },
                // optional
                autoSignIn: true,
            },
        })
    } catch (error) {
        return getErrorMessage(error)
    }
    redirect("/auth/confirm-signup")
}

const handleSendEmailVerificationCode = async (
    prevState: { message: string; errorMessage: string },
    formData: FormData
) => {
    let currentState
    try {
        await resendSignUpCode({
            username: String(formData.get("email"))
        })
        currentState = {
            ...prevState,
            message: "Code sent successfully"
        }
    } catch (error) {
        currentState = {
            ...prevState,
            errorMessage: getErrorMessage(error),
        };
    }

    return currentState
}

const handleConfirmSignUp = async(
    prevState: string | undefined,
    formData: FormData
) => {
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: String(formData.get("email")),
            confirmationCode: String(formData.get("code")),
        });
        await autoSignIn();
    } catch (error) {
        return getErrorMessage(error);
    }
    redirect("/auth/login");
}

const handleSignIn = async(
    prevState: string | undefined,
    formData: FormData
) => {
    let redirectLink = "/"
    try {
        const { isSignedIn, nextStep } = await signIn({
            username: String(formData.get("email")),
            password: String(formData.get("password")),
        });
        if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
            await resendSignUpCode({
                username: String(formData.get("email")),
            });
            redirectLink = "/auth/confirm-signup";
        }
    } catch (error) {
        return getErrorMessage(error);
    }

    redirect(redirectLink);
}

const handleSignOut = async() => {
    try {
        await signOut();
    } catch (error) {
        console.log(getErrorMessage(error));
    }
    window.location.href = "/"
}

export {
    handleSignUp,
    handleSendEmailVerificationCode,
    handleConfirmSignUp,
    handleSignIn,
    handleSignOut
}