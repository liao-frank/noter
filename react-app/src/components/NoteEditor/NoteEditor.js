import React, { Component } from 'react';
import { NOTE as NOTE_ROUTE } from 'consts/routes';

import './NoteEditor.css';

class NoteEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
      updateNote: this.updateNote.bind(this)
    };
  }

  render() {
    return (
      <div className="note-editor">

      </div>
    );
  }

  componentDidMount() {
    const { pathname } = window.location;
    if (pathname.startsWith(NOTE_ROUTE)) {
      this.updateNote(pathname.split('/')[2]);
    }
  }

  updateNote(id) {
    const query = { _id: id };
    if (!id) {
      query._id = this.state.note._id;
    }
    window.emit('note#findOne', { query })
      .then((result) => {
        const note = result.doc;
        console.log(note);
        this.setState({ note });
      });
  }
}

export default NoteEditor;
