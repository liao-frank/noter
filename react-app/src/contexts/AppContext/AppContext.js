import React, { Component } from 'react';

import './AppContext.css';

const AppContext = React.createContext({
  user: {},
  folder: {}
});

class AppContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      folder: {},
      updateUser: this.updateUser.bind(this),
      updateFolder: this.updateFolder.bind(this),
    };

    this.updateUser('5beb889f7c125c55326172a6');
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider value={this.state}>
        { children }
      </AppContext.Provider>
    );
  }

  updateUser(id) {
    window.emit('user#findOne', { _id: id })
      .then((result) => {
        this.setState({ user: result.doc });
      });
  }

  updateFolder(id) {

  }
}

export default {
  Provider: AppContextProvider,
  Consumer: AppContext.Consumer,
};
