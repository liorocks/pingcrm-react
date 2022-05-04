<?php

namespace App\components\Report\Application\Repositories;


use App\components\Report\Domain\Interfaces\Repositories\UserRepositoryInterface;
use App\components\User\Application\Models\User;
use App\Http\Resources\ReportCollection;
use Illuminate\Support\Facades\Request;

class UserRepository implements UserRepositoryInterface
{

    public function getReportsOf(User $user)
    {
        return new ReportCollection(
            $user->getAccount()->reports()
                ->orderBy('date', 'desc')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                ->appends(Request::all())
        );
    }
}
