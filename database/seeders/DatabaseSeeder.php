<?php

namespace Database\Seeders;

use App\components\Account\Application\Models\Account;
use App\components\Contact\Application\Models\Contact;
use App\components\Organization\Application\Models\Organization;
use App\components\Report\Application\Models\Report;
use App\components\User\Application\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $account = Account::create(['name' => 'Acme Corporation']);

        User::factory()->create([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'owner' => true,
        ]);

        User::factory()->count(5)->create([
            'account_id' => $account->id
        ]);

        $organizations = Organization::factory()->count(100)->create([
            'account_id' => $account->id
        ]);

        Contact::factory()->count(100)->create([
            'account_id' => $account->id
        ])
            ->each(function (Contact  $contact) use ($organizations) {
                $contact->update(['organization_id' => $organizations->random()->id]);
            });

        Report::factory()->count(20)->create([
            'account_id' => $account->id
        ]);
    }
}
