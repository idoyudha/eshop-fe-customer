import { EshopLink } from "../eshop-link";
import { buttonVariants } from "../ui/button";

export const AuthNav = () => {
    return (
        <>
            <EshopLink 
                className={buttonVariants({
                    size: "sm",
                })}
                href="/auth/login"
            >
                Login
            </EshopLink>
        </>
    )
};