import React, { PureComponent } from 'react';
import { debounce } from 'lodash';

import './Card.css';

const DEBOUNCE_INTERVAL = 200;

class Card extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

    this.node = undefined;
    this.dropdownNode = undefined;

    this.openDropdown = this.openDropdown.bind(this);
    this.checkBlur = this.checkBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const {
      className, flex, style,
      onClick, onDoubleClick, onRightClick,
      dropdown, children
    } = this.props;

    const {
      dropdownX, dropdownY,
      dropdownOpen,
    } = this.state;

    const classNames = ['card'];
    flex && classNames.push('flex');
    (onClick || onDoubleClick) && classNames.push('clickable');
    className && classNames.push(className);

    return (
      <div
        style={style}
        className={classNames.join(' ')}
        onClick={this.handleClick}
        onContextMenu={(e) => {
          onRightClick && onRightClick(e);
          this.openDropdown(e);
        }}
        ref={(node) => { this.node = node }}
      >
        { children }
        { dropdown &&
          React.cloneElement(dropdown, {
            open: dropdownOpen,
            top: dropdownY, left: dropdownX,
            getRef: (node) => { this.dropdownNode = node }
          })
        }
      </div>
    );
  }

  componentDidMount() {
    if (this.props.dropdown) {
      document.addEventListener('mousedown', this.checkBlur, false);
    }
  }

  componentWillUnmount() {
    if (this.props.dropdown) {
      document.removeEventListener('mousedown', this.checkBlur, false);
    }
  }

  componentDidUpdate() {
    const { onClick } = this.props;
    
    this.debouncedOnClick = debounce(() => {
      this.clicked = false;
      onClick();
    }, DEBOUNCE_INTERVAL);
  }

  handleClick(e) {
    const { onClick, onDoubleClick } = this.props;
    if (this.dropdownNode && this.dropdownNode.contains(e.target)) {
      return;
    }

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

  openDropdown(e) {
    let x = '0';
    let y = '100%';
    if (this.node) {
      const rect = this.node.getBoundingClientRect();
      x = e.clientX - rect.x + 'px';
      y = e.clientY - rect.y + 'px';
    }
    e.preventDefault();

    const { dropdownOpen } = this.state;
    if (this.props.dropdown && !dropdownOpen) {
      this.setState({
        dropdownX: x,
        dropdownY: y,
        dropdownOpen: true
      });
    }
  }

  closeDropdown() {
    const { dropdownOpen } = this.state;
    if (this.props.dropdown && dropdownOpen) {
      this.setState({ dropdownOpen: false });
    }
  }

  checkBlur(e) {
    const { dropdownNode } = this;
    if (dropdownNode) {
      if (dropdownNode.contains(e.target)) {
        return;
      }
      else {
        this.closeDropdown();
      }
    }
  }
}

export default Card;
