import { Head, Link } from '@inertiajs/react';
import Products from '@/Components/Products';
import UserLayout from "@/Layouts/UserLayout";

export default function ProductsPage({ products }) {
    return (
        <>
            <Head title="Products" />
            <UserLayout>
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    
                    <Products products={products} />
                </div>
            </UserLayout>
        </>
    );
}
