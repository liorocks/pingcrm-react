<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Mail\ForgotPasswordMail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function forgotPasswordPage()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function requestNewPassword(Request $request)
    {
        $user = User::where('email', $request->email)->get()->first();

        return !$user ? "Oops. Who are you ?" : $this->sendResetPasswordEmail($user->email);
    }

    private function sendResetPasswordEmail($email)
    {
        Mail::to($email)->send(new ForgotPasswordMail());
    }
}
