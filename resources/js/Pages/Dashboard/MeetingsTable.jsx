import { Link, router } from '@inertiajs/react';

export default function MeetingsTable({ meetings }) {
    const items = meetings?.data || [];
    const links = meetings?.links || [];

    return (
        <div className="w-full mx-auto mt-10 px-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-green-900 underline">All Meetings</h1>
            </div>

            <div className="overflow-x-auto bg-white shadow-md border border-green-100 rounded-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-green-100 text-green-900">
                        <tr>
                            <th className="p-3">S.No</th>
                            <th className="p-3">Topic</th>
                            <th className="p-3">Start Time</th>
                            <th className="p-3">User</th>
                            <th className="p-3">Join</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100">
                        {items.map((m, idx) => (
                            <tr key={m.id} className="hover:bg-green-50">
                                <td className="p-3">{idx + 1}</td>
                                <td className="p-3">{m.topic || `Meeting #${m.id}`}</td>
                                <td className="p-3">{m.start_time}</td>
                                <td className="p-3">{m.host_email || '-'}</td>
                                <td className="p-3">
                                    {m.join_url ? (
                                        <a href={m.join_url} target="_blank" rel="noreferrer" className="text-green-700 underline">Join</a>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {links.length > 3 && (
                <div className="flex justify-center flex-wrap gap-2 pt-6">
                    {links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 text-sm rounded border transition ${
                                link.active
                                    ? 'bg-green-700 text-white'
                                    : !link.url
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white hover:bg-green-100 text-green-700'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


