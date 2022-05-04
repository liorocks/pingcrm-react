<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordNotification extends Mailable
{
    use Queueable, SerializesModels;

    private $user_email;

    /**
     * Create a new notification instance.
     *
     * @param string $email
     * @return void
     */
    public function __construct(string $email)
    {
        $this->user_email = $email;
    }

    /**
     * Send Mail to user with the reset password 42.
     * @return ResetPasswordNotification
     */
    public function build()
    {
        return $this->subject("Hello Onepilot")
            ->markdown('emails.auth.reset_password');
    }
}


