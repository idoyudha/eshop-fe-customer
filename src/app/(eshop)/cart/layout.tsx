import { CartSummaryTable } from "@/components/checkout/cart-summary-table";

export default function CartLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
			<div className="my-8 xl:col-span-7">
				<div className="sticky top-1">
					<h1 className="mb-4 text-3xl font-bold leading-none tracking-tight">Cart</h1>
					<CartSummaryTable />
				</div>
			</div>
			<div className="my-8 max-w-[65ch] xl:col-span-5">{children}</div>
		</div>
    )
}