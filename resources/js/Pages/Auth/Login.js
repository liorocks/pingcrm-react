import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';

export default () => {
  const { errors } = usePage();
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState({
    email: 'johndoe@example.com',
    password: 'secret',
    remember: true
  });

  function handleChange(e) {
    const key = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    Inertia.post(route('login.attempt'), values).then(() => {
      setSending(false);
    });
  }

  return (
    <div className="p-6 bg-indigo-900 min-h-screen flex justify-center items-center">
      <Helmet title="Login" />
      <div className="w-full max-w-md">
        <Logo
          className="block mx-auto w-full max-w-xs text-white fill-current"
          height={50}
        />
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="px-10 py-12">
            <h1 className="text-center font-bold text-3xl">Welcome Back!</h1>
            <div className="mx-auto mt-6 w-24 border-b-2" />
            <TextInput
              className="mt-10"
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              className="mt-6"
              label="Password"
              name="password"
              type="password"
              errors={errors.password}
              value={values.password}
              onChange={handleChange}
            />
            <label
              className="mt-6 select-none flex items-center"
              htmlFor="remember"
            >
              <input
                name="remember"
                id="remember"
                className="mr-1"
                type="checkbox"
                checked={values.remember}
                onChange={handleChange}
              />
              <span className="text-sm">Remember Me</span>
            </label>
          </div>
          <div className="px-10 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
            <a className="hover:underline" tabIndex="-1" href="#reset-password">
              Forget password?
            </a>
            <LoadingButton
              type="submit"
              loading={sending}
              className="btn-indigo"
            >
              Login
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
