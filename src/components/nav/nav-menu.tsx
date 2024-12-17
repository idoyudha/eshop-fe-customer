import StoreConfig from "@/eshop.config";
import Link from "next/link";

const links = [
	{
		label: "Home",
		href: "/",
	},
	...StoreConfig.categories.map(({ name, slug }) => ({
		label: name,
		href: `/category/${slug}`,
	})),
	{
		label: "Digital",
		href: "/category/digital",
	},
];

export const NavMenu = () => {
	return (
		<>
			<div className="sm:block hidden">
				<ul className="flex flex-row items-center justify-center gap-x-1">
					{links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};