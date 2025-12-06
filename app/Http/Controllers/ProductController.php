<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
class ProductController extends Controller
{

public function index()
{
    $products = Product::with(['category', 'subcategory'])
        ->where('status', 'active')
        ->latest()
        ->paginate(4)
        ->through(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'status' => $product->status,
                'imageAlt' => $product->image_alt,
                'images' => is_array($product->images) ? $product->images : ($product->images ? json_decode($product->images, true) : []),
                'category' => $product->category ? $product->category->name : null,
                'subcategory' => $product->subcategory ? $product->subcategory->name : null,
            ];
        });

    return Inertia::render('ProductPage', [
        'products' => $products
    ]);
}


    public function show($id)
{
    $product = Product::findOrFail($id);

    return Inertia::render('SingleProduct', [
        'product' => [
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'imageAlt' => $product->image_alt ?? 'Product image',
            'description' => $product->description ?? '',
            'images' => is_array($product->images) ? $product->images : ($product->images ? json_decode($product->images, true) : []),
            'colors' => $product->colors ? json_decode($product->colors, true) : [],
            'sizes' => $product->sizes ? json_decode($product->sizes, true) : [],
            'highlights' => $product->highlights ? json_decode($product->highlights, true) : [],
            'details' => $product->details ?? '',
            'reviews' => [
                'average' => $product->reviews_average ?? 0,
                'totalCount' => $product->reviews_total_count ?? 0,
            ],
            'breadcrumbs' => [
                ['id' => 1, 'name' => 'Home', 'href' => '/'],
                ['id' => 2, 'name' => 'Products', 'href' => '/products'],
            ],
            'href' => '/products/' . $product->id,
        ],
    ]);
}

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'discount_price' => 'nullable|numeric|min:0|max:99',
        'image_alt' => 'required|string|max:255',
        'description' => 'nullable|string',
        'details' => 'nullable|string',
        'reviews_average' => 'nullable|numeric',
        'reviews_total_count' => 'nullable|integer',
        'images' => 'required|array|min:1',
        'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        'category_id' => 'nullable|exists:categories,id',
        'subcategory_id' => 'nullable|exists:subcategories,id',
        'status' => ['nullable', Rule::in(['active', 'inactive'])],
    ]);

    $imagePaths = [];
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $imagePaths[] = $image->store('products', 'public');
        }
    }

    $product = Product::create([
        'name' => $validated['name'],
        'price' => $validated['price'],
        'image_alt' => $validated['image_alt'],
        'description' => $validated['description'] ?? null,
        'details' => $validated['details'] ?? null,
        'reviews_average' => $validated['reviews_average'] ?? null,
        'reviews_total_count' => $validated['reviews_total_count'] ?? null,
        'images' => $imagePaths,
        'category_id' => $validated['category_id'] ?? null,
        'subcategory_id' => $validated['subcategory_id'] ?? null,
        'discount_price' => $validated['discount_price'] ?? null,
        'status' => $validated['status'] ?? 'active',
    ]);

    Log::info('Product created', ['id' => $product->id, 'name' => $product->name]);

    return redirect()->route('dashboard.products')->with('success', 'Product created successfully');
}

public function update(Request $request, Product $product)
{
    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'price' => 'sometimes|required|numeric',
        'discount_price' => 'nullable|numeric|min:0|max:99',
        'description' => 'sometimes|required|string',
        'category_id' => 'nullable|exists:categories,id',
        'subcategory_id' => 'nullable|exists:subcategories,id',
        'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'imageAlt' => 'nullable|string|max:255',
    ]);

    $product->update([
        'name' => $request->input('name', $product->name),
        'price' => $request->input('price', $product->price),
        'discount_price' => $request->input('discount_price', $product->discount_price),
        'description' => $request->input('description', $product->description),
        'category_id' => $request->input('category_id', $product->category_id),
        'subcategory_id' => $request->input('subcategory_id', $product->subcategory_id),
        'image_alt' => $request->input('imageAlt', $product->image_alt),
    ]);

    $finalImages = [];

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $path = $image->store('products', 'public');
            $finalImages[] = $path;
        }
    } elseif ($request->has('existingImages')) {
        $existingImages = $request->input('existingImages');

        $finalImages = is_array($existingImages)
            ? $existingImages
            : (json_decode($existingImages, true) ?? []);
    }

    if (!empty($finalImages)) {
        $product->images = $finalImages;
        $product->save();
    }

    return redirect()->back()->with('success', 'Product updated successfully');
}


   public function destroy($id)
{
    $product = Product::findOrFail($id);
    $product->delete();

    return redirect()->back()->with('success', 'Product deleted successfully!');
}

public function toggleStatus(Request $request, $id)
{
    $product = Product::findOrFail($id);
    $product->status = $request->status;
    $product->save();

    return back()->with('message', 'Status updated');
}


  public function products()
    {
        $products = Product::latest()->paginate(4)->through(function ($product) {
            return [
                'id'             => $product->id,
                'name'           => $product->name,
                'price'          => $product->price,
                'discount_price' => $product->discount_price,
                'status'         => $product->status,
                'category_id'    => $product->category_id,
                'subcategory_id' => $product->subcategory_id,
                'description'    => $product->description,
                'imageAlt'       => $product->image_alt,
                'images'         => is_array($product->images) ? $product->images : ($product->images ? json_decode($product->images, true) : []),
            ];
        });

        $categories    = Category::with('subcategories')->get();
        $totalProducts = Product::count();

        return Inertia::render('Dashboard', [
            'section'       => 'products',
            'products'      => $products,
            'categories'    => $categories,
            'totalProducts' => $totalProducts,
        ]);
    }





}
