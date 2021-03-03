<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use Inertia\Testing\Assert;

class ContactsTest extends TestCase
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

    public function test_can_view_contacts()
    {
        $this->user->account->contacts()->saveMany(
            Contact::factory()->count(5)->make()
        );

        $this->actingAs($this->user)
            ->get('/contacts')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->component('Contacts/Index');
                $page->has('contacts.data', 5, function (Assert $page) {
                    $page->hasAll(['id', 'name', 'phone', 'city', 'deleted_at', 'organization']);
                });
            });
    }

    public function test_can_search_for_contacts()
    {
        $this->user->account->contacts()->saveMany(
            Contact::factory()->count(5)->make()
        )->first()->update([
            'first_name' => 'Greg',
            'last_name' => 'Andersson'
        ]);

        $this->actingAs($this->user)
            ->get('/contacts?search=Greg')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->where('filters.search', 'Greg');
                $page->has('contacts.data', 1, function (Assert $page) {
                    $page->where('name', 'Greg Andersson')->etc();
                });
            });
    }

    public function test_cannot_view_deleted_contacts()
    {
        $this->user->account->contacts()->saveMany(
            Contact::factory()->count(5)->make()
        )->first()->delete();

        $this->actingAs($this->user)
            ->get('/contacts')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->has('contacts.data', 4);
            });
    }

    public function test_can_filter_to_view_deleted_contacts()
    {
        $this->user->account->contacts()->saveMany(
            Contact::factory()->count(5)->make()
        )->first()->delete();

        $this->actingAs($this->user)
            ->get('/contacts?trashed=with')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->where('filters.trashed', 'with');
                $page->has('contacts.data', 5);
            });
    }
}
