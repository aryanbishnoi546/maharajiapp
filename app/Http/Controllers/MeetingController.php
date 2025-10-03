<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Meeting;
use App\Services\ZoomService;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Notifications\MeetingScheduled;


class MeetingController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Meeting::query()->orderByDesc('start_time');

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $meetings = $query->paginate(10)->withQueryString();

        if ($user->role === 'admin') {
            return Inertia::render('Dashboard', [
                'section'  => 'meetings',
                'meetings' => $meetings,
            ]);
        }

        return Inertia::render('Meetings/Index', [
            'meetings' => $meetings,
            'isAdmin' => false,
        ]);
    }
    public function create(Request $request)
    {
        try {
            $user = Auth::user(); // ✅ logged-in user

            $date = $request->input('date');
            $time = $request->input('time');
            $service = $request->input('service', 'Consultation');

            // ✅ ISO format time for Zoom
            $startTime = date('Y-m-d\TH:i:s', strtotime($date . ' ' . $time));

            // ✅ Zoom API call
            $zoom = new ZoomService();
            $meeting = $zoom->createMeeting($startTime, $service);

            // ✅ Save in DB with user_id
            $savedMeeting = Meeting::create([
                'user_id'      => $user->id,
                'uuid'         => $meeting['uuid'] ?? null,
                'meeting_id'   => $meeting['id'] ?? null,
                'host_id'      => $meeting['host_id'] ?? null,
                'host_email'   => $meeting['host_email'] ?? null,
                'topic'        => $meeting['topic'] ?? $service,
                'status'       => $meeting['status'] ?? 'waiting',
                'start_time' => isset($meeting['start_time'])
                ? Carbon::parse($meeting['start_time'])->format('Y-m-d H:i:s')
                : $startTime,
                'duration'     => $meeting['duration'] ?? 30,
                'timezone'     => $meeting['timezone'] ?? 'Asia/Kolkata',
                'start_url'    => $meeting['start_url'] ?? null,
                'join_url'     => $meeting['join_url'] ?? null,
                'password'     => $meeting['password'] ?? null,
                'settings'     => json_encode($meeting['settings'] ?? []),
            ]);

            // Notify user via email
            if ($user) {
                $user->notify(new MeetingScheduled($savedMeeting));
            }

            return response()->json([
                'message' => 'Meeting created & saved successfully ✅',
                'meeting' => $savedMeeting
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function upcoming(Request $request)
    {
        $user = Auth::user();
        $query = Meeting::query()
            ->where('start_time', '>=', now())
            ->orderBy('start_time');

        $query->where('user_id', $user->id);

        return response()->json([
            'meetings' => $query->limit(5)->get(['id','topic','start_time','join_url'])
        ]);
    }
}
