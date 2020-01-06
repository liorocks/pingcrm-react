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

export default () => {
  const { contact, organizations, errors } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    first_name: contact.first_name || '',
    last_name: contact.last_name || '',
    organization_id: contact.organization_id || '',
    email: contact.email || '',
    phone: contact.phone || '',
    address: contact.address || '',
    city: contact.city || '',
    region: contact.region || '',
    country: contact.country || '',
    postal_code: contact.postal_code || ''
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
    Inertia.put(route('contacts.update', contact.id), values).then(() =>
      setSending(false)
    );
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this contact?')) {
      Inertia.delete(route('contacts.destroy', contact.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this contact?')) {
      Inertia.put(route('contacts.restore', contact.id));
    }
  }

  return (
    <Layout>
      <div>
        <Helmet title={`${values.first_name} ${values.last_name}`} />
        <h1 className="mb-8 font-bold text-3xl">
          <InertiaLink
            href={route('contacts')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Contacts
          </InertiaLink>
          <span className="text-indigo-600 font-medium mx-2">/</span>
          {values.first_name} {values.last_name}
        </h1>
        {contact.deleted_at && (
          <TrashedMessage onRestore={restore}>
            This contact has been deleted.
          </TrashedMessage>
        )}
        <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="p-8 -mr-6 -mb-8 flex flex-wrap">
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="First Name"
                name="first_name"
                errors={errors.first_name}
                value={values.first_name}
                onChange={handleChange}
              />
              <TextInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Last Name"
                name="last_name"
                errors={errors.last_name}
                value={values.last_name}
                onChange={handleChange}
              />
              <SelectInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Organization"
                name="organization_id"
                errors={errors.organization_id}
                value={values.organization_id}
                onChange={handleChange}
              >
                <option value=""></option>
                {organizations.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
                <option value="CA">Canada</option>
                <option value="US">United States</option>
              </SelectInput>
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
              {!contact.deleted_at && (
                <DeleteButton onDelete={destroy}>Delete Contact</DeleteButton>
              )}
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo ml-auto"
              >
                Update Contact
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
