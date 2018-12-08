import React, { PureComponent } from 'react';
import ReactQuill from 'react-quill';
// import io from 'socket.io-client';
// import { API_URL } from 'consts/api';

import './quill.snow.css';
import './Editor.css';

class Editor extends PureComponent {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     content: ''
  //   };
  //   this.receiving = false;
  //   this.socket = undefined;
  //   this.onChange = this.onChange.bind(this);
  //   this.receiveChange = this.receiveChange.bind(this);
  // }

  render() {
    const { note, onChange } = this.props;

    return (
      <div className="editor">
        <ReactQuill
          value={note.content}
          onChange={onChange}
          className="ql-noter flex-col"
          modules={{ clipboard: { matchVisual: false } }}
        />
      </div>
    );
  }

  // emitChange() {
  //   const { socket } = this;
  //   if (socket && socket.connected) {
  //     socket.emit('onChange', this.state);
  //   }
  // }
  //
  // componentDidMount() {
  //   this.socket = io.connect(API_URL + 'note');
  //
  //   this.socket.on('connect', () => {
  //     this.socket.emit('collaborate', {});
  //   });
  //
  //   this.socket.on('onChange', this.receiveChange);
  // }
  //
  // componentWillUnmount() {
  //   const { socket } = this;
  //
  //   if (socket && socket.connected) {
  //     socket.disconnect();
  //   }
  // }
  //
  // componentDidUpdate() {
  //   this.receiving = false;
  // }
  //
  // onChange(content, delta, source, editor) {
  //   if (!this.receiving) {
  //     this.setState({ content }, this.emitChange);
  //   }
  // }
  //
  // receiveChange(data) {
  //   this.receiving = true;
  //   this.socket.emit('receiveChange', data);
  //   this.setState({ content: data.content });
  // }
}

export default Editor;
