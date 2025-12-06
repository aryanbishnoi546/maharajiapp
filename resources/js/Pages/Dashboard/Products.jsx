import AddProductForm from '@/Components/AddProductForm';
import { router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import EditProduct from './EditProductForm';
import { Search, Sparkles } from 'lucide-react';

export default function Products({ products, categories, subcategories }) {
    const [editProduct, setEditProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [query, setQuery] = useState('');
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

    const filteredProducts = useMemo(() => {
        if (!query.trim()) return products.data;
        return products.data.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            getCategoryName(product.category_id).toLowerCase().includes(query.toLowerCase())
        );
    }, [products.data, query]);

    return (
        <>
            <div className="w-full mx-auto px-4 space-y-6 py-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm text-slate-500 uppercase tracking-[0.3em]">Inventory</p>
                        <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
                            Products
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <Sparkles size={14} /> refreshed
                            </span>
                        </h1>
                        <p className="text-slate-500 text-sm">Manage catalogue, pricing, and discounts from a single view.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by product or category"
                                className="pl-9 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-sm focus:border-emerald-400 focus:ring-emerald-100"
                            />
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-2xl shadow"
                        >
                            Add product
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white shadow-sm border border-slate-100 rounded-3xl">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">Product</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Subcategory</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Discount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.map((product, index) => (
                                <tr key={product.id} className="hover:bg-slate-50">
                                    <td className="p-4 text-slate-400">{index + 1}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {product.images?.length > 0 ? (
                                                <img
                                                    src={product.images[0].startsWith('http') ? product.images[0] : `/storage/${product.images[0]}`}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-xl border border-slate-100"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs">No image</div>
                                            )}
                                            <div>
                                                <p className="font-medium text-slate-900">{product.name}</p>
                                                <p className="text-xs text-slate-500">ID #{product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{getCategoryName(product.category_id)}</td>
                                    <td className="p-4 text-slate-600">{getSubcategoryName(product.subcategory_id)}</td>
                                    <td className="p-4 font-semibold text-slate-900">${Number(product.price).toFixed(2)}</td>
                                    <td className="p-4">
                                        {product.discount_price
                                            ? <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold">{parseFloat(product.discount_price).toFixed(1)}% off</span>
                                            : <span className="text-slate-400 text-xs">No discount</span>
                                        }
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button
                                                onClick={() => setEditProduct(product)}
                                                className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-xs px-3 py-1 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
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
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center" onClick={() => setEditProduct(null)}>
                    <div className="bg-white p-6 rounded-2xl w-full max-w-xl relative shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setEditProduct(null)}
                            className="absolute top-3 right-4 text-2xl text-slate-400 hover:text-slate-600"
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
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center" onClick={() => setShowAddForm(false)}>
                    <div className="bg-white p-6 rounded-2xl w-full max-w-4xl relative shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="absolute top-3 right-4 text-2xl text-slate-400 hover:text-slate-600"
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
