import Link from "next/link";
import { EshopLink } from "../eshop-link";
import { AuthNav } from "./auth-nav";
import { CartSummaryNav } from "./cart-summary-nav";
import { NavMenu } from "./nav-menu";

export const Nav = async () => {
	return (
		<header className="z-50 py-4 sticky top-0 bg-white/90 backdrop-blur-sm nav-border-reveal">
			<div className="mx-auto flex max-w-7xl items-center gap-2 px-4 flex-row sm:px-6 lg:px-8">
				<EshopLink href="/">
					<h1 className="-mt-0.5 whitespace-nowrap text-xl font-bold">Eshop</h1>
				</EshopLink>

				<div className="max-w-full flex flex-shrink w-auto sm:mr-auto overflow-auto max-sm:order-2">
					<NavMenu />
				</div>
				<div className="mr-3 ml-auto sm:ml-0">
					{/* <SearchNav /> */}
					<Link 
						href="/orders"
						className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
					>
						Order
					</Link>
				</div>
				<CartSummaryNav />
				<AuthNav />
			</div>
		</header>
	);
};