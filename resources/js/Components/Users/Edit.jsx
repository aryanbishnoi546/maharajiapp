import { useForm } from '@inertiajs/react';

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('dashboard.users.update', user.id));
    };

    return (
        <div className="w-full max-w-7xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
                    <select
                        value={data.role}
                        onChange={e => setData('role', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-200 shadow"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}
