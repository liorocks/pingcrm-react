import React from 'react';
import Helmet from 'react-helmet';
import Layout from '@/Shared/Layout';

export default () => {
  return (
    <Layout>
      <Helmet title="Reports" />
      <div>
        <h1 className="mb-8 font-bold text-3xl">Reports</h1>
      </div>
    </Layout>
  );
};
