<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class SlicePaymentService
{
    public function createCheckoutSession(Order $order): array
    {
        $baseUrl = rtrim(config('services.slice.base_url'), '/');
        $apiKey = config('services.slice.key');
        $apiSecret = config('services.slice.secret');

        if (! $baseUrl || ! $apiKey || ! $apiSecret) {
            throw new RuntimeException('Slice credentials are not configured.');
        }

        $payload = [
            'order_id' => $order->order_number,
            'amount' => (int) round($order->total_amount * 100),
            'currency' => $order->currency ?? 'INR',
            'customer' => [
                'name' => optional($order->user)->name,
                'email' => optional($order->user)->email,
                'phone' => optional($order->user)->phone,
            ],
            'callback_url' => route('payment.slice.webhook'),
            'success_url' => route('payment.slice.return', ['order' => $order->id, 'status' => 'success']),
            'cancel_url' => route('payment.slice.return', ['order' => $order->id, 'status' => 'failed']),
            'metadata' => [
                'order_database_id' => $order->id,
                'user_id' => $order->user_id,
            ],
        ];

        $response = Http::withHeaders([
            'X-Slice-Key' => $apiKey,
            'X-Slice-Secret' => $apiSecret,
        ])->post($baseUrl . '/checkout', $payload);

        if ($response->failed()) {
            Log::error('Slice checkout API failure', [
                'payload' => $payload,
                'body' => $response->body(),
                'status' => $response->status(),
            ]);
            throw new RuntimeException('Slice API rejected the checkout request.');
        }

        $data = $response->json();

        if (! isset($data['redirect_url'])) {
            $fallbackUrl = rtrim(config('services.slice.checkout_url'), '/') . '?token=' . urlencode($data['token'] ?? $order->order_number);
            $data['redirect_url'] = $fallbackUrl;
        }

        return $data;
    }

    public function validateSignature(string $payload, ?string $signature): bool
    {
        $secret = config('services.slice.webhook_secret');

        if (! $secret) {
            return true;
        }

        if (! $signature) {
            return false;
        }

        $expected = hash_hmac('sha256', $payload, $secret);

        return hash_equals($expected, $signature);
    }
}
