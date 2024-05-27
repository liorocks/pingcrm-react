import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Organization } from '@/types';
import Table from '@/Components/Table/Table';
import FieldGroup from '@/Components/Form/FieldGroup';

const Edit = () => {
  const { organization } = usePage<{ organization: Organization }>().props;
  const { data, setData, errors, put, processing } = useForm({
    name: organization.name || '',
    email: organization.email || '',
    phone: organization.phone || '',
    address: organization.address || '',
    city: organization.city || '',
    region: organization.region || '',
    country: organization.country || '',
    postal_code: organization.postal_code || ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('organizations.update', organization.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this organization?')) {
      router.delete(route('organizations.destroy', organization.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this organization?')) {
      router.put(route('organizations.restore', organization.id));
    }
  }

  return (
    <div>
      <Head title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('organizations')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Organizations
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {organization.deleted_at && (
        <TrashedMessage
          message="This organization has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup label="Name" name="name" error={errors.name}>
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
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

            <FieldGroup
              label="Province/State"
              name="region"
              error={errors.region}
            >
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
                  {
                    value: '',
                    label: ''
                  },
                  {
                    value: 'CA',
                    label: 'Canada'
                  },
                  {
                    value: 'US',
                    label: 'United States'
                  }
                ]}
              />{' '}
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
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!organization.deleted_at && (
              <DeleteButton onDelete={destroy}>
                Delete Organization
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Organization
            </LoadingButton>
          </div>
        </form>
      </div>
      <h2 className="mt-12 mb-6 text-2xl font-bold">Contacts</h2>
      <Table
        columns={[
          { label: 'Name', name: 'name' },
          { label: 'City', name: 'city' },
          { label: 'Phone', name: 'phone', colSpan: 2 }
        ]}
        rows={organization.contacts}
        getRowDetailsUrl={row => route('contacts.edit', row.id)}
      />
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default Edit;
