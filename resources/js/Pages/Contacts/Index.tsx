import { Link, usePage } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import { Contact } from '@/types';
import Table from '@/Shared/Table/Table';

const Index = () => {
  const { contacts } = usePage<{
    contacts: { data: Contact[]; meta: { links: unknown } };
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
          { label: 'Name', name: 'name' },
          { label: 'Organization', name: 'organization.name' },
          { label: 'City', name: 'city' },
          { label: 'Phone', name: 'phone', colSpan: 2 }
        ]}
        rows={data}
        onRowClickUrl={row => route('contacts.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
};

Index.layout = page => <Layout title="Contacts" children={page} />;

export default Index;
