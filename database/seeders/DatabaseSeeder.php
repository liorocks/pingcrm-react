<?php

namespace Database\Seeders;

use App\User;
use App\Account;
use App\Contact;
use App\Organization;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $account = Account::create(['name' => 'Acme Corporation']);

        User::factory()->make([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'owner' => true,
        ]);

        User::factory()->count(5)->make([
            'account_id' => $account->id
        ]);

        $organizations = Organization::factory()->count(100)->make([
            'account_id' => $account->id
        ]);

        Contact::factory()->count(100)->make([
            'account_id' => $account->id
        ])
            ->each(function (Contact  $contact) use ($organizations) {
                $contact->update(['organization_id' => $organizations->random()->id]);
            });
    }
}
