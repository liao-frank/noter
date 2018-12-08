import React, { Component } from 'react';
import * as ROUTES from 'consts/routes';
import { AppConsumer } from 'components/App';
import Sidebar from 'components/Sidebar';
import Button from 'components/Button';
import Profile from 'components/Profile';
import CreateMenu from 'components/CreateMenu';
import Dropdown from 'components/Dropdown';
import './DirectorySidebar.css';
import GearIcon from 'icons/gear-gray.svg';

class DirectorySidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMenuOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <AppConsumer>
        { (context) => {
            return (
              <Sidebar className="directory-sidebar">
                <div className="logo logo-noter"
                  onClick={() => { window.browserHistory.push('/') }}
                ></div>
                <div className="separator"></div>
                <CreateMenu/>
                { this.renderLinks(context) }
                { this.renderFooter(context) }
              </Sidebar>
            );
        } }
      </AppConsumer>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  // closeUserMenu() {
  //   const { userMenuOpen } = this.state;
  //   if (userMenuOpen) {
  //     this.setState({ userMenuOpen: false });
  //   }
  // }

  handleClick(e) {
    const { userMenuNode } = this;
    if (userMenuNode) {
      if (userMenuNode.contains(e.target)) {
        return;
      }
      else {
        this.setState({ userMenuOpen: false });
      }
    }
  }

  renderLinks(context) {
    const { myNotes, sharedNotes, starred, trash } = context.user;
    return (
      <div className="directory-links">
        { myNotes && this.renderLink(context, myNotes, 'My notes', 'folder') }
        { sharedNotes && this.renderLink(context, sharedNotes, 'Shared with me', 'profiles') }
        { starred && this.renderLink(context, starred, 'Starred', 'star') }
        { trash && this.renderLink(context, trash, 'Trash', 'trash') }
      </div>
    );
  }

  renderLink(context, linkedFolderId, text, icon=null) {
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
  }

  renderFooter({ user, updateUser }) {
    const { userMenuOpen } = this.state;
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
              onClick={() => { this.setState({ userMenuOpen: true }) }}
            >
              <Dropdown
                open={userMenuOpen} bottom="0" right="0"
                getRef={(node) => { this.userMenuNode = node }}
                width="auto"
              >
                <Button
                  type="transparent"
                  icon="logout-gray"
                  onClick={() => {
                    window.localStorage.removeItem('user');
                    updateUser();
                  }}
                >Log out</Button>
              </Dropdown>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default DirectorySidebar;
