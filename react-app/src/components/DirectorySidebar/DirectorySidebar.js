import React from 'react';
import * as ROUTES from 'consts/routes';
import { AppConsumer } from 'components/App';
import Sidebar from 'components/Sidebar';
import Button from 'components/Button';
import Profile from 'components/Profile';
import CreateMenu from 'components/CreateMenu';

import './DirectorySidebar.css';
import GearIcon from 'icons/gear-gray.svg';

const DirectorySidebar = (props) => {
  return (
    <AppConsumer>
      { (context) => {
          const { user } = context;
          return (
            <Sidebar className="directory-sidebar">
              <div className="logo logo-noter"></div>
              <div className="separator"></div>
              <CreateMenu/>
              { renderLinks(context) }
              { renderFooter(user) }
            </Sidebar>
          );
      } }
    </AppConsumer>
  );
};

const renderLinks = (context) => {
  const { myNotes, sharedNotes, starred, trash } = context.user;
  return (
    <div className="directory-links">
      { myNotes && renderLink(context, myNotes, 'My notes', 'folder') }
      { sharedNotes && renderLink(context, sharedNotes, 'Shared with me', 'profiles') }
      { starred && renderLink(context, starred, 'Starred', 'star') }
      { trash && renderLink(context, trash, 'Trash', 'trash') }
    </div>
  );
};

const renderLink = (context, linkedFolderId, text, icon=null) => {
  const { breadcrumbs } = context;
  const activeFolder = breadcrumbs[0];
  const activeFolderId = activeFolder && activeFolder._id;
  const isActive = activeFolderId === linkedFolderId;

  return (
    <Button
      type="transparent"
      icon={icon + (isActive ? '-purple' : '-gray')}
      className={isActive ? 'active' : null}
      onClick={isActive ? null : () => {
        window.browserHistory.push(ROUTES.FOLDER + '/' + linkedFolderId);
      }}
    >
      { text }
    </Button>
  );
};

const renderFooter = (user) => {
  if (user && Object.keys(user).length) {
    const { firstName, lastName } = user;
    return (
      <div className="footer">
        <div className="separator"></div>
        <div className="profile-info flex-row">
          <Profile
            size="48"
            imageName={`${firstName.toLowerCase()}-${lastName.toLowerCase()}.jpeg`}
          />
          <span className="name">{ firstName + ' ' + lastName }</span>
          <div className="icon icon-24"
            style={{ backgroundImage: `url(${GearIcon})` }}
          ></div>
        </div>
      </div>
    );
  }
  return undefined;
}

export default DirectorySidebar;
