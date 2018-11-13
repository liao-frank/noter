import React, { Component } from 'react';
import Sidebar from 'components/Sidebar';
import Button from 'components/Button';
import Profile from 'components/Profile';
import { VIEWS, PAGES } from 'consts/pages';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.MY_NOTES
    };
  }

  render() {
    const { page } = this.state;

    return (
      <div className="app flex-row">
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
          <div className="footer">
            <div className="separator"></div>
            <div className="profile-info flex-row">
              <Profile
                size="48"
                imageName="eliza.jpeg"
              />
              <span className="name">Eliza Smith</span>
              <div className="icon icon-24 icon-gear"></div>
            </div>
          </div>
        </Sidebar>
        { VIEWS[page] }
      </div>
    );
  }
}

export default App;
