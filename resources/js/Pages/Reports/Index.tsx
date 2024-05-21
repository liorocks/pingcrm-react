import Layout from '@/Shared/Layout';

function ReportsPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Reports</h1>
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
ReportsPage.layout = (page: React.ReactNode) => (
  <Layout title="Reports" children={page} />
);

export default ReportsPage;
