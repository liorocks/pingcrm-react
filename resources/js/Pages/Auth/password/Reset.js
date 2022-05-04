import React from 'react';
import Helmet from 'react-helmet';
import {useForm} from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import FlashMessages from "@/Shared/FlashMessages";

export default () => {
  const { data, setData, post, processing } = useForm({
    email: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    post(route('password.reset.send_email'));
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
      <Helmet title="Réinitialisation du mot de passe" />
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
            <h1 className="text-3xl font-bold text-center">Réinitialisation du mot de passe</h1>
            <div className="w-24 mt-3"/>
            <FlashMessages />
            <div className="w-24 mx-auto mt-6 border-b-2" />
              <TextInput
                className="mt-10"
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
          </div>
          <div className="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              type="submit"
              loading={processing}
              className="btn-indigo"
            >
              Envoyer une demande de réinitialisation
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
