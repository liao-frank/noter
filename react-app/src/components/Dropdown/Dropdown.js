import React from 'react';

import './Dropdown.css';

const Dropdown = (props) => {
  const {
    open, getRef,
    top, right, bottom, left
  } = props;

  const classNames = ['dropdown'];
  open && classNames.push('open');

  const styles = {
    top: top || null,
    right: right || null,
    bottom: bottom || null,
    left: left || null
  };

  const buttonProps = Object.keys(props).reduce((buttonProps, key) => {
    if (key.startsWith('button')) {
      buttonProps[key.replace('button', '').toLowerCase()] = props[key];
    }
    return buttonProps;
  }, {});

  return (
    <div
      className={classNames.join(' ')}
      style={styles}
      ref={(node) => { getRef && getRef(node) }}
    >
      {
        React.Children.map(props.children, (child) => {
          return React.cloneElement(child, buttonProps);
        })
      }
    </div>
  );
};

export default Dropdown;
