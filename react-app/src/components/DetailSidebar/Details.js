import React, { PureComponent } from 'react';
import CATEGORIES from 'consts/categories';
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
    const { sections, style, width, onClose } = this.props;

    return (
      <AppConsumer>
        { (context) => {
          const { selected } = context;
          const { name, members } = selected.item;
          const memberNames = members.map(m => this.getName(m));

          return <Sidebar
            className="details"
            hidden={showing ? false : true}
            width={width || '360'} right
            style={{ ...(style || {}), overflow: 'visible' }}
          >
            <div className="flex-row topper">
              <h2 className="header">{
                (!sections || sections.name !== false) ?
                name : <span>&nbsp;</span>
              }</h2>
              <div className="icon icon-24 icon-close"
                style={{ backgroundImage: `url(${XIcon})` }}
                onClick={onClose}
              ></div>
            </div>
            { (!sections || sections.members !== false) &&
              <Section>
                <ProfileGroup
                  size="48" tooltips={memberNames}
                  imageNames={memberNames.map(name => kebabCase(name) + '.jpeg')}
                />
              </Section>
            }
            { selected.type === 'note' &&
              <Section className="categories-section">
                { this.renderCategories(context) }
              </Section>
            }
            { selected.type === 'note' &&
              <Section className="tags-section">
                { this.renderTags(context) }
              </Section>
            }
            { selected.type === 'note' &&
              <Section className="keywords-section">
                { this.renderKeywords(context) }
              </Section>
            }
            <div className="separator"></div>
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
      <Section className="metadata">
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

  renderCategories(context) {
    const { selected } = context;
    const { item } = selected;

    return (
      <div className="detail">
        <div className="key">Categories</div>
        <div className="categories">
          { Object.keys(CATEGORIES).map(category => (
              <div
                key={category}
                className={'category' +
                  (item.categories.includes(category) ? ' active' : '')}
                style={{ backgroundColor: CATEGORIES[category] }}
                onClick={() => {
                  window.emit('note#updateOne_', {
                    query: { _id: item._id },
                    doc: {
                      [item.categories.includes(category) ?
                        '$pull' :
                        '$addToSet']: { categories: category }
                    },
                    options: { new: true }
                  }, undefined, 0);
                }}
              ></div>
            )) }
        </div>
      </div>
    );
  }

  renderTags(context) {
    return (
      <div className="detail">
        <div className="key">Tags</div>
        <div className="tags">
          <div className="tag">personal</div>
          <div className="tag">school</div>
        </div>
      </div>
    );
  }

  renderKeywords(context) {
    return (
      <div className="detail">
        <div className="key">Keywords</div>
        <div className="keywords">
          <div className="tag">dog</div>
          <div className="tag">thing</div>
          <div className="tag">yes</div>
          <div className="tag">notes</div>
          <div className="tag">friend</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showing: true });
    });
  }

  componentDidUpdate() {
    if (this.props.showing) {
      this.setState({ showing: true });
    }
    else {
      this.setState({ showing: false });
    }
  }

  getName(user) {
    return `${user.firstName} ${user.lastName}`;
  }
}

export default Details;
