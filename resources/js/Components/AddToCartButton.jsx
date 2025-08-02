import { router } from '@inertiajs/react';
import { FiShoppingCart } from 'react-icons/fi';

export default function AddToCartButton({ productId }) {
    function handleAddToCart() {
        console.log('Adding product', productId);

        router.post(route('cart.add'), {
            product_id: productId,
            quantity: 1
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Product added to cart');
            },
            onError: (errors) => {
                console.error('Cart add error:', errors);
            }
        });
    }

    return (
        <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-3 text-white rounded-full transition duration-300 hover:scale-105 shadow-md"
            style={{ backgroundColor: 'rgb(44 43 42)' }}
        >
            <FiShoppingCart className="text-lg" />
            <span>Add to Cart</span>
        </button>
    );
}
