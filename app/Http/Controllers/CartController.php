<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Coupon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::with('product')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($item) {
                $images = is_string($item->product->images)
                    ? json_decode($item->product->images, true)
                    : $item->product->images;

                return [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'image_url' => !empty($images[0]) ? Storage::url($images[0]) : asset('default.png'),
                    'quantity' => $item->quantity,
                ];
            });

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return redirect()->route('cart.index')->with('message', 'Product added to cart!');
    }

    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        CartItem::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->update(['quantity' => $request->quantity]);

        return redirect()->route('cart.index');
    }

    public function remove($id)
    {
        CartItem::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->delete();

        return redirect()->route('cart.index')->with('message', 'Item removed from cart.');
    }

    public function clear()
    {
        CartItem::where('user_id', Auth::id())->delete();

        return redirect()->route('cart.index')->with('message', 'Cart cleared.');
    }

    public function checkoutSelected(Request $request)
    {
        if ($request->isMethod('post')) {
            $request->validate([
                'product_ids' => 'required|array',
                'product_ids.*' => 'integer|exists:products,id',
            ]);

            $user = Auth::user();

            $cartItems = CartItem::with('product')
                ->where('user_id', $user->id)
                ->whereIn('product_id', $request->product_ids)
                ->get()
                ->map(function ($item) {
                    $images = is_string($item->product->images)
                        ? json_decode($item->product->images, true)
                        : $item->product->images;

                    return [
                        'id' => $item->product_id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'image_url' => !empty($images[0]) ? Storage::url($images[0]) : asset('default.png'),
                        'quantity' => $item->quantity,
                    ];
                });

            // Save the selected items in session
            session(['checkout_selected_cart' => $cartItems]);

            // Redirect to GET version of the route
            return redirect()->route('checkout.selected');
        }

        // If GET: retrieve from session and show page
        $cartItems = session('checkout_selected_cart', []);

        return Inertia::render('OrderForm', [
            'cartItems' => $cartItems,
        ]);
    }

    public function applyCoupon(Request $request)
    {
        $code = $request->input('coupon');

        $coupon = Coupon::where('code', $code)
            ->where('status', 1)
            ->whereDate('expires_at', '>=', now())
            ->first();

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired coupon!'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'coupon' => $coupon,
        ]);
    }
}
