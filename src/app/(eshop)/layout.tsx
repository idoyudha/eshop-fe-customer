import "@/app/globals.css";
import { Footer } from "@/components/footer/footer";
import { Nav } from "@/components/nav/nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartModalProvider } from "@/context/cart-modal";
import { CartModalPage } from "./cart/cart-modal";

export default async function EshopLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <CartModalProvider>
                <Nav/>
                <TooltipProvider>
                    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
						{children}
                        <CartModalPage/>
					</main>
                    <Footer/>
                </TooltipProvider>
            </CartModalProvider>
        </>
    )
}