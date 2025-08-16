<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index()
    {
        $coupons = Coupon::orderBy('id', 'desc')->paginate(10);

        return Inertia::render('Dashboard', [
            'section' => 'coupon',
            'coupons' => $coupons
        ]);
    }

   public function create()
{
    return Inertia::render('Dashboard', [
        'section' => 'Create_coupon'
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'code'      => 'required|string|size:6|unique:coupons,code',
            'discount'  => 'required|numeric|min:0',
            'type'      => 'required|in:percent,static',
            'status'    => 'required|boolean',
            'expires_at'=> 'nullable|date|after:today',
        ]);

        Coupon::create($request->all());

        return redirect()->route('coupon.index')->with('success', 'Coupon created successfully.');
    }

    public function edit(Coupon $coupon)
    {
        return Inertia::render('Dashboard', [
            'section' => 'Edit_Coupon', 
            'coupon'  => $coupon,
        ]);
    }

    public function update(Request $request, Coupon $coupon)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'code' => 'required|string|size:6|unique:coupons,code,' . $coupon->id,
            'discount'  => 'required|numeric|min:0',
            'type'      => 'required|in:percent,static',
            'status'    => 'required|boolean',
            'expires_at'=> 'nullable|date|after:today',
        ]);

        $coupon->update($request->all());

        return redirect()->back()->with('success', 'Coupon updated successfully.');
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return redirect()->back()->with('success', 'Coupon deleted successfully.');
    }

    public function toggleStatus(Coupon $coupon)
    {
        $coupon->status = !$coupon->status;
        $coupon->save();

        return redirect()->back();
    }

}
