import React, { PureComponent } from 'react';
import { debounce } from 'lodash';

import './Card.css';

const DEBOUNCE_INTERVAL = 200;

class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const {
      className, flex, style,
      onClick, onDoubleClick,
      children
    } = this.props;

    const classNames = ['card'];
    flex && classNames.push('flex');
    (onClick || onDoubleClick) && classNames.push('clickable');
    className && classNames.push(className);


    return (
      <div
        style={style}
        className={classNames.join(' ')}
        onClick={this.handleClick}
      >
        { children }
      </div>
    );
  }

  handleClick(e) {
    const { onClick, onDoubleClick } = this.props;

    if (!this.debouncedOnClick) {
      this.debouncedOnClick = debounce(() => {
        this.clicked = false;
        onClick();
      }, DEBOUNCE_INTERVAL);
    }
    if (this.clicked) {
      this.debouncedOnClick.cancel();
      this.clicked = false;
      onDoubleClick();
    }
    else {
      this.debouncedOnClick();
      this.clicked = true;
    }
  }
}

export default Card;
