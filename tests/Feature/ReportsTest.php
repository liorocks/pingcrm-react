<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Account;
use App\Models\Report;
use Inertia\Testing\Assert;

class ReportsTest extends TestCase
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
        Report::factory()->count(5)->create();
    }

    public function test_can_view_reports()
    {
        $this->actingAs($this->user)
            ->get('/reports')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->component('Reports/Index');
                $page->has('reports.data', 5, function (Assert $page) {
                    $page->hasAll(['id', 'title', 'description', 'created_at']);
                });
            });
    }
}
