import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import FileInput from '@/Shared/FileInput';
import { toFormData } from '@/utils';

export default () => {
  const { errors } = usePage();
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    owner: '0',
    photo: ''
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleFileChange(file) {
    setValues(values => ({
      ...values,
      photo: file
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    // since we are uploading an image
    // we need to use FormData object
    // for more info check utils.js
    const formData = toFormData(values);

    Inertia.post(route('users.store'), formData).then(() => {
      setSending(false);
    });
  }

  return (
    <Layout>
      <div>
        <Helmet title="Create User" />
        <div>
          <h1 className="mb-8 font-bold text-3xl">
            <InertiaLink
              href={route('users')}
              className="text-indigo-600 hover:text-indigo-700"
            >
              Users
            </InertiaLink>
            <span className="text-indigo-600 font-medium"> /</span> Create
          </h1>
        </div>
        <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
          <form name="createForm" onSubmit={handleSubmit}>
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
                label="Password"
                name="password"
                type="password"
                errors={errors.password}
                value={values.password}
                onChange={handleChange}
              />
              <SelectInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Owner"
                name="owner"
                errors={errors.owner}
                value={values.owner}
                onChange={handleChange}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </SelectInput>
              <FileInput
                className="pr-6 pb-8 w-full lg:w-1/2"
                label="Photo"
                name="photo"
                accept="image/*"
                errors={errors.photo}
                value={values.photo}
                onChange={handleFileChange}
              />
            </div>
            <div className="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo"
              >
                Create User
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
