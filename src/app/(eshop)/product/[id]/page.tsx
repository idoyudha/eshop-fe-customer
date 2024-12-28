import { getCategoryByID, getProductAction } from "@/actions/product-actions";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { EshopLink } from "@/components/eshop-link";
import { ProductActions } from "@/components/products/product-action";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { deslugify, formatMoney } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage(props: {
	params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const product = await getProductAction(params.id);
    if (!product) {
        return notFound();
    }
    const category = await getCategoryByID(product.category_id);
    const image = product.image_url;

    return (
        <article className="pb-12">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="inline-flex min-h-12 min-w-12 items-center justify-center">
                            <EshopLink href="/products">All Products</EshopLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {category && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink className="inline-flex min-h-12 min-w-12 items-center justify-center" asChild>
									<EshopLink href={`/category/${category.id}`}>{deslugify(category.name)}</EshopLink>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					)}
                    <BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{product.name}</BreadcrumbPage>
					</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-4 grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-5 lg:col-start-8">
					<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">{product.name}</h1>
					{product.price && (
						<p className="mt-2 text-2xl font-medium leading-none tracking-tight text-foreground/70">
							{formatMoney({
                                price: product.price,
                                currency: "USD",
                            })}
						</p>
					)}
					<div className="mt-2">{product.quantity <= 0 && <div>Out of stock</div>}</div>
				</div>
                
                <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1">
                    <h2 className="sr-only">Title</h2>
                    <div className="grid gap-4 lg:grid-cols-3 [&>*:first-child]:col-span-3">
                        <EshopLink key={product.id} href={`?${params}`} scroll={false}>
                            <Image
								key={image}
								className="w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity"
								src={image}
								width={700 / 3}
								height={700 / 3}
								sizes="(max-width: 1024x) 33vw, (max-width: 1280px) 20vw, 225px"
								loading="eager"
								priority
								alt=""
							/>
						</EshopLink>
                    </div>
                </div>

                <div className="grid gap-8 lg:col-span-5">
                    <section>
                        <h2 className="sr-only">Description</h2>
                        <div className="prose text-secondary-foreground">
                            {product.description}
                        </div>
                    </section>
                    <ProductActions 
                        initialProduct={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity
                        }} 
                    />
                </div>
            </div>
            
        </article>
    )
}