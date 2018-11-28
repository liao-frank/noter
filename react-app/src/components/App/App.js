import React, { Component } from 'react';
import { keyBy } from 'lodash';
import * as orderings from 'consts/orderings';
import { VIEWS, PAGES } from 'consts/pages';
import './App.css';

const AppContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Directory data
      user: {},
      updateUser: this.updateUser.bind(this),
      folder: {},
      breadcrumbs: [],
      updateFolder: this.updateFolder.bind(this),
      ordering: orderings.NAME,
      updateOrdering: this.updateOrdering.bind(this),
      showingSelected: false,
      selected: undefined,
      updateSelected: this.updateSelected.bind(this),
      // Note Editor data
      page: PAGES.DIRECTORY,
      showingModal: false,
      modal: null,
      updateModal: this.updateModal.bind(this),
    };

    this.updateUser('5bf7a64216729b50396b9634');
  }

  render() {
    const {
      page,
      showingModal, modal: ModalComponent,
    } = this.state;

    return (
      <AppContext.Provider value={this.state}>
        <div className="app flex-row">
          { VIEWS[page] }
          { ModalComponent &&
            React.cloneElement(ModalComponent, { showing: showingModal })
          }
        </div>
      </AppContext.Provider>
    );
  }

  updateUser(id) {
    const query = { _id: id };
    window.emit('user#findOne', { query })
      .then((result) => {
        const { user: prevUser } = this.state;
        if (result.doc) {
          this.setState({ user: result.doc }, () => {
            const { user } = this.state;
            if (!prevUser || prevUser._id !== user._id) {
              this.updateFolder(user.myNotes);
            }
          });
        }
        else {
          console.error(`Failed to retrieve user ${id}`);
        }
      });
  }

  updateFolder(id) {
    const query = { _id: id };
    if (!id) {
      query._id = this.state.folder._id;
    }
    window.emit('folder#findOne', { query })
      .then((result) => {
        const folder = result.doc;
        this.updateSubfolders(folder)
          .then(() => {
            this.setState({ folder });
            this.updateBreadcrumbs(folder);
            const { selected } = this.state;
            if (selected && !id) {
              this.updateSelected('folder', folder, true);
            }
          });

      });
  }

  updateSubfolders(folder) {
    const promises = [];
    if (folder.folders.length) {
      const query = {
        _id: { $in: folder.folders }
      };
      promises.push(
        window.emit('folder#find', { query })
          .then((result) => {
            const folderMap = keyBy(result.docs, '_id');
            const folders = folder.folders.map(id => folderMap[id]);
            folder.folders = folders;
          }
        )
      );
    }
    if (folder.notes.length) {
      const query = {
        _id: { $in: folder.notes }
      };
      promises.push(
        window.emit('note#find', { query })
          .then((result) => {
            const noteMap = keyBy(result.docs, '_id');
            const notes = folder.notes.map(id => noteMap[id]);
            folder.notes = notes;
          }
        )
      );
    }

    return Promise.all(promises);
  }

  updateBreadcrumbs(folder) {
    const { user } = this.state;
    const query = { user: user._id, folder: folder._id };

    window.emit('folder#breadcrumbs', query)
      .then((result) => {
        const { breadcrumbs } = result;
        this.setState({ breadcrumbs });
      });
  }

  updateOrdering(ordering) {
    if (ordering in orderings) {
      this.setState({ ordering });
    }
    else {
      console.error(`Invalid ordering specified: ${ordering}`);
    }
  }

  updateSelected(type, item, openOnly=false) {
    const { selected: prevSelected } = this.state;

    const notSpecified = !type && !item;
    const sameSpecified = !notSpecified && prevSelected && item._id === prevSelected.item._id;

    if ((notSpecified || sameSpecified) && !openOnly) {
      this.setState({ showingSelected: false }, () => {
        setTimeout(() => {
          this.setState({ selected: undefined });
        }, 400);
      });
      return;
    }
    const selected = { type, item };
    this.updateSelectedMetadata(selected)
      .then((selected) => {
        this.setState({ selected, showingSelected: true });
      });
  }

  updateSelectedMetadata(selected) {
    const { item } = selected;
    const idSet = new Set();
    idSet
      .add(item.owner)
      .add(item.createdBy)
      .add(item.modifiedBy);
    for (const id of item.members) {
      idSet.add(id);
    }

    const promises = Array.from(idSet).map((_id) => {
      return window.emit(
        'user#findOne',
        { query: { _id } }
      );
    });

    return Promise.all(promises)
      .then((results) => {
        const users = results.map(result => result.doc);
        const userMap = keyBy(users, '_id');

        const newItem = {
          ...selected.item,
          owner: userMap[item.owner],
          createdBy: userMap[item.createdBy],
          modifiedBy: userMap[item.modifiedBy]
        };

        newItem.members = selected.item.members.map(id => userMap[id]);
        return { ...selected, item: newItem };
      });
  }

  updateModal(ModalComponent) {
    if (!ModalComponent) {
      this.setState({ showingModal: false }, () => {
        setTimeout(() => {
          this.setState({ modal: null });
        }, 150);
      });
      return;
    }
    this.setState({
      showingModal: true,
      modal: ModalComponent
    });
  }
}

export default App;
export const AppConsumer = AppContext.Consumer;
