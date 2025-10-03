import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import UserLayout from '@/Layouts/UserLayout';
import OrderTrackingTimeline from '@/Components/OrderTrackingTimeline';

export default function MyOrders() {
    const { transactions: initialTransactions } = usePage().props;
    const [transactions, setTransactions] = useState(initialTransactions);
    const [trackingOrder, setTrackingOrder] = useState(null);
    const [showTrackingModal, setShowTrackingModal] = useState(false);

    const currentPage = transactions.current_page;

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-500',
            paid: 'bg-blue-500',
            packed: 'bg-emerald-500',
            shipped: 'bg-sky-500',
            out_for_delivery: 'bg-violet-500',
            delivered: 'bg-green-700',
            completed: 'bg-green-500',
            canceled: 'bg-red-500',
            failed: 'bg-rose-600',
        };
        return colors[status] || 'bg-gray-400';
    };

    const handleCancelOrder = (id) => {
        if (confirm('Are you sure you want to cancel this order?')) {
            router.post(route('orders.cancel', id), { page: currentPage }, {
                preserveScroll: true,
                onSuccess: (page) => {
                    setTransactions(page.props.transactions);
                    if (trackingOrder?.id === id) {
                        setTrackingOrder(prev => ({
                            ...prev,
                            status: 'canceled',
                            tracking_events: [
                                ...(prev.tracking_events || []),
                                {
                                    status: 'canceled',
                                    reported_at: new Date().toISOString(),
                                    note: 'Order canceled by user.',
                                },
                            ],
                        }));
                    }
                },
            });
        }
    };

    const handleDeleteTransaction = (id) => {
        if (confirm('Delete this transaction?')) {
            router.delete(route('transactions.singledelete', id), {
                data: { page: currentPage },
                preserveScroll: true,
                onSuccess: () => {
                    setTransactions(prev => ({
                        ...prev,
                        data: prev.data.filter(t => t.id !== id),
                    }));
                },
            });
        }
    };

    const handleViewOrder = (id) => {
        router.visit(route('orders.usershow', id));
    };

    return (
        <UserLayout>
            <div className="p-4 md:p-8 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-red-600 mb-6 text-left">My Orders</h2>

                {transactions.data.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No orders found.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left font-medium">Order ID</th>
                                    <th className="p-3 text-left font-medium">Name</th>
                                    <th className="p-3 text-left font-medium">Email</th>
                                    <th className="p-3 text-left font-medium">Phone</th>
                                    <th className="p-3 text-left font-medium">Txn ID</th>
                                    <th className="p-3 text-left font-medium">Total</th>
                                    <th className="p-3 text-left font-medium">Payment</th>
                                    <th className="p-3 text-center font-medium">Status</th>
                                    <th className="p-3 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.data.map(order => (
                                    <tr key={order.id}>
                                        <td className="p-3">{order.order_number || order.id}</td>
                                        <td className="p-3">{order.user?.name || 'N/A'}</td>
                                        <td className="p-3">{order.user?.email || 'N/A'}</td>
                                        <td className="p-3">{order.user?.phone || 'N/A'}</td>
                                        <td className="p-3">{order.payment?.transaction_id || 'N/A'}</td>
                                        <td className="p-3">${Number(order.total_amount || 0).toFixed(2)}</td>
                                        <td className="p-3 capitalize">{order.payment_method || 'N/A'}</td>
                                        <td className="p-3 text-center">
                                            <span
                                                className={`inline-block text-white text-xs font-semibold px-2 py-1 rounded ${getStatusColor(order.status)}`}
                                            >
                                                {order.status?.replace(/_/g, ' ') || 'pending'}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="relative inline-block text-left">
                                                <Menu as="div" className="relative">
                                                    <Menu.Button className="inline-flex justify-center w-full p-1 rounded-full hover:bg-gray-200">
                                                        <EllipsisVerticalIcon className="h-5 w-5" />
                                                    </Menu.Button>
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => {
                                                                            setTrackingOrder(order);
                                                                            setShowTrackingModal(true);
                                                                        }}
                                                                        className={`${
                                                                            active ? 'bg-gray-100' : ''
                                                                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                                    >
                                                                        Track
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => handleViewOrder(order.id)}
                                                                        className={`${
                                                                            active ? 'bg-gray-100' : ''
                                                                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                                    >
                                                                        View
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            {(order.status === 'packed' || order.status === 'shipped') && (
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => handleCancelOrder(order.id)}
                                                                            className={`${
                                                                                active ? 'bg-gray-100' : ''
                                                                            } block w-full text-left px-4 py-2 text-sm text-red-600`}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            )}
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => handleDeleteTransaction(order.id)}
                                                                        className={`${
                                                                            active ? 'bg-gray-100' : ''
                                                                        } block w-full text-left px-4 py-2 text-sm text-red-600`}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Menu>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {transactions.total > transactions.per_page && (
                    <div className="mt-6 flex justify-center flex-wrap gap-2">
                        {transactions.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 border rounded text-sm ${
                                    link.active ? 'bg-red-600 text-white' : 'bg-white text-black'
                                } ${!link.url ? 'text-gray-400 cursor-not-allowed' : ''}`}
                            />
                        ))}
                    </div>
                )}

                {/* Tracking Modal */}
                {showTrackingModal && trackingOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                            <h2 className="text-xl font-bold mb-4">
                                Tracking for Order {trackingOrder.order_number || trackingOrder.id}
                            </h2>
                            <OrderTrackingTimeline
                                orderId={trackingOrder.id}
                                initialEvents={trackingOrder.tracking_events || []}
                            />
                            <div className="mt-6 text-right">
                                <button
                                    onClick={() => setShowTrackingModal(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
