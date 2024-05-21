import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/Button/DeleteButton';
import LoadingButton from '@/Shared/Button/LoadingButton';
import TextInput from '@/Shared/Form/TextInput';
import SelectInput from '@/Shared/Form/SelectInput';
import TrashedMessage from '@/Shared/Messages/TrashedMessage';
import { Organization } from '@/types';
import Table from '@/Shared/Table/Table';

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
        <TrashedMessage onRestore={restore}>
          This organization has been deleted.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Name"
              name="name"
              error={errors?.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Phone"
              name="phone"
              type="text"
              error={errors.phone}
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Address"
              name="address"
              type="text"
              error={errors.address}
              value={data.address}
              onChange={e => setData('address', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="City"
              name="city"
              type="text"
              error={errors.city}
              value={data.city}
              onChange={e => setData('city', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Province/State"
              name="region"
              type="text"
              error={errors.region}
              value={data.region}
              onChange={e => setData('region', e.target.value)}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Country"
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
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Postal Code"
              name="postal_code"
              type="text"
              error={errors.postal_code}
              value={data.postal_code}
              onChange={e => setData('postal_code', e.target.value)}
            />
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
        onRowClickUrl={row => route('contacts.edit', row.id)}
      />
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Edit.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Edit;
