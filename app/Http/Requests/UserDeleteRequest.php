<?php

namespace App\Http\Requests;

use App\Traits\LockedDemoUser;
use Illuminate\Foundation\Http\FormRequest;

class UserDeleteRequest extends FormRequest
{
    use LockedDemoUser;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
