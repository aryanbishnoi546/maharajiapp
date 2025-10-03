<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'uuid',
        'meeting_id',
        'host_id',
        'host_email',
        'topic',
        'status',
        'start_time',
        'duration',
        'timezone',
        'start_url',
        'join_url',
        'password',
        'settings',
    ];
}
