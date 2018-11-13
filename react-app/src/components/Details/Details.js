import React, { PureComponent } from 'react';
import moment from 'moment';
import Sidebar from 'components/Sidebar';
import Section from 'components/Section';
import ProfileGroup from 'components/ProfileGroup';

import './Details.css';

// const DETAILS = 'DETAILS';
// const STATS = 'STATS';

const details = {
  name: '05-391 Designing Human-Centered Systems',
  owner: 'eliza',
  members: ['eliza', 'arnav', 'sarah', 'warren', 'chris'],
  created: moment('11-08-2018', 'MM-DD-YYYY'),
  createdBy: 'eliza',
  modified: moment('11-09-2018', 'MM-DD-YYYY'),
  modifiedBy: 'sarah'
};

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      name,
      owner, members,
      created, createdBy,
      modified, modifiedBy
    } = details;

    return (
      <Sidebar
        className="details"
        width="360"
        right
      >
        <h2 className="header">{ name }</h2>
        <Section>
          <ProfileGroup
            size="48"
            imageNames={members.map(member => member + '.jpeg')}
            tooltips={members}
          />
        </Section>
        <Section className="info">
          <div className="detail flex-row">
            <span className="key">Owner</span>
            <span>{ owner }</span>
          </div>
          <div className="detail flex-row">
            <span className="key">Created</span>
            <span>{ moment(created).format('MMM Do YYYY') + ' by ' + createdBy }</span>
          </div>
          <div className="detail flex-row">
            <span className="key">Modified</span>
            <span>{ moment(modified).format('MMM Do YYYY') + ' by ' + modifiedBy }</span>
          </div>
        </Section>
        <Section title="Categories">

        </Section>
        <Section title="">

        </Section>
        {/* - details
        - sentiment?
        - keyphrases
        - keywords/tags
        - categories
        - */}
      </Sidebar>
    );
  }


}

export default Details;
