import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "EShop",
  description: "Shopping for your future car and motorcycle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <div className="flex min-h-full flex-1 flex-col bg-white" vaul-drawer-wrapper="">
            {children}
          </div>
          <Toaster position="top-center" offset={10} />
        </AuthProvider>
      </body>
    </html>
  );
}
