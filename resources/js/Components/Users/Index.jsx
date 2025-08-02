import { router, Link } from '@inertiajs/react';

export default function UserList({ users }) {
    const userList = users?.data || [];
    const hasUsers = Array.isArray(userList) && userList.length > 0;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-green-900 underline">All Users</h1>
                <button
                    className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 text-sm"
                    onClick={() => router.visit(route('dashboard.users.create'))}
                >
                    Add New User
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm rounded-md overflow-hidden border border-green-100">
                    <thead className="bg-green-100 text-green-900">
                        <tr>
                            <th className="px-4 py-2 text-left">S.No</th>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Active</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100">
                        {!hasUsers ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            userList.map((user, index) => (
                                <tr key={user.id} className="hover:bg-green-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {user.image ? (
                                            <img
                                                src={`/storage/${user.image}`}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-300 text-white flex items-center justify-center rounded-full">
                                                👤
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2 text-gray-700">{user.email}</td>
                                    <td className="px-4 py-2 text-gray-700">{user.phone || '-'}</td>
                                    <td className="px-4 py-2">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={user.active}
                                                onChange={() =>
                                                    router.put(route('users.toggleActive', user.id), {
                                                        preserveScroll: true,
                                                    })
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 relative transition duration-300">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition-transform"></div>
                                            </div>
                                        </label>
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">{user.role || '-'}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400"
                                                onClick={() =>
                                                    router.visit(route('dashboard.users.edit', user.id))
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                onClick={() =>
                                                    router.delete(route('dashboard.users.destroy', user.id))
                                                }
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

            {/* Pagination */}
            {hasUsers && (
                <div className="flex justify-center mt-6 flex-wrap gap-2">
                    {users.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ''}
                            className={`px-3 py-1 rounded border text-sm transition-all ${
                                link.active
                                    ? 'bg-green-700 text-white'
                                    : !link.url
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-green-700 hover:bg-green-100'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
