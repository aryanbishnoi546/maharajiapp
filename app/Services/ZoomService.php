<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ZoomService
{
    private function getAccessToken()
    {
        $clientId = env('ZOOM_CLIENT_ID');
        $clientSecret = env('ZOOM_CLIENT_SECRET');
        $accountId = env('ZOOM_ACCOUNT_ID');

        $response = Http::asForm()
            ->withHeaders([
                'Authorization' => 'Basic ' . base64_encode("$clientId:$clientSecret"),
            ])
            ->post('https://zoom.us/oauth/token', [
                'grant_type' => 'account_credentials',
                'account_id' => $accountId,
            ]);

        if ($response->successful()) {
            return $response->json()['access_token'];
        }

        throw new \Exception('Zoom Token Error: ' . $response->body());
    }

    public function createMeeting($startTime, $topic = "Consultation")
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)->post(env('ZOOM_BASE_URL') . '/users/me/meetings', [
            "topic" => $topic,
            "type" => 2,
            "start_time" => $startTime,
            "duration" => 30,
            "timezone" => "Asia/Kolkata",
            "settings" => [
                "host_video" => true,
                "participant_video" => true,
                "join_before_host" => true,
            ]
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Zoom Meeting Error: ' . $response->body());
    }
}
