import React, { PureComponent } from 'react';

import './Search.css';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      term: ''
    };
    this.inputNode = undefined;

    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const {
      focus
    } = this.state;

    const searchClassNames = ['search'];
    focus && searchClassNames.push('focus');

    const barClassNames = ['bar', 'flex-row'];

    return (
      <div
        className={searchClassNames.join(' ')}
        onClick={this.focus}
        // onMouseLeave={this.blur}
      >
        <div className={barClassNames.join(' ')}>
          <div className="icon icon-24 icon-glass unselectable"></div>
          <input
            ref={(node) => { this.inputNode = node }}
            spellCheck="false"
            onChange={this.onChange}
            placeholder="Search"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
      </div>
    );
  }

  focus() {
    const { inputNode } = this;
    const { focus } = this.state;
    if (inputNode && !focus) {
      inputNode.focus();
    }
  }

  blur() {
    const { inputNode } = this;
    const { focus } = this.state;
    if (inputNode && focus) {
      inputNode.blur();
    }
  }

  onFocus(e) {
    if (e.target === e.currentTarget) {
      this.setState({ focus: true });
    }
  }

  onBlur(e) {
    this.setState({ focus: false });
  }

  onChange(e) {
    const {
      onSearch
    } = this.props;

    const { value } = e.target;

    this.setState({ term: value });
    if (onSearch) {
      onSearch(value);
    }
  }
}

export default Search;
