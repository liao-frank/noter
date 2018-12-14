import React, { Component } from 'react';
import { keyBy } from 'lodash';
import * as ROUTES from 'consts/routes';
import * as ORDERINGS from 'consts/orderings';
import { AppConsumer } from 'components/App';
import DirectorySidebar from 'components/DirectorySidebar';
import Section from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import Topbar from 'components/Topbar';
import DetailSidebar from 'components/DetailSidebar';
import Search from 'components/Search';
import FolderDirectory from 'components/FolderDirectory';
import NoteDirectory from 'components/NoteDirectory';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';

import './Directory.css';

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordering: ORDERINGS.NAME,
      orderingDirection: 'asc',
      orderingCategories: false,
      showingOrderings: false,
    };

    this.handleClick = this.handleClick.bind(this);
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
                        window.browserHistory.push(`${ROUTES.FOLDER}/${map[item.name]['_id']}`);
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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    const { orderingsNode } = this;
    if (orderingsNode) {
      if (orderingsNode.contains(e.target)) {
        return;
      }
      else {
        this.setState({ showingOrderings: false });
      }
    }
  }

  openOrderings() {
    const { showingOrderings } = this.state;

    if (!showingOrderings) {
      this.setState({ showingOrderings: true });
    }
  }

  renderDirectory(context) {
    const { folder } = context;
    const { folders, notes } = folder;
    const { ordering, orderingDirection, orderingCategories } = this.state;

    if (
      Object.keys(folder).length &&
      (!folders || !folders.length) &&
      (!notes || !notes.length)
    ) {
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
      <Section className="space">
        { this.renderOrderings(context) }
        { (folders) &&
          <FolderDirectory context={context}
            ordering={ordering} orderingDirection={orderingDirection}/>
        }
        { (notes) &&
          <NoteDirectory context={context}
            ordering={ordering} orderingDirection={orderingDirection} orderingCategories={orderingCategories}/>
        }
      </Section>
    );
  }

  renderDetails(context) {
    const { showingSelected, selected, updateSelected } = context;
    return selected ? <DetailSidebar showing={showingSelected} onClose={() => { updateSelected() }}/> : null;
  }

  renderOrderings(context) {
    const { ordering, orderingDirection, orderingCategories, showingOrderings } = this.state;

    return (
      <div className="controls-ordering">
        <Button className="button-ordering" type="transparent" width="fit-content"
          onClick={() => { this.openOrderings() }}
        >
          { ordering }
          <Dropdown
            open={showingOrderings} top="100%" right="0" width="auto"
            getRef={(node) => { this.orderingsNode = node }}
          >
            { Object.values(ORDERINGS).filter(option => typeof option === 'string').map(option => (
              <Button
                key={option} type="transparent" size="small"
                icon={ordering === option ? 'checkmark-gray' : 'empty'}
                onClick={() => { this.setState({ ordering: option, showingOrderings: false }) }}
              >{option}</Button>
            )) }
          </Dropdown>
        </Button>
        <Button className="button-ordering-direction" type="transparent" width="fit-content"
          icon={orderingDirection === 'asc' ? 'up-arrow-black' : 'down-arrow-black'}
          onClick={() => {
            this.setState({ orderingDirection: (orderingDirection === 'asc' ? 'desc' : 'asc')})
          } }></Button>
        <Button type="transparent" width="fit-content"
          icon={orderingCategories ? 'rainbow-rainbow' : 'rainbow-black'}
          onClick={() => {
            this.setState({ orderingCategories: !orderingCategories })
          } }></Button>
      </div>
    );
  }
}

export default Directory;
