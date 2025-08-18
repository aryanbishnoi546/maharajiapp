<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ZoomService;

class MeetingController extends Controller
{
    public function create(Request $request)
    {
        try {
            $date = $request->input('date');
            $time = $request->input('time');
            $service = $request->input('service', 'Consultation');

            // Zoom ke liye ISO format time banana
            $startTime = date('Y-m-d\TH:i:s', strtotime($date . ' ' . $time));

            $zoom = new ZoomService();
            $meeting = $zoom->createMeeting($startTime, $service);

            return response()->json($meeting);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
