import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Icon from '@/Shared/Icon';

export default () => {
  const { errors, organization } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    name: organization.name || '',
    email: organization.email || '',
    phone: organization.phone || '',
    address: organization.address || '',
    city: organization.city || '',
    region: organization.region || '',
    country: organization.country || '',
    postal_code: organization.postal_code || ''
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    Inertia.put(
      route('organizations.update', organization.id),
      values
    ).then(() => setSending(false));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this organization?')) {
      Inertia.delete(route('organizations.destroy', organization.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this organization?')) {
      Inertia.put(route('organizations.restore', organization.id));
    }
  }

  return (
    <Layout>
      <Helmet title={values.name} />
      <div>
        <h1 className="mb-8 font-bold text-3xl">
          <InertiaLink
            href={route('organizations')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Organizations
          </InertiaLink>
          <span className="text-indigo-600 font-medium mx-2">/</span>
          {values.name}
        </h1>
        {organization.deleted_at && (
          <TrashedMessage onRestore={restore}>
            This organization has been deleted.
          </TrashedMessage>
        )}
        <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="p-8 -mr-6 -mb-8 flex flex-wrap">
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Name"
                name="name"
                errors={errors.name}
                value={values.name}
                onChange={handleChange}
              />
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Email"
                name="email"
                type="email"
                errors={errors.email}
                value={values.email}
                onChange={handleChange}
              />
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Phone"
                name="phone"
                type="text"
                errors={errors.phone}
                value={values.phone}
                onChange={handleChange}
              />
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Address"
                name="address"
                type="text"
                errors={errors.address}
                value={values.address}
                onChange={handleChange}
              />
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="City"
                name="city"
                type="text"
                errors={errors.city}
                value={values.city}
                onChange={handleChange}
              />
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Province/State"
                name="region"
                type="text"
                errors={errors.region}
                value={values.region}
                onChange={handleChange}
              />
              <SelectInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Country"
                name="country"
                errors={errors.country}
                value={values.country}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="CA">Canada</option>
                <option value="US">United States</option>
              </SelectInput>
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Postal Code"
                name="postal_code"
                type="text"
                errors={errors.postal_code}
                value={values.postal_code}
                onChange={handleChange}
              />
            </div>
            <div className="px-8 py-4 bg-gray-100 border-t border-gray-200 flex items-center">
              {!organization.deleted_at && (
                <DeleteButton onDelete={destroy}>
                  Delete Organization
                </DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo ml-auto"
              >
                Update Organization
              </LoadingButton>
            </div>
          </form>
        </div>
        <h2 className="mt-12 font-bold text-2xl">Contacts</h2>
        <div className="mt-6 bg-white rounded shadow overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-left font-bold">
                <th className="px-6 pt-5 pb-4">Name</th>
                <th className="px-6 pt-5 pb-4">City</th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {organization.contacts.map(
                ({ id, name, phone, city, deleted_at }) => {
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-100 focus-within:bg-gray-100"
                    >
                      <td className="border-t">
                        <InertiaLink
                          href={route('contacts.edit', id)}
                          className="px-6 py-4 flex items-center focus:text-indigo"
                        >
                          {name}
                          {deleted_at && (
                            <Icon
                              name="trash"
                              className="flex-shrink-0 w-3 h-3 text-gray-400 fill-current ml-2"
                            />
                          )}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('contacts.edit', id)}
                          className="px-6 py-4 flex items-center focus:text-indigo"
                        >
                          {city}
                        </InertiaLink>
                      </td>
                      <td className="border-t">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('contacts.edit', id)}
                          className="px-6 py-4 flex items-center focus:text-indigo"
                        >
                          {phone}
                        </InertiaLink>
                      </td>
                      <td className="border-t w-px">
                        <InertiaLink
                          tabIndex="-1"
                          href={route('contacts.edit', id)}
                          className="px-4 flex items-center"
                        >
                          <Icon
                            name="cheveron-right"
                            className="block w-6 h-6 text-gray-400 fill-current"
                          />
                        </InertiaLink>
                      </td>
                    </tr>
                  );
                }
              )}
              {organization.contacts.length === 0 && (
                <tr>
                  <td className="border-t px-6 py-4" colSpan="4">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
