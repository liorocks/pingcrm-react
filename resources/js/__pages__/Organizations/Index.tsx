import { Link, usePage } from '@inertiajs/react';
import Layout from '@/components/Layout';
import SearchFilter from '@/components/SearchFilter';
import Pagination from '@/components/Pagination';
import { Organization, PaginatedData } from '@/types';
import Table from '@/components/Table/Table';
import { Trash2 } from 'lucide-react';

function Index() {
  const { organizations } = usePage<{
    organizations: PaginatedData<Organization>;
  }>().props;

  const {
    data,
    meta: { links }
  } = organizations;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Organizations</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('organizations.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Organization</span>
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
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            )
          },
          { label: 'City', name: 'city' },
          { label: 'Phone', name: 'phone', colSpan: 2 }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('organizations.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page: React.ReactNode) => (
  <Layout title="Organizations" children={page} />
);

export default Index;
