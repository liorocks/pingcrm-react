<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use Inertia\Testing\Assert;

class UsersTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $account = Account::create(['name' => 'Acme Corporation']);

        $this->user = User::factory()->make([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'owner' => true,
        ]);
    }

    public function test_can_view_users()
    {
        User::factory()->count(5)->create(['account_id' => 1]);

        $this->actingAs($this->user)
            ->get('/users')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->component('Users/Index');
                $page->has('users.data', 5, function (Assert $page) {
                    $page->hasAll(['id', 'name', 'email', 'owner', 'photo', 'deleted_at']);
                });
            });
    }

    public function test_can_search_for_users()
    {
        User::factory()->count(5)->create(['account_id' => 1]);

        User::first()->update([
            'first_name' => 'Greg',
            'last_name' => 'Andersson'
        ]);

        $this->actingAs($this->user)
            ->get('/users?search=Greg')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->where('filters.search', 'Greg');
                $page->has('users.data', 1, function (Assert $page) {
                    $page->where('name', 'Greg Andersson')->etc();
                });
            });
    }

    public function test_cannot_view_deleted_users()
    {
        User::factory()->count(5)->create(['account_id' => 1]);
        User::first()->delete();

        $this->actingAs($this->user)
            ->get('/users')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->has('users.data', 4);
            });
    }

    public function test_can_filter_to_view_deleted_users()
    {
        User::factory()->count(5)->create(['account_id' => 1]);
        User::first()->delete();

        $this->actingAs($this->user)
            ->get('/users?trashed=with')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->where('filters.trashed', 'with');
                $page->has('users.data', 5);
            });
    }
}
