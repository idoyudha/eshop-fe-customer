import "@/app/globals.css";

export default async function AuthLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
				{children}
			</main>
        </>
    )
}