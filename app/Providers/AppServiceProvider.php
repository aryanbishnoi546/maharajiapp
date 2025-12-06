<?php
namespace App\Providers;

use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
     public function boot(): void
    {
        $this->synchronizeHostFromRequest();

        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'cartCount' => function () {
                return Auth::check()
                    ? CartItem::where('user_id', Auth::id())->count()
                    : 0;
            },
            'market' => fn () => config('app.market', $this->defaultMarket()),
            'stripe_public_key' => config('services.stripe.key'),
        ]);
    }

    private function synchronizeHostFromRequest(): void
    {
        if ($this->app->runningInConsole()) {
            if ($this->shouldForceHttps()) {
                URL::forceScheme('https');
            }

            $host = parse_url(config('app.url', ''), PHP_URL_HOST) ?? '';
            $this->configureMarketProfile($host);

            return;
        }

        $request = $this->app['request'];
        $scheme = $request->server->get('HTTP_X_FORWARDED_PROTO', $request->getScheme());
        $hostHeader = $request->server->get('HTTP_X_FORWARDED_HOST') ?? $request->getHost();
        $host = $scheme . '://' . $hostHeader;

        URL::forceScheme($scheme);
        URL::forceRootUrl($host);

        config([
            'app.url' => $host,
            'app.asset_url' => $host,
        ]);

        $this->configureMarketProfile($hostHeader);
    }

    private function shouldForceHttps(): bool
    {
        $appUrl = config('app.url');

        return is_string($appUrl)
            && str_starts_with($appUrl, 'https://');
    }

    private function configureMarketProfile(?string $host): void
    {
        $profile = $this->defaultMarket();

        if ($host && $this->isIndianHost($host)) {
            $profile = [
                'region' => 'IN',
                'currency_code' => 'INR',
                'currency_symbol' => '₹',
                'currency_rate' => (float) env('MARKET_INR_RATE', 1),
                'locale' => 'en-IN',
                'payment_gateway' => 'slice',
                'payment_methods' => ['slice', 'cod'],
            ];
        }

        config(['app.market' => $profile]);
    }

    private function defaultMarket(): array
    {
        return [
            'region' => 'US',
            'currency_code' => 'USD',
            'currency_symbol' => '$',
            'currency_rate' => 1,
            'locale' => 'en-US',
            'payment_gateway' => 'paypal',
            'payment_methods' => ['paypal', 'cod'],
        ];
    }

    private function isIndianHost(string $host): bool
    {
        $normalized = Str::of($host)->lower()->replace('www.', '')->value();

        return Str::endsWith($normalized, '.in');
    }
}
