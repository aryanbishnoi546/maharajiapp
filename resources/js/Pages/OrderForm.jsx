import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { stripePromise } from '../Pages/stripe';
import UserLayout from '@/Layouts/UserLayout';

function StripeFormComponent() {
    const { cartItems } = usePage().props;
    const stripe = useStripe();
    const elements = useElements();

    const { data, setData, post, processing, errors } = useForm({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        payment_method: '',
        payment_method_id: '',
        coupon: '',
        discount: 0,
        cart: cartItems?.map(item => ({
            id: item.id,
            quantity: item.quantity,
        })) || [],
    });

    useEffect(() => {
        setData('cart', cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
        })));
    }, [cartItems]);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() - data.discount;
    };

    const [cardError, setCardError] = useState('');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [couponInput, setCouponInput] = useState('');

    const isStripeReady = stripe && elements;

    // ✅ Handle Coupon Apply (static for now)
    const applyCoupon = async () => {
    try {
        const response = await axios.post(route("apply.coupon"), {
            coupon: couponInput,
        });

        if (response.data.success) {
            const coupon = response.data.coupon;

            setData("coupon", coupon.code);

            if (coupon.type === "percent") {
                setData("discount", Math.round(calculateSubtotal() * (coupon.discount / 100)));
            } else {
                setData("discount", parseFloat(coupon.discount));
            }
        }
    } catch (error) {
        setData("coupon", "");
        setData("discount", 0);
        alert(error.response?.data?.message || "Invalid coupon!");
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCardError('');

        if (data.payment_method === 'stripe') {
            if (!isStripeReady) {
                setCardError('Stripe not loaded yet.');
                return;
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setCardError('Card input missing.');
                return;
            }

            setIsProcessingPayment(true);

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setCardError(error.message);
                setIsProcessingPayment(false);
                return;
            }

            setData('payment_method_id', paymentMethod.id);
        } else {
            post(route('orders.store'), { preserveScroll: true });
        }
    };

    useEffect(() => {
        if (data.payment_method_id && data.payment_method === 'stripe' && isProcessingPayment) {
            post(route('orders.store'), {
                preserveScroll: true,
                onFinish: () => setIsProcessingPayment(false),
            });
        }
    }, [data.payment_method_id]);

    return (
        <UserLayout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left: Form */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-semibold mb-6">Checkout</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Address Fields (same as before) */}

                            {/* Payment Method */}
                             {/* Address */}
                            <div>
                                <label className="text-sm font-medium">Address Line 1 *</label>
                                <input
                                    type="text"
                                    value={data.address_line1}
                                    onChange={(e) => setData('address_line1', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Address Line 2</label>
                                <input
                                    type="text"
                                    value={data.address_line2}
                                    onChange={(e) => setData('address_line2', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">City *</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">State *</label>
                                    <input
                                        type="text"
                                        value={data.state}
                                        onChange={(e) => setData('state', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Postal Code *</label>
                                    <input
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Country *</label>
                                    <input
                                        type="text"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Payment Method *</label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) => setData('payment_method', e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                                    required
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="cod">Cash on Delivery</option>
                                    {/* <option value="online">Razorpay</option> */}
                                    {/* <option value="stripe">Stripe Payment</option> */}
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>

                            {data.payment_method === 'stripe' && (
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <label className="text-sm font-medium">Card Details</label>
                                    <CardElement className="p-3 border border-gray-200 rounded mt-2 bg-white" />
                                    {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={processing || isProcessingPayment}
                                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
                            >
                                {processing || isProcessingPayment ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                        <ul className="space-y-3">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-4" />

                        {/* Coupon Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter Coupon"
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2"
                            />
                            <button
                                type="button"
                                onClick={applyCoupon}
                                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                            >
                                Apply Coupon
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>₹{calculateSubtotal()}</span>
                        </div>
                        {data.discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount ({data.coupon})</span>
                                <span>- ₹{data.discount}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-semibold mt-2">
                            <span>Total</span>
                            <span>₹{calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

export default function OrderForm() {
    return (
        <Elements stripe={stripePromise}>
            <StripeFormComponent />
        </Elements>
    );
}
