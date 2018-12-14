import React, { Component } from 'react';
import { kebabCase } from 'lodash';
import SpeechRecognition from 'react-speech-recognition';
import { NOTE as NOTE_ROUTE } from 'consts/routes';
import { AppConsumer } from 'components/App';
import Topbar from 'components/Topbar';
import Button from 'components/Button';
import ProfileGroup from 'components/ProfileGroup';
import Editor from 'components/Editor';
import DetailSidebar from 'components/DetailSidebar';
import EditorToolbar from 'components/EditorToolbar';
import Dropdown from 'components/Dropdown';

import './Workspace.css';
import GearIcon from 'icons/gear-gray.svg';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingDetails: false,
      showingSettings: false,
    };

    this.socket = undefined;
    this.handleNoteEdit = this.handleNoteEdit.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const {
      browserSupportsSpeechRecognition, listening,
      transcription, interimTranscript, finalTranscription,
      startListening, stopListening
    } = this.props;
    const { showingDetails } = this.state;

    const transcriptionObj = {
      browserSupportsSpeechRecognition, listening,
      transcription, interimTranscript, finalTranscription,
      startListening, stopListening
    };

    return (
      <AppConsumer>
        { (context) => {
          this.selected = context.selected;
          this.updateSelected = context.updateSelected;
          this.user = context.user;

          if (!context.selected) {
            return null;
          }

          return (
            <div className="workspace flex-col">
              { this.renderTopbar(context) }
              <Topbar className="toolbar-bar">
                <div className="flex-row container">
                  <EditorToolbar id="toolbar" transcription={transcriptionObj}
                    sentencize={this.sentencize}/>
                </div>
              </Topbar>
              <div className="flex-row">
                { this.renderEditor(context, transcriptionObj) }
                <DetailSidebar
                  width="275px"
                  showing={showingDetails}
                  onClose={() => { this.setState({ showingDetails: false }) }}
                  sections={{ name: false, members: false }}/>
              </div>
            </div>
          );
        } }
      </AppConsumer>
    );
  }

  renderEditor({ selected }, transcription) {
    const note = selected.item;
    return (
      <div className="space flex-row">
        <Editor note={note} transcription={transcription}
          onChange={this.onNoteChange} sentencize={this.sentencize}/>
      </div>
    );
  }

  renderTopbar({ selected, updateUser }) {
    const { showingSettings } = this.state;
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
              onClick={(e) => { e.target === this.gear && this.setState({ showingSettings: true }) }}
              ref={node => ( this.gear = node )}
            >
              <Dropdown
                open={showingSettings}
                getRef={(node) => { this.settingsNode = node }}
                width="auto"
              >
                <Button
                  type="transparent" icon="i-gray"
                  onClick={() => { this.setState({ showingSettings: false, showingDetails: true }) }}
                >View details</Button>
                <Button
                  type="transparent" icon="logout-gray"
                  onClick={() => {
                    window.localStorage.removeItem('user');
                    updateUser();
                  }}
                >Log out</Button>
              </Dropdown>
            </div>
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
        .emit('note#findOne', { id: noteId })
        .then(this.handleNoteEdit);
    }

    this.socket = window.listen('note#editOne_', this.handleNoteEdit);
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    const { socket } = this;
    if (socket && socket.connected) {
      socket.disconnect();
    }
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    const { settingsNode } = this;
    if (settingsNode) {
      if (settingsNode.contains(e.target)) {
        return;
      }
      else {
        this.setState({ showingSettings: false });
      }
    }
  }

  handleNoteEdit(data) {
    let { doc, raw } = data;
    doc = raw || doc;

    if (this.selected) {
      const { item: note } = this.selected;
      if (doc._id !== note._id) {
        return;
      }
    }

    document.title = doc.name;
    this.updateSelected('note', doc, true);
  }

  onNoteChange(content, delta, source, editor) {
    const { socket } = this;
    if (!this.selected) {
      console.log('no note selected');
      return;
    }

    const { item: note } = this.selected;
    this.updateSelected('note', { ...note, content }, true, false, false);

    if (socket && socket.connected && source === 'user') {
      const query = { _id: note._id };
      const options = { new: true };

      window.emit('note#editOne_', { query, doc: {
        content,
        modified: new Date(), modifiedBy: this.user._id,
      }, options }, socket);
    }
  }

  getName(user) {
    return `${user.firstName} ${user.lastName}`;
  }

  sentencize(str) {
    if (!str) {
      return '';
    }
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}.`
  }
}

export default SpeechRecognition({ autoStart: false })(Workspace);
