import Footer from "@/Components/Footer";
import Products from "@/Components/Products";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from '@inertiajs/react';

export default function BestSellers({ products }) {
    return (
        <>
            <Head title="BestSeller" />
            <UserLayout>
                <div >
                   <Products products={products} />
                </div>
            </UserLayout>
        </>
    )
}