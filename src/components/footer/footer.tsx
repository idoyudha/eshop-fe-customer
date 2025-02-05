import StoreConfig from "@/eshop.config";
import type { SVGAttributes } from "react";
import { Newsletter } from "./newsletter.client";
import { EshopLink } from "../eshop-link";

const sections = [
	{
		header: "Products",
		links: StoreConfig.categories.map(({ name, category_id }) => ({
			label: name,
			href: `/category/${category_id}`,
		})),
	},
	{
		header: "Support",
		links: [
			{
				label: "Contact Us",
				href: "mailto:hi@eshop.com",
			},
		],
	},
];

export async function Footer() {
	return (
		<footer className="w-full bg-neutral-50 p-6 text-neutral-800 md:py-12">
			<div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 md:px-6">
				<div className="grid grid-cols-1 gap-16 md:grid-cols-3">
				<div className="flex items-start">
					<div className="flex w-full flex-col gap-2">
					<h3 className="font-semibold">Newsletter</h3>
					<Newsletter />
					</div>
				</div>

				{sections.map((section) => (
					<section key={section.header}>
					<h3 className="mb-2 font-semibold">{section.header}</h3>
					<ul role="list" className="grid gap-1">
						{section.links.map((link) => (
						<li key={link.label}>
							<EshopLink 
								className="underline-offset-4 hover:underline" 
								href={link.href}
							>
								{link.label}
							</EshopLink>
						</li>
						))}
					</ul>
					</section>
				))}
				</div>

				{/* Footer Bottom */}
				<div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-sm text-neutral-500 md:flex-row">
				<div>
					<p>© 2025 Eshop</p>
					<p>Car and Motor Ecommerce</p>
				</div>
				<div className="flex items-center gap-4">
					<EshopLink
						className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
						href="https://x.com/eshop"
					>
					<TwitterIcon className="h-4 w-4" /> @eshop
					<span className="sr-only">Twitter</span>
					</EshopLink>
					<EshopLink
						className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
						href="https://x.com/eshop"
					>
					<TwitterIcon className="h-4 w-4" /> @eshop
					<span className="sr-only">Twitter</span>
					</EshopLink>
				</div>
				</div>
			</div>
		</footer>
	);
}

function TwitterIcon(props: SVGAttributes<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 596 596" fill="none">
			<path
				fill="#fff"
				d="m1 19 230 307L0 577h52l203-219 164 219h177L353 252 568 19h-52L329 221 179 19H1Zm77 38h82l359 481h-81L78 57Z"
			/>
		</svg>
	);
}