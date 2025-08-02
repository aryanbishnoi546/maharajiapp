import React from 'react';
import AuthLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ products, categories, auth }) {
    const [data, setData] = React.useState({
        category_id: '',
        subcategory_id: '',
    });

    function handleFilter(e) {
        const newData = { ...data, [e.target.name]: e.target.value };
        setData(newData);
        router.get(route('products.index'), newData, { preserveState: true });
    }

    return (
        <AuthLayout auth={auth}>
            <Head title="All Products" />
            <div className="w-full max-w-6xl mx-auto mt-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">All Products</h1>
                    <Link
                        href={route('products.create')}
                        className="px-5 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500 text-lg"
                    >
                        Create Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <select
                        name="category_id"
                        value={data.category_id}
                        onChange={handleFilter}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-green-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Table */}
                <div className="overflow-x-auto bg-white shadow-sm border border-gray-200 rounded-lg">
                    <table className="w-full text-left table-auto border-collapse">
                        <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
                            <tr>
                                <th className="p-3 border">Image</th>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Price</th>
                                <th className="p-3 border">Category</th>
                                <th className="p-3 border">User</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product) => (
                                <tr key={product.id} className="text-sm hover:bg-gray-50">
                                    <td className="p-3 border">
                                        {product.images && product.images.length > 0 ? (
                                            <div className="flex gap-2">
                                                {product.images.slice(0, 3).map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={`/storage/${img}`}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                    </td>
                                    <td className="p-3 border">{product.name}</td>
                                    <td className="p-3 border">₹{product.price}</td>
                                    <td className="p-3 border">{product.category}</td>
                                    <td className="p-3 border">{product.user?.name}</td>
                                    <td className="p-3 border space-x-2">
                                        <Link
                                            href={route('products.show', product.id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('products.edit', product.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded shadow"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure?')) {
                                                    router.delete(route('products.destroy', product.id));
                                                }
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center flex-wrap gap-2">
                    {Array.isArray(products.links) &&
                        products.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 text-sm rounded border ${link.active
                                        ? 'bg-green-600 text-white'
                                        : !link.url
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white hover:bg-gray-100 text-gray-700'
                                    }`}
                            />
                        ))}
                </div>
            </div>
        </AuthLayout>
    );
}
