import { Link, router } from '@inertiajs/react';
import AddToCartButton from './AddToCartButton';

export default function Products({ products }) {
    const productList = products?.data || [];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Explore Our Ayurvedic Products
                </h2>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {productList.length > 0 ? (
                        productList.map((product) => (
                            <div
                                key={product.id}
                                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white"
                            >
                                <Link href={`/product/${product.id}`} className="block">
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        <img
                                            src={product.images?.[0] ? `/storage/${product.images[0]}` : '/placeholder.jpg'}
                                            alt={product.imageAlt || 'Product image'}
                                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = '/placeholder.jpg';
                                            }}
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name || 'Unnamed Product'}</h3>
                                        <p className="mt-1 text-xl font-bold text-green-700">
                                            {product.price ? `$${product.price}` : 'N/A'}
                                        </p>
                                    </div>
                                </Link>

                                <div className="p-4 pt-0">
                                    <AddToCartButton productId={product.id} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500 text-lg">
                            No products found. Check database or logs.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                {products?.data?.length > 0 && products.links?.length > 3 && (
                    <div className="mt-10 flex justify-center flex-wrap gap-2">
                        {products.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                className={`px-4 py-2 text-sm rounded-md transition ${
                                    link.active
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
