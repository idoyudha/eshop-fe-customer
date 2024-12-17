import { formatMoney } from "@/lib/utils";
import { Product } from "@/models/product";
import Image from "next/image";
import { EshopLink } from "../eshop-link";

export const ProductList = async ({ products }: { products: Product[] }) => {
	return (
		<>
			<ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product, idx) => {
					return (
						<li key={product.id} className="group">
							<EshopLink href={`/product/${product.category_id}`}>
								<article className="overflow-hidden bg-white">
									{product.imageUrl && (
										<div className="rounded-lg aspect-square w-full overflow-hidden bg-neutral-100">
											<Image
												className="group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75"
												src={product.imageUrl}
												width={768}
												height={768}
												loading={idx < 3 ? "eager" : "lazy"}
												priority={idx < 3}
												sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
												alt=""
											/>
										</div>
									)}
									<div className="p-2">
										<h2 className="text-xl font-medium text-neutral-700">{product.name}</h2>
										<footer className="text-base font-normal text-neutral-900">
											{product.price && (
												<p>
													{formatMoney({
														price: product.price,
														currency: "IDR",
													})}
												</p>
											)}
										</footer>
									</div>
								</article>
							</EshopLink>
						</li>
					);
				})}
			</ul>
		</>
	);
};