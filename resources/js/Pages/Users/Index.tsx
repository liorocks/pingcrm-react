import { Link, usePage } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';
import { PaginatedData, User } from '@/types';
import Table from '@/Shared/Table/Table';
import Icon from '@/Shared/Icon';

const Index = () => {
  const { users } = usePage<{ users: PaginatedData<User> }>().props;

  const {
    data,
    meta: { links }
  } = users;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Users</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('users.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> User</span>
        </Link>
      </div>
      <Table
        columns={[
          {
            label: 'Name',
            name: 'name',

            prependCell: row =>
              row.photo && (
                <img src={row.photo} className="w-8 h-8 mr-2 rounded-full" />
              ),

            appendCell: row =>
              row.deleted_at && (
                <Icon
                  name="trash"
                  className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                />
              )
          },
          { label: 'Email', name: 'email' },
          {
            label: 'Role',
            name: 'owner',
            colSpan: 2,
            renderCell: row => (row.owner ? 'Owner' : 'User')
          }
        ]}
        rows={data}
        onRowClickUrl={row => route('users.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page: React.ReactNode) => (
  <Layout title="Users" children={page} />
);

export default Index;
