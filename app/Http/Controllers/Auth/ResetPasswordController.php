<?php

namespace App\Http\Controllers\Auth;

use App\components\User\Application\Models\User;
use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordNotification;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Display the password reset view for the given token
     * @param Request $request
     * @return \Inertia\Response
     */
    public function showResetForm(Request $request)
    {
        return Inertia::render('Auth/password/Reset', [
           'email' => $request->email,
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sendPasswordRestEmail(Request $request)
    {
        $table = (new User)->getTable();

        $validated = $request->validate([
            'email' => "required|email|exists:{$table},email"
        ]);

        if (! $validated) {
            return Redirect::back()->with('error', 'Oops. Who are you?');
        }

        Mail::to($request->email)->send(new ResetPasswordNotification($request->email));

        return Redirect::route('login')->with('success', 'We did it!');
    }
}
