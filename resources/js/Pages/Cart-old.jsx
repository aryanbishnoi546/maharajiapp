import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

export default function Cart() {
    const { cartItems } = usePage().props;
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        router.post(route('cart.update'), {
            product_id: id,
            quantity: newQuantity,
        }, { preserveScroll: true });
    };

    const handleRemove = (id) => {
        router.post(route('cart.remove', id), {}, { method: 'post', preserveScroll: true });
    };

    const handleClear = () => {
        router.post(route('cart.clear'), {}, { method: 'post', preserveScroll: true });
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        if (cartItems.length === 1) {

            const onlyProductId = cartItems[0].id;
            if (selectedItems.length === 0) {
                alert("Please select at least one item to checkout.");
                return;
            }
            router.post(route('checkout.selected'), {
                product_ids: [onlyProductId],
            });
            return;
        }

        if (selectedItems.length === 0) {
            alert("Please select at least one item to checkout.");
            return;
        }

        router.post(route('checkout.selected'), {
            product_ids: selectedItems,
        });
    };


    return (
        <>
            <UserLayout>
                <div className="mx-auto max-w-6xl px-4 py-10 text-[#2c2b2a]">
                    <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
                        <FiShoppingCart className="text-[#2c2b2a]" />
                        Your Cart
                    </h1>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-start sm:items-center bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex items-center mb-4 sm:mb-0 sm:mr-6">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelect(item.id)}
                                            className="mr-3 w-5 h-5 accent-[#2c2b2a]"
                                        />
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                    </div>

                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start sm:items-center flex-wrap sm:flex-nowrap">
                                            <div>
                                                <h2 className="text-lg font-semibold text-[#2c2b2a]">{item.name}</h2>
                                                <p className="text-gray-500">Price: ${item.price}</p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    Item Total: ${item.price * item.quantity}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 mt-3 sm:mt-0">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200"
                                                >
                                                    <FiMinus />
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                    className="w-16 text-center border rounded py-1"
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200"
                                                >
                                                    <FiPlus />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 hover:text-red-700 font-medium mt-4 inline-flex items-center gap-1"
                                        >
                                            <FiTrash2 />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
                                <h2 className="text-2xl font-bold text-[#2c2b2a]">
                                    Total: ${getTotal().toFixed(2)}
                                </h2>

                                <div className="mt-4 sm:mt-0 flex gap-3">
                                    <button
                                        onClick={handleClear}
                                        className="bg-red-100 text-red-700 font-semibold px-5 py-2 rounded-full hover:bg-red-200 transition"
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        onClick={handleCheckout}
                                        className="bg-[#2c2b2a] text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </UserLayout>
        </>
    );
}
