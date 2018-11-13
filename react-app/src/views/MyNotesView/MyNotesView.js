import React, { Component } from 'react';
import Card from 'components/Card';
import Section from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import Topbar from 'components/Topbar';
import Details from 'components/Details';
import Search from 'components/Search';

import './MyNotesView.css';

class MyNotesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [
        '05-391 Designing Human-Centered Systems',
        '05-392 Interaction Design Studio',
        '67-475',
        '67-442'
      ],
      notes: [],
    };
  }

  render() {

    return (
      <div className="my-notes-view flex-row">
        <div className="flex-col">
          <div
            className="flex-row"
            style={{
              flex: 0, flexBasis: '63px',
              borderBottom: 'var(--small-border)',
            }}
          >
            <Search/>
          </div>
          <Topbar>
            <Breadcrumbs items={['My notes', 'School']}/>
          </Topbar>
          <div className="flex-row">
            <Section>
              { this.renderFolders() }
              { this.renderNotes() }
            </Section>
            <Details/>
          </div>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <Section title="Notes">

      </Section>
    );
  }

  renderFolders() {
    const { folders } = this.state;
    const cards = folders.map((folder) => {
      return (
        <Card
          key={folder}
          onClick={() => {}}
        >
          <div className="flex-row">
            <div className="icon icon-24 icon-folder"></div>
            <div className="name">{ folder }</div>
          </div>
        </Card>
      );
    });
    return (
      <Section title="Folders">
        { cards }
      </Section>
    );
  }
}

export default MyNotesView;
