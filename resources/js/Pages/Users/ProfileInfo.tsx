import MainLayout from '@/Layouts/MainLayout';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function ProfileInfo() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">ProfileInfo</h1>
      <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
        <Tab eventKey="home" title="Home">
          Tab content for Home
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
    </Tabs>
    </div>
  );
}

ProfileInfo.layout = (page: React.ReactNode) => (
  <MainLayout title="Reports" children={page} />
);

export default ProfileInfo;
