<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('meetings', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('uuid')->nullable();
        $table->bigInteger('meeting_id')->nullable();
        $table->string('host_id')->nullable();
        $table->string('host_email')->nullable();
        $table->string('topic')->nullable();
        $table->string('status')->nullable();
        $table->timestamp('start_time')->nullable();
        $table->integer('duration')->nullable();
        $table->string('timezone')->nullable();
        $table->text('start_url')->nullable();
        $table->string('join_url')->nullable();
        $table->string('password')->nullable();
        $table->json('settings')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};
