import MainLayout from '@/Layouts/MainLayout';

function ReportsPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Reports</h1>
      <p className="mb-12 leading-normal">Not implemented</p>
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
ReportsPage.layout = (page: React.ReactNode) => (
  <MainLayout title="Reports" children={page} />
);

export default ReportsPage;
