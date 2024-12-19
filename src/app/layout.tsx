import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <div className="flex min-h-full flex-1 flex-col bg-white" vaul-drawer-wrapper="">
          {children}
        </div>
        <Toaster position="top-center" offset={10} />
      </body>
    </html>
  );
}
