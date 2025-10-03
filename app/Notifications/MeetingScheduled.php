<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Meeting;

class MeetingScheduled extends Notification
{
    use Queueable;

    protected Meeting $meeting;

    public function __construct(Meeting $meeting)
    {
        $this->meeting = $meeting;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your Meeting is Scheduled')
            ->greeting('Hello ' . ($notifiable->name ?? ''))
            ->line('Your meeting has been scheduled.')
            ->line('Topic: ' . ($this->meeting->topic ?? 'Consultation'))
            ->line('Start Time: ' . (is_string($this->meeting->start_time) ? $this->meeting->start_time : optional($this->meeting->start_time)->toDateTimeString()))
            ->action('Join Meeting', $this->meeting->join_url ?? url('/meetings'))
            ->line('Thank you!');
    }
}


