import React, { Component } from 'react';
import { kebabCase } from 'lodash';
import { NOTE as NOTE_ROUTE } from 'consts/routes';
import { AppConsumer } from 'components/App';
import Topbar from 'components/Topbar';
import Button from 'components/Button';
import ProfileGroup from 'components/ProfileGroup';
import Editor from 'components/Editor';

import './Workspace.css';
import GearIcon from 'icons/gear-gray.svg';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.socket = undefined;
    this.receiveNoteUpdate = this.receiveNoteUpdate.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
  }

  render() {
    return (
      <AppConsumer>
        { (context) => {
          this.selected = context.selected;
          this.updateSelected = context.updateSelected;

          if (!context.selected) {
            return null;
          }

          return (
            <div className="workspace flex-col">
              { this.renderTopbar(context) }
              { this.renderEditor(context) }
            </div>
          );
        } }
      </AppConsumer>
    );
  }

  renderEditor({ selected }) {
    const note = selected.item;
    return (
      <div className="space flex-row">
        <Editor note={note} onChange={this.onNoteChange}/>
      </div>
    );
  }

  renderTopbar({ selected }) {
    const note = selected.item;
    const { members } = note;
    const memberNames = members.map(m => this.getName(m));

    return (
      <Topbar>
        <div className="container flex-row">
          <div className="left flex-row">
            <div className="icon icon-32 icon-noter"
              onClick={() => { window.open('/') }}></div>
            <div className="separator-vertical"></div>
          </div>
          <div className="center flex-row">
            <h3 className="title">{ note && note.name }</h3>
          </div>
          <div className="right flex-row">
            <ProfileGroup
              size="48"
              imageNames={memberNames.map(name => kebabCase(name) + '.jpeg')}
              tooltips={memberNames}
            />
            <div className="separator-vertical"></div>
            <Button
              type="purple" align="center" uppercase
              onClick={this.open}
            >Submit</Button>
            <div className="icon icon-24"
              style={{ backgroundImage: `url(${GearIcon})` }}
            ></div>
          </div>
        </div>
      </Topbar>
    );
  }

  componentDidMount() {
    const { pathname } = window.location;
    if (pathname.startsWith(NOTE_ROUTE)) {
      const noteId = pathname.split('/')[2];
      window
        .emit('note#findOne', { id: noteId } )
        .then(this.receiveNoteUpdate);
    }

    this.socket = window.listen('note#updateOne_', this.receiveNoteUpdate);
  }

  componentWillUnmount() {
    const { socket } = this;
    if (socket && socket.connected) {
      socket.disconnect();
    }
  }

  receiveNoteUpdate(data) {
    let { doc, raw } = data;
    doc = raw || doc;
    document.title = doc.name;
    this.updateSelected('note', doc, true);
  }

  onNoteChange(content, delta, source, editor) {
    const { socket } = this;
    if (!this.selected) {
      console.log('no note selected');
    }

    const { item: note } = this.selected;
    if (socket && socket.connected && source === 'user') {
      const query = { _id: note._id };
      const doc = { content };
      const options = { new: true };
      window.emit('note#updateOne_', { query, doc, options }, socket);
    }
  }

  // updateNote(id) {
  //   const query = { _id: id };
  //   if (!id) {
  //     query._id = this.state.note._id;
  //   }
  //   window.emit('note#findOne', { query })
  //     .then((result) => {
  //       const note = result.doc;
  //       this.setState({ note });
  //     });
  // }

  getName(user) {
    return `${user.firstName} ${user.lastName}`;
  }
}

export default Workspace;
