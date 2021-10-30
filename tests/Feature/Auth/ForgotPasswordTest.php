<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use App\Models\Account;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\Notification;
use Inertia\Testing\Assert;

class ForgotPasswordTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $account = Account::create(['name' => 'Acme Corporation']);

        $this->user = User::factory()->create([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'owner' => true,
        ]);
    }

    public function test_can_view_forgot_password_page()
    {
        $this->get(route('password.request'))
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->component('Auth/ForgotPassword');
            });
    }

    public function test_email_is_required()
    {
        $response = $this->post(route('password.email'), [
            'email' => '',
        ]);
        $response->assertSessionHasErrors(['email' => 'The email field is required.']);
    }

    public function test_email_should_be_valid()
    {
        $response = $this->post(route('password.email'), [
            'email' => 'lili',
        ]);
        $response->assertSessionHasErrors(['email' => 'The email must be a valid email address.']);
    }

    public function test_email_should_exist_in_database()
    {
        $response = $this->post(route('password.email'), [
            'email' => 'lili@gmail.com',
        ]);
        $response->assertSessionHasErrors([
            'email' => 'Oops. Who are you?'
        ]);
    }

    public function test_email_should_be_sent()
    {
        Notification::fake();
        $response = $this->post(route('password.email'), [
            'email' => $this->user->email,
        ]);
        $response->assertStatus(302);
        $response->assertLocation(route('login'));
        Notification::assertSentTo($this->user, ResetPasswordNotification::class, function ($notification) {
            $mailData = $notification->toMail($this->user)->toArray();
            $this->assertEquals("Hello Onepilot", $mailData['subject']);
            $this->assertEquals('The answer is 42.', $mailData['introLines'][0]);
            return true;
        });
    }
}
