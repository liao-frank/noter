import React, { Component } from 'react';
import { keyBy } from 'lodash';
import { AppConsumer } from 'components/App';
import DirectorySidebar from 'components/DirectorySidebar';
import Card from 'components/Card';
import Section from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import Topbar from 'components/Topbar';
import DetailSidebar from 'components/DetailSidebar';
import Search from 'components/Search';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';

import './Directory.css';
import GrayFolderIcon from 'icons/folder-gray.svg';
import PurpleFolderIcon from 'icons/folder-purple.svg';
import GrayNoteIcon from 'icons/note-gray.svg';
import PurpleNoteIcon from 'icons/note-purple.svg';

class Directory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {},
    };
  }

  render() {

    return (
      <div className="flex-row">
        <DirectorySidebar/>
        <AppConsumer>
          { (context) => {
            return (
              <div className="directory flex-col">
                <Topbar>
                  <Search/>
                </Topbar>
                <Topbar>
                  <Breadcrumbs
                    items={context.breadcrumbs}
                    keyer={folder => folder._id}
                    renderer={folder => folder.name}
                    onClick={(item) => {
                      const map = keyBy(context.breadcrumbs, 'name');
                      if (item.name in map) {
                        context.updateFolder(map[item.name]['_id']);
                      }
                    }}
                  />
                </Topbar>
                <div className="flex-row">
                  { this.renderDirectory(context) }
                  { this.renderDetails(context) }
                </div>
              </div>
            );
          } }
        </AppConsumer>
      </div>
    );
  }

  renderDirectory(context) {
    const folders = this.renderFolders(context);
    const notes = this.renderNotes(context);

    if (!folders && !notes) {
      return (
        <div className="empty-directory">
          <div className="message">
            <div className="text">
              <h1 className="header">Nothing but possibilities.</h1>
              <h3 className="title">Try using the "New" button.</h3>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Section>
        { folders }
        { notes }
      </Section>
    );
  }

  renderNotes(context) {
    const {
      folder, updateFolder,
      showingSelected, selected, updateSelected
    } = context;
    const { notes } = folder;

    if (!notes || !notes.length) return null;

    const cards = notes.map((note) => {
      if (!note) return null;
      const isSelected = showingSelected && selected && note._id === selected.item._id;
      const icon = isSelected ? PurpleNoteIcon : GrayNoteIcon;

      return (
        <Card
          key={note._id}
          onClick={() => { updateSelected('note', note, true) }}
          onDoubleClick={() => { console.log(note._id) }}
          onRightClick={() => { updateSelected('note', note, true, true) }}
          className={isSelected ? 'selected' : null}
          dropdown={
            <Dropdown buttonType="transparent" buttonSize="small">
              <Button icon="trash-gray"
                onClick={() => {
                  window
                    .emit('note#deleteOne', { query: { _id: note._id } })
                    .then(() => { updateFolder() });
                }}
              >Delete</Button>
            </Dropdown>
          }
        >
          <div className="flex-row">
            <div className="icon icon-24"
              style={{ backgroundImage: `url(${icon})` }}
            ></div>
            <div className="name">{ note.name }</div>
          </div>
        </Card>
      );
    });

    return (
      <Section title="Notes">
        <div className="flex-row">{ cards }</div>
      </Section>
    );
  }

  renderFolders(context) {
    const {
      folder, updateFolder,
      showingSelected, selected, updateSelected
    } = context;
    const { folders } = folder;

    if (!folders || !folders.length) {
      return null;
    }

    const cards = folders.map((folder) => {
      const isSelected = showingSelected && selected && folder._id === selected.item._id;
      const icon = isSelected ? PurpleFolderIcon : GrayFolderIcon;
      return (
        <Card
          key={folder._id}
          onClick={() => { updateSelected('folder', folder, true) }}
          onDoubleClick={() => { updateFolder(folder._id) }}
          onRightClick={() => { updateSelected('folder', folder, true, true) }}
          className={isSelected ? 'selected' : null}
          dropdown={
            <Dropdown buttonType="transparent" buttonSize="small">
              <Button icon="trash-gray"
                onClick={() => {
                  window
                    .emit('folder#deleteOne', { query: { _id: folder._id } })
                    .then((result) => { updateFolder() });
                }}
              >Delete</Button>
            </Dropdown>
          }
        >
          <div className="flex-row">
            <div className="icon icon-24"
              style={{ backgroundImage: `url(${icon})` }}
            ></div>
            <div className="name">{ folder.name }</div>
          </div>
        </Card>
      );
    });

    return (
      <Section title="Folders">
        <div className="flex-row">{ cards }</div>
      </Section>
    );
  }

  renderDropdown(type, context) {
    return (
      <Dropdown top="100%" left="0">

      </Dropdown>
    );
  }

  renderDetails(context) {
    const { showingSelected, selected } = context;
    return selected ? <DetailSidebar showing={showingSelected}/> : null;
  }
}

export default Directory;
