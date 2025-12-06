<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (! Schema::hasColumn('orders', 'coupon')) {
                $table->string('coupon')->nullable()->after('shipping_fee');
            }
            if (! Schema::hasColumn('orders', 'discount')) {
                $table->decimal('discount', 10, 2)->default(0)->after('coupon');
            }
            if (! Schema::hasColumn('orders', 'currency')) {
                $table->string('currency', 3)->default('USD')->after('discount');
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'currency')) {
                $table->dropColumn('currency');
            }
            if (Schema::hasColumn('orders', 'discount')) {
                $table->dropColumn('discount');
            }
            if (Schema::hasColumn('orders', 'coupon')) {
                $table->dropColumn('coupon');
            }
        });
    }
};
