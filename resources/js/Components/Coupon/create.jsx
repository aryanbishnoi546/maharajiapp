import { useForm, router } from "@inertiajs/react";

export default function CreateCoupon() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        code: "",
        discount: "",
        type: "percent",
        status: true,
        expires_at: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("coupons.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6  mx-auto">
            <h1 className="text-2xl font-semibold text-green-900 mb-6">Create Coupon</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>

                {/* Code */}
                <div>
                    <label className="block text-sm font-medium mb-1">Code</label>
                    <input
                        type="text"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.code && <div className="text-red-500 text-sm">{errors.code}</div>}
                </div>

                {/* Discount */}
                <div>
                    <label className="block text-sm font-medium mb-1">Discount</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.discount}
                        onChange={(e) => setData("discount", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.discount && <div className="text-red-500 text-sm">{errors.discount}</div>}
                </div>

                {/* Type */}
                <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="percent">Percent</option>
                        <option value="static">Static</option>
                    </select>
                    {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
                </div>

                {/* Status */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={data.status}
                        onChange={(e) => setData("status", e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm">Active</label>
                    {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                </div>

                {/* Expiry Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Expires At</label>
                    <input
                        type="date"
                        value={data.expires_at}
                        onChange={(e) => setData("expires_at", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.expires_at && <div className="text-red-500 text-sm">{errors.expires_at}</div>}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        {processing ? "Saving..." : "Save Coupon"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.visit(route("coupons.index"))}
                        className="text-gray-600 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
