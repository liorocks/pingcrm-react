<?php

namespace App\components\Report\Domain\Interfaces\Repositories;

use App\components\User\Application\Models\User;

interface UserRepositoryInterface
{
    public function getReportsOf(User $user);
}
