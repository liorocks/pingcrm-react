import React from 'react';
import Helmet from 'react-helmet';
// import { usePage } from '@inertiajs/inertia-react';

export default ({ status }) => {
  // const { status } = usePage();

  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden'
  }[status];

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.'
  }[status];

  return (
    <div className="p-5 bg-indigo-800 text-indigo-100 min-h-screen flex justify-center items-center">
      <Helmet title={title} />
      <div className="w-full max-w-md">
        <h1 className="text-3xl">{title}</h1>
        <p className="mt-3 text-lg leading-tight">{description}</p>
      </div>
    </div>
  );
};
