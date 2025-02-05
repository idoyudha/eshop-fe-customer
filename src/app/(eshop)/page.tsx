import { EshopLink } from "@/components/eshop-link";
import Image from "next/image";
import EshopConfig from "@/eshop.config";
import { CategoryBox } from "@/components/category-box";
import CarImage from "@/images/rav4.jpg";
import { getAllProductsAction } from "@/actions/product-actions";
import { ProductList } from "@/components/products/product-list";

export const metadata = {
    title: "Eshop Ecommerce",
    description: "Car and Motor Ecommerce",
};

export default async function Home() {
	const products = await getAllProductsAction();
	if (products === null) {
		return null;
	}
    return (
        <main>
            <section className="rounded bg-neutral-100 py-8 sm:py-12">
				<div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
					<div className="max-w-md space-y-4">
						<h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">For your favourite car</h2>
						<p className="text-pretty text-neutral-600">Explore our selected cars for your lifestyle</p>
						<EshopLink
							className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-1 focus:ring-neutral-950"
							href={`/category/car`}
						>
							Shop Now
						</EshopLink>
					</div>
					<Image
						alt="Mazda CX 5"
						loading="eager"
						priority={true}
						height={450}
						width={450}
						src={CarImage}
						style={{
							objectFit: "cover",
						}}
						sizes="(max-width: 640px) 70vw, 450px"
					/>
				</div>
			</section>

			<ProductList products={products} />

			<section className="w-full py-8">
				<div className="grid gap-8 lg:grid-cols-2">
					{EshopConfig.categories.map(({ slug, image: src, category_id }) => (
						<CategoryBox key={slug} categorySlug={slug} categoryId={category_id} src={src} />
					))}
				</div>
			</section>
        </main>
    )
}