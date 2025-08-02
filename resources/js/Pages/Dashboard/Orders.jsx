import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Orders({ orders }) {
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);

    const toggleSelectOrder = (orderId) => {
        setSelectedOrderIds(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const handleDelete = (orderId) => {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(route('orders.destroy', orderId));
        }
    };

    const handleDeleteSelected = () => {
        if (selectedOrderIds.length >= 1) {
            if (confirm('Are you sure you want to delete selected orders?')) {
                router.post(route('orders.massDestroy'), {
                    order_ids: selectedOrderIds,
                });
            }
        } else {
            alert('Please select at least one order.');
        }
    };

    return (
        <div className="w-full mx-auto mt-10 px-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-800">All Orders</h1>
                <button
                    onClick={handleDeleteSelected}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow-sm transition"
                >
                    🗑️ Delete Selected
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-sm border border-gray-200 rounded-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="p-3 border">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedOrderIds(orders.data.map(o => o.id));
                                        } else {
                                            setSelectedOrderIds([]);
                                        }
                                    }}
                                />
                            </th>
                            <th className="p-3 border">Order #</th>
                            <th className="p-3 border">User</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Total</th>
                            <th className="p-3 border">Items</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-red-500 font-medium">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.data.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 border-t">
                                    <td className="p-3 border">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrderIds.includes(order.id)}
                                            onChange={() => toggleSelectOrder(order.id)}
                                        />
                                    </td>
                                    <td className="p-3 border font-semibold text-gray-800">
                                        #{order.order_number}
                                    </td>
                                    <td className="p-3 border">{order.user.name}</td>
                                    <td className="p-3 border">{order.user.email}</td>
                                    <td className="p-3 border">
                                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${order.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            : order.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : order.status === 'cancelled'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3 border">
                                        ₹{order.items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(2)}
                                    </td>
                                    <td className="p-3 border">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="text-xs text-gray-700">
                                                {item.name} × {item.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-3 border space-x-2">
                                        <button
                                            onClick={() => router.get(route('orders.adminshow', order.id))}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {orders.links.length > 3 && (
                <div className="flex justify-center flex-wrap gap-2 pt-6">
                    {orders.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 text-sm rounded border transition ${link.active
                                ? 'bg-red-600 text-white'
                                : !link.url
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white hover:bg-gray-100 text-gray-700'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
