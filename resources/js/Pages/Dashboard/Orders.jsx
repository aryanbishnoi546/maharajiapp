import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

export default function Orders({ orders }) {
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
     const currentPage = usePage().props.orders.current_page;
  const STATUS_ORDER = ['pending', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

    const toggleSelectOrder = (orderId) => {
        setSelectedOrderIds((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
        );
    };

     const getValidStatuses = (currentStatus, paymentMethod) => {
        const currentIndex = STATUS_ORDER.indexOf(currentStatus || 'pending');
        let validStatuses = STATUS_ORDER.slice(currentIndex + 1);

       if (currentStatus === 'delivered' || currentStatus === 'canceled') {
            validStatuses = [];
        }

        return validStatuses;
    };

    const handleDelete = (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            router.delete(route('orders.destroy', orderId), {
      data: { page: currentPage }
    });
        }
    };

    const handleDeleteSelected = () => {
        if (orders.data.length === 1) {
            const onlyOrderId = orders.data[0].id;
            if (window.confirm('Are you sure you want to delete this order?')) {
                router.delete(route('orders.destroy', onlyOrderId), { data: { page: currentPage } });
            }
            return;
        }

        if (selectedOrderIds.length >= 1) {
            if (window.confirm('Are you sure you want to delete the selected orders?')) {
                router.post(route('orders.massDestroy'), {
                    order_ids: selectedOrderIds,
                      page: currentPage,
                });
            }
        } else {
            alert('Please select at least 1 order to delete.');
        }
    };

   const handleExport = () => {
    if (selectedOrderIds.length > 0) {
        const idsParam = selectedOrderIds.join(',');
        window.location.href = `/orders/download-selected-csv?ids=${idsParam}`;
    } else {
        window.location.href = '/orders/download-csv';
    }
};

    const updateOrderStatus = (orderId, newStatus) => {
        router.patch(route('orders.updateStatus', orderId), {
            status: newStatus,
            page: currentPage,
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                setTransactions(page.props.transactions);
                if (trackingOrder && trackingOrder.id === orderId) {
                    setTrackingOrder((prev) => ({
                        ...prev,
                        status: newStatus,
                        tracking_events: [
                            ...(prev.tracking_events || []),
                            {
                                status: newStatus,
                                reported_at: new Date().toISOString(),
                            },
                        ].sort((a, b) => new Date(a.reported_at) - new Date(b.reported_at)),
                    }));
                }
            },
            onError: (errors) => {
                console.error('Failed to update status', errors);
                alert(errors.status || 'Failed to update status. Please try again.');
                setTransactions((prev) => ({
                    ...prev,
                    data: prev.data.map((order) =>
                        order.id === orderId ? { ...order, status: order.status || 'pending' } : order
                    ),
                }));
                if (trackingOrder && trackingOrder.id === orderId) {
                    setTrackingOrder((prev) => ({
                        ...prev,
                        status: prev.status || 'pending',
                    }));
                }
            },
        });
    };

    const handleCancelOrder = (orderId) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            router.post(route('orders.cancel', orderId), {
                page: currentPage,
            }, {
                preserveScroll: true,
                onSuccess: (page) => {
                    setTransactions(page.props.transactions);
                    if (trackingOrder && trackingOrder.id === orderId) {
                        setTrackingOrder((prev) => ({
                            ...prev,
                            status: 'canceled',
                            tracking_events: [
                                ...(prev.tracking_events || []),
                                {
                                    status: 'canceled',
                                    reported_at: new Date().toISOString(),
                                    note: 'Order canceled by user.',
                                },
                            ].sort((a, b) => new Date(a.reported_at) - new Date(b.reported_at)),
                        }));
                    }
                },
                onError: (errors) => {
                    console.error('Failed to cancel order', errors);
                    alert(errors.status || 'Failed to cancel order. Please try again.');
                },
            });
        }
    };




    return (
        <div className="p-6">
            {orders.data.length === 0 ? (
                <p className="text-center text-red-600 mt-5 text-2xl">No orders have been placed by users yet.</p>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl capitalize text-red-600 font-bold hover:text-red-500">All Orders</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleExport}
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm"
                            >
                                Export Orders
                            </button>
                            <button
                                onClick={handleDeleteSelected}
                                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 text-sm"
                            >
                                Delete Selected Orders
                            </button>
                        </div>
                    </div>

                    <div className="overflow-auto">
                        <table className="min-w-full bg-white border">
                            <thead className="bg-gray-200 text-left text-sm text-green-700">
                                <tr>
                                    <th className="px-4 py-2 border"></th>
                                    <th className="px-4 py-2 border">Order ID</th>
                                    <th className="px-4 py-2 border">User Name</th>
                                    <th className="px-4 py-2 border">Email</th>
                                    <th className="px-4 py-2 border">Role</th>
                                    <th className="px-4 py-2 border">Phone</th>
                                    {/* <th className="px-4 py-2 border">Price</th>
                                    <th className="px-4 py-2 border">Qty</th> */}
                                    <th className="px-4 py-2 border">Shipping</th>
                                    <th className="px-4 py-2 border">Total Price</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((order) =>
                                    order.items.map((item, index) => (
                                        <tr key={`${order.id}-${item.id}`} className="text-sm border-t">
                                            {index === 0 && (
                                                <>
                                                    <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedOrderIds.includes(order.id)}
                                                            onChange={() => toggleSelectOrder(order.id)}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                        {order.order_number}
                                                    </td>
                                                    <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                        {order.user.name}
                                                    </td>
                                                    <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                        {order.user.email}
                                                    </td>
                                                    <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                        {order.user.role}
                                                    </td>
                                                    <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                        {order.user.phone || 'N/A'}
                                                    </td>
                                                </>
                                            )}
                                            {/* <td className="px-4 py-2 border">₹{item.price}</td>
                                                <td className="px-4 py-2 border">{item.quantity}</td> */}
                                            {index === 0 && (
                                                <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                    ${Number(order.shipping_fee || 0).toFixed(2)}
                                                </td>
                                            )}
                                            {index === 0 && (
                                                <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                    ${Number(order.total_amount || 0).toFixed(2)}
                                                </td>
                                            )}
                                            <td className="px-4 py-2 border text-center">
                                            {(order.status === 'delivered' || order.status === 'canceled') ? (
                                                <span
                                                    style={{
                                                        backgroundColor: order.status === 'delivered' ? '#0c6456ff' : '#ef4444',
                                                        color: 'white',
                                                        padding: '0.5rem 0.5rem',
                                                        borderRadius: '0.25rem',
                                                        display: 'inline-block',
                                                        minWidth: '200px'
                                                    }}
                                                >
                                                    {order.status.replace(/_/g, ' ')}
                                                </span>
                                            ) : (
                                                <select
                                                    value={order.status || 'pending'}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="rounded text-sm text-center"
                                                    style={{
                                                        backgroundColor: '#d4cdcdff',
                                                        color: 'black',
                                                        minWidth: '200px',
                                                    }}
                                                >
                                                    <option value={order.status || 'pending'} disabled>
                                                        {order.status?.replace(/_/g, ' ') || 'pending'}
                                                    </option>
                                                    {getValidStatuses(order.status).map((status) => (
                                                        <option key={status} value={status}>
                                                            {status.replace(/_/g, ' ')}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </td>

                                            {index === 0 && (
                                                <td className="px-4 py-2 border" rowSpan={order.items.length}>
                                                    <button
                                                        onClick={() => router.get(route('orders.adminshow', order.id))}
                                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm mr-2"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(order.id)}
                                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {orders.total > orders.per_page && (
                        <div className="mt-6 flex justify-center space-x-2 text-sm">
                            {orders.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 border rounded 
                                        ${link.active ? 'bg-red-600 text-white' : 'bg-white text-black'} 
                                        ${!link.url && 'text-gray-400 cursor-not-allowed'}`}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}