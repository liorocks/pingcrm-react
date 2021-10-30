import React from 'react';
import Helmet from 'react-helmet';
import { Link, useForm } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import FlashMessages from '@/Shared/FlashMessages';

const Login = () => {
  const { data, setData, errors, post, processing } = useForm({
    email: 'johndoe@example.com',
    password: 'secret',
    remember: true
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('login.attempt'));
  }

  return (
    <>
      <FlashMessages />
      <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
        <Helmet title="Login" />
        <div className="w-full max-w-md">
          <Logo
            className="block w-full max-w-xs mx-auto text-white fill-current"
            height={50}
          />
          <form
            onSubmit={handleSubmit}
            className="mt-8 overflow-hidden bg-white rounded-lg shadow-xl"
          >
            <div className="px-10 py-12">
              <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
              <div className="w-24 mx-auto mt-6 border-b-2" />
              <TextInput
                className="mt-10"
                label="Email"
                name="email"
                type="email"
                errors={errors.email}
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
              <TextInput
                className="mt-6"
                label="Password"
                name="password"
                type="password"
                errors={errors.password}
                value={data.password}
                onChange={e => setData('password', e.target.value)}
              />
              <label
                className="flex items-center mt-6 select-none"
                htmlFor="remember"
              >
                <input
                  name="remember"
                  id="remember"
                  className="mr-1"
                  type="checkbox"
                  checked={data.remember}
                  onChange={e => setData('remember', e.target.checked)}
                />
                <span className="text-sm">Remember Me</span>
              </label>
            </div>
            <div className="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
              <Link
                className="hover:underline"
                tabIndex="-1"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
              <LoadingButton
                type="submit"
                loading={processing}
                className="btn-indigo"
              >
                Login
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
