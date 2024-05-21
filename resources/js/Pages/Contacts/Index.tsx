import { Link, usePage } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import { Contact, PaginatedData } from '@/types';
import Table from '@/Shared/Table/Table';
import Icon from '@/Shared/Icon';

const Index = () => {
  const { contacts } = usePage<{
    contacts: PaginatedData<Contact>;
  }>().props;

  const {
    data,
    meta: { links }
  } = contacts;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Contacts</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('contacts.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Contact</span>
        </Link>
      </div>
      <Table
        columns={[
          {
            label: 'Name',
            name: 'name',
            renderCell: row => (
              <>
                {row.name}
                {row.deleted_at && (
                  <Icon
                    name="trash"
                    className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                  />
                )}
              </>
            )
          },
          { label: 'Organization', name: 'organization.name' },
          { label: 'City', name: 'city' },
          { label: 'Phone', name: 'phone', colSpan: 2 }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('contacts.edit', row.id)}
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
  <Layout title="Contacts" children={page} />
);

export default Index;
