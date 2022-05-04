<?php

namespace App\components\Account\Application\Models;

use App\components\Contact\Application\Models\Contact;
use App\components\Model\Application\Models\Model;
use App\components\Organization\Application\Models\Organization;
use App\components\Report\Application\Models\Report;
use App\components\User\Application\Models\User;

class Account extends Model
{
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function organizations()
    {
        return $this->hasMany(Organization::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
