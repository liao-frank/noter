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

import './Directory.css';

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
    const { notes } = context.folder;

    if (!notes || !notes.length) {
      return null;
    }
    return (
      <Section title="Notes">

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
      if (typeof folder !== 'object') {
        return null;
      }

      const isSelected = showingSelected && selected && folder._id === selected.item._id;
      const icon = isSelected ? 'icon-folder-purple' : 'icon-folder';
      return (
        <Card
          key={folder._id}
          onClick={() => { updateSelected('folder', folder) }}
          onDoubleClick={() => { updateFolder(folder._id) }}
          className={isSelected ? 'selected' : null}
        >
          <div className="flex-row">
            <div className={'icon icon-24 ' + icon}></div>
            <div className="name">{ folder.name }</div>
          </div>
        </Card>
      );
    });

    return (
      <Section title="Folders">
        <div className="flex-row">
          { cards }
        </div>
      </Section>
    );
  }

  renderDetails(context) {
    const { showingSelected, selected } = context;
    return selected ? <DetailSidebar showing={showingSelected}/> : null;
  }
}

export default Directory;
