import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import { User } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';

const ChangePassword = () => {
  const { user } = usePage<{
    user: User & { password: string; photo: File | null };
  }>().props;

  const { data, setData, errors, post, processing } = useForm({
    old_password: '',
    new_password: '',
    confirm_password: '',

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'put'
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // NOTE: We are using POST method here, not PUT/PATCH. See comment above.
    
  }

  function restore() {
    if (confirm('Are you sure you want to restore this user?')) {
      router.put(route('users.restore', user.id));
    }
  }

  return (
    <div>
      <div className="flex justify-start max-w-lg mb-8">
        <h1 className="text-3xl font-bold">
          <span className="mx-2 font-medium text-indigo-600">Change Password</span>
        </h1>
      </div>
      
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            
            <FieldGroup
              label="Old Password"
              name="old_password"
            >
              <TextInput
                name="old_password"
                type="password"
                error={errors.old_password}
                value={data.old_password}
                onChange={e => setData('old_password', e.target.value)}
              />
            </FieldGroup>
            
            <FieldGroup
              label="New Password"
              name="new_password"
            >
              <TextInput
                name="new_password"
                type="password"
                error={errors.new_password}
                value={data.new_password}
                onChange={e => setData('new_password', e.target.value)}
              />
            </FieldGroup>
            
            <FieldGroup
              label="Confirm Password"
              name="confirm_password"
            >
              <TextInput
                name="confirm_password"
                type="password"
                error={errors.confirm_password}
                value={data.confirm_password}
                onChange={e => setData('confirm_password', e.target.value)}
              />
            </FieldGroup>
            
            
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
ChangePassword.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default ChangePassword;
