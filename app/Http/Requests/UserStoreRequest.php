<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email', Rule::unique('users')],
            'password' => ['nullable'],
            'owner' => ['required', 'boolean'],
            'photo' => ['nullable', 'image'],
            'photo_path' => ['nullable']
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // if (true) {
            //     $validator->errors()->add('field', 'Something is wrong with this field!');
            // }
            // dd($this->validationData());
            // $this->request->remove('photo');
            // return $this->request->remove('photo');

        });
    }

    protected function prepareForValidation(): void
    {
        $this->request->remove('photo');
        $this->merge([
            'photo_path' => $this->file('photo') ? $this->file('photo')->store('users') : null
        ]);
    }
}
