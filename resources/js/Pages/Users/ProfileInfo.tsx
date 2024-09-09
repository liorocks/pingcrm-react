import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Edit from '../Users/Edit';
import ChangePassword from './ChangePassword';


// function ProfileInfo() {
const ProfileInfo = () => {
  


  return (
    <div>
      <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
        
        <Tab eventKey="profile" title="Profile">
          <Edit />
        </Tab>
        
        <Tab eventKey="change-password" title="Change Password">
          <ChangePassword />
        </Tab>
    </Tabs>
    </div>
  );
}

ProfileInfo.layout = (page: React.ReactNode) => (
  <MainLayout title="Reports" children={page} />
);

export default ProfileInfo;
