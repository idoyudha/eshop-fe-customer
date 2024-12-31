import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Eshop Ecommerce",
  description: "Shopping your future car and motorcycle!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="flex min-h-full flex-col">
                <Providers>
                    <div className="flex min-h-full flex-1 flex-col bg-white" vaul-drawer-wrapper="">
                        {children}
                    </div>
                    <Toaster/>
                </Providers>
            </body>
        </html>
    );
}
