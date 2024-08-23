import { Link, usePage, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import { Organization } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';

const Create = () => {
  const { organizations } = usePage<{ organizations: Organization[] }>().props;
  const { data, setData, errors, post, processing } = useForm({
    first_name: '',
    last_name: '',
    organization_id: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('contacts.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('contacts')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Contacts
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup
              label="First Name"
              name="first_name"
              error={errors.first_name}
            >
              <TextInput
                name="first_name"
                error={errors.first_name}
                value={data.first_name}
                onChange={e => setData('first_name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Last Name"
              name="last_name"
              error={errors.last_name}
            >
              <TextInput
                name="last_name"
                error={errors.last_name}
                value={data.last_name}
                onChange={e => setData('last_name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Organization"
              name="organization_id"
              error={errors?.organization_id}
            >
              <SelectInput
                name="organization_id"
                error={errors.organization_id}
                value={data.organization_id}
                onChange={e => setData('organization_id', e.target.value)}
                options={organizations?.map(({ id, name }) => ({
                  value: String(id),
                  label: name
                }))}
              />
            </FieldGroup>

            <FieldGroup label="Email" name="email" error={errors.email}>
              <TextInput
                name="email"
                type="email"
                error={errors.email}
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Phone" name="phone" error={errors.phone}>
              <TextInput
                name="phone"
                error={errors.phone}
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Address" name="address" error={errors.address}>
              <TextInput
                name="address"
                error={errors.address}
                value={data.address}
                onChange={e => setData('address', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="City" name="city" error={errors.city}>
              <TextInput
                name="city"
                error={errors.city}
                value={data.city}
                onChange={e => setData('city', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Region" name="region" error={errors.region}>
              <TextInput
                name="region"
                error={errors.region}
                value={data.region}
                onChange={e => setData('region', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Country" name="country" error={errors.country}>
              <SelectInput
                name="country"
                error={errors.country}
                value={data.country}
                onChange={e => setData('country', e.target.value)}
                options={[
                  { value: 'CA', label: 'Canada' },
                  { value: 'US', label: 'United States' }
                ]}
              />
            </FieldGroup>

            <FieldGroup
              label="Postal Code"
              name="postal_code"
              error={errors.postal_code}
            >
              <TextInput
                name="postal_code"
                error={errors.postal_code}
                value={data.postal_code}
                onChange={e => setData('postal_code', e.target.value)}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Contact
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
  <MainLayout title="Create Contact" children={page} />
);

export default Create;
