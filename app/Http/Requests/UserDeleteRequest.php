<?php

namespace App\Http\Requests;

use App\Traits\LockedDemoUser;
use Illuminate\Foundation\Http\FormRequest;

class UserDeleteRequest extends FormRequest
{
    use LockedDemoUser;

    public function rules() {
        return [
            //
        ];
    }
}
