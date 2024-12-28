import { getCategoriesByParentID, getCategoryByID, getProductsByCategoryIDsAction } from "@/actions/product-actions";
import { ProductList } from "@/components/products/product-list";
import { deslugify } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function CategoryPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const parentCategory = await getCategoryByID(params.id);
    const childCategories = await getCategoriesByParentID(params.id);
    const products = await getProductsByCategoryIDsAction(childCategories?.map((category) => category.id) || []);
    if (!products) {
        return notFound();
    }

    return (
		<main className="pb-8">
			<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
				{deslugify(parentCategory?.name || "")}
				<div className="text-lg font-semibold text-muted-foreground">Category</div>
			</h1>
			<ProductList products={products} />
		</main>
	);
} 