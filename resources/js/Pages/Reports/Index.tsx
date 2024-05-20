import Layout from '@/Shared/Layout';

function ReportsPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Reports</h1>
    </div>
  );
}

ReportsPage.layout = page => <Layout title="Reports" children={page} />;

export default ReportsPage;
