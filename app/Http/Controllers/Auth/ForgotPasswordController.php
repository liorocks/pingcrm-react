<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
Use App\Models\User;
use App\Mail\ForgotPassword;
use Illuminate\Support\Facades\Mail;

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


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function ShowPasswordForgot()
    {
        return Inertia::render('Auth/PasswordForgot');
    }
    

    public function sendEmail()
    {
        $user = User::where('email', request('email'))->first();

        if (!$user) {
            return redirect()->back()->with('error', 'Oops. Who are you?');
        }

        Mail::to($user->email)->send(new ForgotPassword());

        return redirect('/login')->with('success', 'We did it!');
    }
}
