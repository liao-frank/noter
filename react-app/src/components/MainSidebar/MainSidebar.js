import React from 'react';
import AppContext from 'contexts/AppContext';
import Sidebar from 'components/Sidebar';
import Button from 'components/Button';
import Profile from 'components/Profile';

import './MainSidebar.css';

const MainSidebar = (props) => {
  return (
    <Sidebar>
      <div className="logo logo-noter"></div>
      <div className="separator"></div>
      <div className="links">
        <Button
          type="transparent"
        >Home</Button>
        <Button
          type="transparent"
        >My notes</Button>
        <Button
          type="transparent"
        >Shared with me</Button>
        <Button
          type="transparent"
        >Starred</Button>
        <Button
          type="transparent"
        >Trash</Button>
      </div>
      <AppContext.Consumer>
        {
          (context) => {
            const { user } = context;
            return renderFooter(user);
          }
        }
      </AppContext.Consumer>
    </Sidebar>
  );
};

const renderFooter = (user) => {
  if (user && Object.keys(user).length) {
    return (
      <div className="footer">
        <div className="separator"></div>
        <div className="profile-info flex-row">
          <Profile
            size="48"
            imageName="eliza.jpeg"
          />
          <span className="name">{ user.firstName + ' ' + user.lastName }</span>
          <div className="icon icon-24 icon-gear"></div>
        </div>
      </div>
    );
  }
  return undefined;
}

export default MainSidebar;
