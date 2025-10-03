import React, { useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Index() {
  const { meetings, isAdmin } = usePage().props;
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  return (
    <div className="p-6">
      <Head title="Meetings" />

      <h1 className="text-2xl font-bold mb-4">Meetings</h1>

      <div className="overflow-x-auto bg-white shadow-md border border-green-100 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3">Topic</th>
              <th className="p-3">Start Time</th>
              <th className="p-3">Join</th>
              {isAdmin && <th className="p-3">User</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {(meetings?.data || meetings || []).map((meeting, index) => (
              <tr key={meeting.id} className="hover:bg-green-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{meeting.topic || `Meeting #${meeting.id}`}</td>
                <td className="p-3">{meeting.start_time}</td>
                <td className="p-3">
                  {meeting.join_url ? (
                    <a href={meeting.join_url} target="_blank" rel="noreferrer" className="text-green-700 underline">Join</a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                {isAdmin && <td className="p-3">{meeting.host_email || '-'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meetings?.links && (
        <div className="flex gap-2 mt-4">
          {meetings.links.map((link, idx) => (
            <Link
              key={idx}
              href={link.url || '#'}
              className={`px-3 py-1 rounded ${link.active ? 'bg-black text-white' : 'bg-gray-200'}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      )}

      {/* Show iFrame when a meeting is selected */}
      {selectedMeeting && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Joining: {selectedMeeting.topic || selectedMeeting.title}
          </h2>
          <iframe
            src={selectedMeeting.join_url} 
            title="Meeting"
            className="w-full h-[500px] border rounded-md"
            allow="camera; microphone; fullscreen"
          />
        </div>
      )}
    </div>
  );
}
