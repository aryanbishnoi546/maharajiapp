import AddProductForm from '@/Components/AddProductForm';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import EditProduct from './EditProductForm';

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
            <div className="w-full max-w-7xl mx-auto mt-10 px-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold text-gray-800">All Products</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-sm transition"
                    >
                        + Add New Product
                    </button>
                </div>

                <div className="overflow-x-auto bg-white shadow-sm border border-gray-200 rounded-lg">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="p-3 border">S.No</th>
                                <th className="p-3 border">Image</th>
                                <th className="p-3 border">Category</th>
                                <th className="p-3 border">Subcategory</th>
                                <th className="p-3 border">Product</th>
                                <th className="p-3 border">Discount</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50 border-t">
                                    <td className="p-3 border">{index + 1}</td>
                                    <td className="p-3 border">
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
                                    <td className="p-3 border">{getCategoryName(product.category_id)}</td>
                                    <td className="p-3 border">{getSubcategoryName(product.subcategory_id)}</td>
                                    <td className="p-3 border">{product.name}</td>
                                    <td className="p-3 border">
                                        {product.discount
                                            ? `${parseFloat(product.discount).toFixed(2)}% OFF`
                                            : '0%'}
                                    </td>
                                    <td className="p-3 border">
                                        <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="p-3 border space-x-2">
                                        <button
                                            onClick={() => setEditProduct(product)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                                        >
                                            🗑️ Delete
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
                                        ? 'bg-green-600 text-white'
                                        : !link.url
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white hover:bg-gray-100 text-gray-700'
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
