export default function CartLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
			{children}
		</div>
    )
}