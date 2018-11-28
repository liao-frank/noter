import React, { PureComponent } from 'react';

import './TextInput.css';

class TextInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      icon: undefined
    };

    this.inputNode = undefined;

    this.focus = this.focus.bind(this);
  }

  render() {
    const {
      // onChange,
      id,
      className,
      placeholder,
      defaultValue
      // icon,
    } = this.props;

    const classNames = ['text-input'];
    className && classNames.push(className);

    return (
      <div className={classNames.join(' ')}
        onClick={this.focus}
      >
        <input
          id={id || null}
          type="text"
          placeholder={placeholder || null}
          defaultValue={defaultValue || null}
          ref={(node) => { this.inputNode = node }}
        />
      </div>
    );
  }

  focus() {
    if (this.inputNode) {
      this.inputNode.focus();
    }
  }
}

export default TextInput;
