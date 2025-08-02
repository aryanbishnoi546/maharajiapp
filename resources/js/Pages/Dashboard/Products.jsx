import AddProductForm from '@/Components/AddProductForm';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import EditProduct from './EditProductForm';

// ...Imports and setup remain the same

export default function Products({ products, categories, subcategories }) {
    const [editProduct, setEditProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const { props } = usePage();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('products.destroy', id));
        }
    };

    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'N/A';
    };

    const getSubcategoryName = (id) => {
        for (let cat of categories) {
            const sub = cat.subcategories.find(sub => sub.id === id);
            if (sub) return sub.name;
        }
        return 'N/A';
    };

    return (
        <>
            <div className="w-full mx-auto mt-10 px-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-green-900 underline">All Products</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white px-5 py-2 rounded-md shadow-sm transition"
                    >
                        Add New Product
                    </button>
                </div>

                <div className="overflow-x-auto bg-white shadow-md border border-green-100 rounded-lg">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-green-100 text-green-900">
                            <tr>
                                <th className="p-3">S.No</th>
                                <th className="p-3">Image</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Subcategory</th>
                                <th className="p-3">Product</th>
                                <th className="p-3">Discount</th>
                                {/* <th className="p-3">Status</th> */}
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100">
                            {products.data.map((product, index) => (
                                <tr key={product.id} className="hover:bg-green-50">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        {product.images?.length > 0 ? (
                                            <img
                                                src={`/storage/${product.images[0]}`}
                                                alt={product.name}
                                                className="w-14 h-14 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                    </td>
                                    <td className="p-3">{getCategoryName(product.category_id)}</td>
                                    <td className="p-3">{getSubcategoryName(product.subcategory_id)}</td>
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3">
                                        {product.discount
                                            ? `${parseFloat(product.discount).toFixed(2)}% OFF`
                                            : '0%'}
                                    </td>
                                    {/* <td className="p-3">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                            product.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {product.status}
                                        </span>
                                    </td> */}
                                    <td className="p-3">
                                        <button
                                            onClick={() => setEditProduct(product)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
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
                {products.links.length > 3 && (
                    <div className="flex justify-center flex-wrap gap-2 pt-6">
                        {products.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 text-sm rounded border transition ${
                                    link.active
                                        ? 'bg-green-700 text-white'
                                        : !link.url
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white hover:bg-green-100 text-green-700'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-full max-w-xl relative shadow-lg">
                        <button
                            onClick={() => setEditProduct(null)}
                            className="absolute top-2 right-3 text-xl text-red-500"
                        >
                            &times;
                        </button>
                        <EditProduct
                            product={editProduct}
                            categories={categories}
                            subcategories={subcategories}
                            onClose={() => setEditProduct(null)}
                        />
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md w-full max-w-4xl relative shadow-lg">
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="absolute top-2 right-3 text-xl text-red-500"
                        >
                            &times;
                        </button>
                        <AddProductForm onClose={() => setShowAddForm(false)} categories={props.categories} />
                    </div>
                </div>
            )}
        </>
    );
}
