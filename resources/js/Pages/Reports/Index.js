import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';

const Index = () => {
  const { reports } = usePage().props;
  const {
    data,
    meta: { links }
  } = reports;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Reports</h1>
      <div className="flex items-center justify-end mb-6">
        <InertiaLink className="btn-indigo focus:outline-none" href="#">
          <span>Create</span>
          <span className="hidden md:inline"> Report</span>
        </InertiaLink>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4" width="100px">
                Title
              </th>
              <th className="px-6 pt-5 pb-4">Description</th>
              <th className="px-6 pt-5 pb-4">Created at</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, title, description, created_at }) => {
              return (
                <tr
                  key={id}
                  className="hover:bg-gray-100 focus-within:bg-gray-100"
                >
                  <td className="border-t overflow-ellipsis">
                    <InertiaLink
                      href="#"
                      className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                    >
                      {/* {title.length > 30
                        ? title.substring(0, 30) + '...'
                        : title} */}
                      {title}
                    </InertiaLink>
                  </td>
                  <td className="border-t truncate w-1/2">
                    <InertiaLink
                      tabIndex="-1"
                      href="#"
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {description}
                    </InertiaLink>
                  </td>
                  <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href="#"
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {created_at}
                    </InertiaLink>
                  </td>
                  <td className="w-px border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href="#"
                      className="flex items-center px-4 focus:outline-none"
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </InertiaLink>
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />
    </div>
  );
};
Index.layout = page => <Layout title="Reports" children={page} />;

export default Index;
