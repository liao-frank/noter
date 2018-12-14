import React from 'react';

import './EditorToolbar.css';
import BlackMicIcon from 'icons/mic-black.svg';
import PurpleMicIcon from 'icons/mic-purple.svg';
import PurpleSoundIcon from 'icons/sound-purple.svg';

const EditorToolbar = (props) => {
  const { id } = props;
  return (
    <div id={id} className="editor-toolbar">
      <span className="ql-formats">
        <select className="ql-header"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-link"></button>
        <button className="ql-image"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color">
          <option></option>
          <option value="#636C73"></option>
          <option value="#7F818A"></option>
          <option value="#ED5565"></option>
          <option value="#FC6E51"></option>
          <option value="#FFCE54"></option>
          <option value="#A0D468"></option>
          <option value="#48CFAD"></option>
          <option value="#4FC1E9"></option>
        </select>
        <select className="ql-background">
          <option></option>
          <option value="#DCDEE6"></option>
          <option value="#7F818A"></option>
          <option value="#f3909a"></option>
          <option value="#fda08d"></option>
          <option value="#ffdf8f"></option>
          <option value="#c1e39c"></option>
          <option value="#88dfc9"></option>
          <option value="#8cd6f0"></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-clean"></button>
      </span>
      { renderMic(props) }
    </div>
  );
};

const renderMic = (props) => {
  const { listening, interimTranscript } = props.transcription;
  const { sentencize } = props;
  const iconStyle = {
    backgroundImage: `url(${listening ? PurpleMicIcon : BlackMicIcon})`
  };

  let preview = sentencize(interimTranscript);
  preview || (preview = '...');

  return (
    <span className="ql-formats" style={{ position: 'absolute' }}>
      <button className="ql-mic">
        <div className="icon icon-18 icon-mic" style={iconStyle}></div>
      </button>
      { listening &&
        <div className="icon-sound-container-container">
          <div className="icon-sound-container">
            <div className="icon icon-18 icon-sound"
              style={{ backgroundImage: `url(${PurpleSoundIcon})`}}
              ></div>
          </div>
        </div>
      }
      { listening &&
        <div className="transcript-preview"><span>
          {`"${preview}"`}
        </span></div>
      }
    </span>
  );
};

export default EditorToolbar;
