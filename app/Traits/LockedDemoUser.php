<?php

namespace App\Traits;

use Illuminate\Validation\ValidationException;

trait LockedDemoUser {

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

        $this->session()->flash('error', 'Updating or deleting the demo user is not allowed.');

        // Note: This is required, otherwise demo user will update
        // and both, success and error messages will be returned.
        throw ValidationException::withMessages([]);
    }
}
