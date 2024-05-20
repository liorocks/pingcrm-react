import { Link, usePage } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';
import { Organization } from '@/types';
import Table from '@/Shared/Table/Table';

function Index() {
  const { organizations } = usePage<{
    organizations: { data: Organization[]; meta: { links: any } };
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
          { label: 'Name', name: 'name' },
          { label: 'City', name: 'city' },
          { label: 'Phone', name: 'phone', colSpan: 2 }
        ]}
        rows={data}
        onRowClickUrl={row => route('organizations.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

Index.layout = page => <Layout title="Organizations" children={page} />;

export default Index;
