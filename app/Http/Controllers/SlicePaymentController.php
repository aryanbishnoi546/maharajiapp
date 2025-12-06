<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\Payment;
use App\Services\SlicePaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SlicePaymentController extends Controller
{
    public function __construct(private SlicePaymentService $slicePaymentService)
    {
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('X-Slice-Signature');

        if (! $this->slicePaymentService->validateSignature($payload, $signature)) {
            Log::warning('Slice webhook rejected due to invalid signature');
            return response()->json(['status' => 'invalid-signature'], 403);
        }

        $data = $request->json()->all();
        $order = $this->resolveOrder($data);

        if (! $order) {
            Log::warning('Slice webhook missing order reference', ['payload' => $data]);
            return response()->json(['status' => 'order-not-found'], 202);
        }

        $status = strtolower($data['status'] ?? '');

        if ($status === 'success') {
            $this->markOrderPaid($order, $data['transaction_id'] ?? null, $data);
            return response()->json(['status' => 'ok']);
        }

        $order->update(['status' => 'failed']);
        Payment::updateOrCreate(
            ['order_id' => $order->id, 'payment_method' => 'slice'],
            [
                'status' => 'failed',
                'transaction_id' => $data['transaction_id'] ?? null,
                'payment_response' => $data,
            ]
        );

        return response()->json(['status' => 'failed']);
    }

    public function return(Order $order, Request $request)
    {
        $status = strtolower($request->query('status', ''));
        $transactionId = $request->query('transaction_id');

        if ($status === 'success') {
            $this->markOrderPaid($order, $transactionId, $request->all());

            return redirect()->route('orders.thankyou', ['order' => $order->id])
                ->with('success', 'Payment captured successfully.');
        }

        $order->update(['status' => 'failed']);

        return redirect()->route('cart.index')
            ->with('error', 'Slice payment was cancelled or failed.');
    }

    private function resolveOrder(array $payload): ?Order
    {
        if (! empty($payload['order_number'])) {
            $order = Order::where('order_number', $payload['order_number'])->first();
            if ($order) {
                return $order;
            }
        }

        if (! empty($payload['metadata']['order_database_id'])) {
            return Order::find($payload['metadata']['order_database_id']);
        }

        if (! empty($payload['order_id'])) {
            return Order::find($payload['order_id']);
        }

        return null;
    }

    private function markOrderPaid(Order $order, ?string $transactionId, array $payload = []): void
    {
        $order->update(['status' => 'completed']);

        Payment::updateOrCreate(
            ['order_id' => $order->id, 'payment_method' => 'slice'],
            [
                'status' => 'completed',
                'transaction_id' => $transactionId,
                'payment_response' => $payload,
            ]
        );

        CartItem::where('user_id', $order->user_id)
            ->whereIn('product_id', $order->items()->pluck('product_id'))
            ->delete();

        Log::info('Slice payment completed', [
            'order_id' => $order->id,
            'transaction_id' => $transactionId,
        ]);
    }
}
