import React, { Component } from 'react';
import AppContext from 'contexts/AppContext';
import MainSidebar from 'components/MainSidebar';
import { VIEWS, PAGES } from 'consts/pages';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.MY_NOTES,
    };
  }

  render() {
    const { page, app } = this.state;

    return (
      <AppContext.Provider>
        <div className="app flex-row">
          <MainSidebar/>
          { VIEWS[page] }
        </div>
      </AppContext.Provider>
    );
  }
}

export { AppContext };
export default App;
