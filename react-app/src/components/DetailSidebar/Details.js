import React, { PureComponent } from 'react';
import moment from 'moment';
import { kebabCase } from 'lodash';
import { AppConsumer } from 'components/App';
import Sidebar from 'components/Sidebar';
import Section from 'components/Section';
import ProfileGroup from 'components/ProfileGroup';

import './Details.css';
import XIcon from 'icons/x-gray.svg';

/*
- details
- sentiment?
- keyphrases
- keywords/tags
- categories
-
*/

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
  }

  render() {
    const { showing } = this.state;

    return (
      <AppConsumer>
        { (context) => {
          const { updateSelected } = context;
          const { name, members } = context.selected.item;
          const memberNames = members.map(m => this.getName(m));

          return <Sidebar
            className="details"
            hidden={showing ? false : true}
            width="360" right
            style={{ overflow: 'visible' }}
          >
            <div className="flex-row topper">
              <h2 className="header">{ name }</h2>
              <div className="icon icon-24 icon-close"
                style={{ backgroundImage: `url(${XIcon})` }}
                onClick={() => { updateSelected() }}
              ></div>
            </div>
            <Section>
              <ProfileGroup
                size="48"
                imageNames={memberNames.map(name => kebabCase(name) + '.jpeg')}
                tooltips={memberNames}
              />
            </Section>
            { this.renderMetadata(context) }
          </Sidebar>
        } }
      </AppConsumer>
    );
  }

  renderMetadata(context) {
    const {
      owner,
      created, createdBy,
      modified, modifiedBy,
    } = context.selected.item;

    return (
      <Section className="info">
        <div className="detail flex-row">
          <span className="key">Owner</span>
          <span className="value">{ this.getName(owner) }</span>
        </div>
        <div className="detail flex-row">
          <span className="key">Created</span>
          <span className="value">
            { moment(created).format('MMM Do YYYY') + ' by ' + this.getName(createdBy) }
          </span>
        </div>
        <div className="detail flex-row">
          <span className="key">Modified</span>
          <span className="value">
            { moment(modified).format('MMM Do YYYY') + ' by ' + this.getName(modifiedBy) }
          </span>
        </div>
      </Section>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showing: true });
    });
  }

  componentDidUpdate() {
    if (!this.props.showing) {
      this.setState({ showing: false });
    }
  }

  getName(user) {
    return `${user.firstName} ${user.lastName}`;
  }
}

export default Details;
