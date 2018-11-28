import React, { PureComponent } from 'react';

import './Button.css';

class Button extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      iconPath: undefined
    };

    this.loadIcon(props.icon);
  }

  render() {
    const { size, type, align, uppercase, onClick, className } = this.props;
    const { iconPath } = this.state;

    const classNames = ['button'];
    size && classNames.push(size);
    type && classNames.push(type);
    align && classNames.push('align-' + align);
    uppercase && classNames.push('uppercase');
    className && classNames.push(className);

    return (
      <div
        className={classNames.join(' ')}
        onClick={onClick || null}
      >
        { iconPath &&
          <span className="icon icon-24"
            style={{ backgroundImage: `url('${iconPath}')` }}>
          </span>
        }<span>{ this.props.children }</span>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.icon !== this.props.icon) {
      this.loadIcon(this.props.icon);
    }
  }

  loadIcon(iconName) {
    if (iconName) {
      import(/* webpackMode: "eager" */ `icons/${iconName}.svg`)
        .then((iconPath) => {
          this.setState({ iconPath });
        })
        .catch((error) => {
          console.error(`Couldn't retrieve icon 'icons/${iconName}.svg'`)
        });
    }
  }
}

export default Button;
