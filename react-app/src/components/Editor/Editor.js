import React, { PureComponent } from 'react';
import ReactQuill from 'react-quill';

import './quill.snow.css';
import './Editor.css';

class Editor extends PureComponent {
  constructor(props) {
    super(props);

    this.quill = undefined;

    this.toggleMic = this.toggleMic.bind(this);
    this.modules = {
      clipboard: { matchVisual: false },
      toolbar: {
        container: "#toolbar",
        handlers: {
          'mic': this.onMicClick(),
        }
      }
    };
  }
  render() {
    const { note, onChange } = this.props;

    return (
      <div className="editor">
        <ReactQuill
          value={note.content}
          onChange={onChange}
          className="ql-noter flex-col"
          modules={this.modules}
        />
      </div>
    );
  }

  onMicClick() {
    const self = this;

    return function() {
      self.quill = this.quill;
      self.toggleMic();
    };
  }

  toggleMic() {
    const { listening, startListening, stopListening } = this.props.transcription;
    if (listening) {
      stopListening();
    }
    else {
      startListening();
    }
  }

  componentDidUpdate(prevProps) {
    const { interimTranscript: prevTranscript } = prevProps.transcription;
    const { interimTranscript: currTranscript } = this.props.transcription;
    const { sentencize } = this.props;

    if (prevTranscript && !currTranscript) {
      if (this.quill) {
        const { onChange } = this.props;

        const cursorPosition = this.quill.getSelection().index;
        const text = ' ' + sentencize(prevTranscript);
        console.log(text);
        this.quill.insertText(cursorPosition, text);
        this.quill.setSelection(cursorPosition + text.length);

        onChange(this.quill.root.innerHTML, null, 'user', null);
      }
      else {
        console.error('no quill editor saved');
      }
    }
  }
}

export default Editor;
