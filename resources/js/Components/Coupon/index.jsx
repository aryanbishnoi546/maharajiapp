import { router, Link } from "@inertiajs/react";
import { useState } from "react";

export default function CouponList({ coupons }) {
    const [localCoupons, setLocalCoupons] = useState(coupons?.data || []);
    const hasCoupons = localCoupons.length > 0;

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const toggleStatus = (id) => {
        setLocalCoupons((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: !c.status } : c))
        );

        router.put(route("coupons.toggleStatus", id), {}, { preserveScroll: true });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-green-900 underline">All Coupons</h1>
              
<button
  className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 text-sm"
  onClick={() => router.visit('/dashboard/coupon/create')}
>
  Add New Coupon
</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm rounded-md overflow-hidden border border-green-100">
                    <thead className="bg-green-100 text-green-900">
                        <tr>
                            <th className="px-4 py-2 text-left">S.No</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Code</th>
                            <th className="px-4 py-2 text-left">Discount</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Active</th>
                            <th className="px-4 py-2 text-left">Expires At</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100">
                        {!hasCoupons ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    No coupons found.
                                </td>
                            </tr>
                        ) : (
                            localCoupons.map((coupon, index) => (
                                <tr key={coupon.id} className="hover:bg-green-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{coupon.name}</td>
                                    <td className="px-4 py-2 text-gray-700">{coupon.code}</td>
                                    <td className="px-4 py-2 text-gray-700">{coupon.discount}</td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {coupon.type === "percent" ? "%" : "Static"}
                                    </td>
                                    <td className="px-4 py-2">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={coupon.status}
                                                onChange={() => toggleStatus(coupon.id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 relative transition duration-300">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition-transform"></div>
                                            </div>
                                        </label>
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {formatDate(coupon.expires_at)}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400"
                                                onClick={() => router.visit(route("coupons.edit", coupon.id))}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to delete this coupon?")) {
                                                        router.delete(route("coupons.destroy", coupon.id), {
                                                            preserveScroll: true,
                                                            onSuccess: () => {
                                                                // Remove from local state
                                                                setLocalCoupons((prev) => prev.filter(c => c.id !== coupon.id));
                                                            }
                                                        });
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {hasCoupons && coupons.links.length > 3 && (
                <div className="flex justify-center mt-6 flex-wrap gap-2">
                    {coupons.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ""}
                            className={`px-3 py-1 rounded border text-sm transition-all ${link.active
                                    ? "bg-green-700 text-white"
                                    : !link.url
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "bg-white text-green-700 hover:bg-green-100"
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
