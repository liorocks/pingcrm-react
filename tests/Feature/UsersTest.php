<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

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
            ->assertPropCount('users.data', 5)
            ->assertPropValue('users.data', function ($users) {
                $this->assertEquals([
                    'id', 'name', 'email', 'owner',
                    'photo', 'deleted_at'
                ],
                    array_keys($users[0])
                );
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
            ->assertPropValue('filters.search', 'Greg')
            ->assertPropCount('users.data', 1)
            ->assertPropValue('users.data', function ($users) {
                $this->assertEquals('Greg Andersson', $users[0]['name']);
            });
    }

    public function test_cannot_view_deleted_users()
    {
        User::factory()->count(5)->create(['account_id' => 1]);
        User::first()->delete();

        $this->actingAs($this->user)
            ->get('/users')
            ->assertStatus(200)
            ->assertPropCount('users.data', 4);
    }

    public function test_can_filter_to_view_deleted_users()
    {
        User::factory()->count(5)->create(['account_id' => 1]);
        User::first()->delete();

        $this->actingAs($this->user)
            ->get('/users?trashed=with')
            ->assertStatus(200)
            ->assertPropValue('filters.trashed', 'with')
            ->assertPropCount('users.data', 5);
    }
}
