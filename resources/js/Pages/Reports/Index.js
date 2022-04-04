import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
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
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />

      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Title</th>
              <th className="px-6 pt-5 pb-4">Description</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, title, description, date }) => {
              return (
                <tr
                  key={id}
                  className="hover:bg-gray-100 focus-within:bg-gray-100"
                >
                  <td className="border-t p-4">
                    {title}
                  </td>
                  <td className="border-t p-4">
                    {description}
                  </td>
                  <td className="border-t p-4">
                    {date}
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
