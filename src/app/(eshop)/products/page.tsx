import { getAllProductsAction } from "@/actions/product-actions"
import { ProductList } from "@/components/products/product-list";

export default async function ProductsPage() {
    const products = await getAllProductsAction();
    if (products === null) {
        return null;
    }
    return (
        <main className="pb-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">All Products</h1>
			<ProductList products={products} />
        </main>
    )
}