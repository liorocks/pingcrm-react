<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class UserDeleteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return !$this->route('user')->isDemoUser();
    }

    public function failedAuthorization() {

        $this->session()->flash('error', 'Deleting the demo user is not allowed.');

        throw ValidationException::withMessages([]);
    }
}
