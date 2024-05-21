import { Link, useForm } from '@inertiajs/react';
import Layout from '@/__components__/Layout';
import LoadingButton from '@/__components__/Button/LoadingButton';
import TextInput from '@/__components__/Form/TextInput';
import SelectInput from '@/__components__/Form/SelectInput';
import FileInput from '@/__components__/Form/FileInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    owner: '0',
    photo: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('users.store'));
  }

  return (
    <div>
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={route('users')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Users
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
      </div>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form name="createForm" onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <TextInput
              label="First Name"
              name="first_name"
              error={errors.first_name}
              value={data.first_name}
              onChange={e => setData('first_name', e.target.value)}
            />
            <TextInput
              label="Last Name"
              name="last_name"
              error={errors.last_name}
              value={data.last_name}
              onChange={e => setData('last_name', e.target.value)}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              error={errors.password}
              value={data.password}
              onChange={e => setData('password', e.target.value)}
            />
            <SelectInput
              label="Owner"
              name="owner"
              error={errors.owner}
              value={data.owner}
              onChange={e => setData('owner', e.target.value)}
              options={[
                { value: '1', label: 'Yes' },
                { value: '0', label: 'No' }
              ]}
            />
            <FileInput
              label="Photo"
              name="photo"
              accept="image/*"
              error={errors.photo}
              value={data.photo}
              onChange={photo => setData('photo', photo)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create User
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
Create.layout = (page: React.ReactNode) => (
  <Layout title="Create User" children={page} />
);

export default Create;
