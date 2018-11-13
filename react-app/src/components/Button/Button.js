import React from 'react';

import './Button.css';

const Button = (props) => {
  const {
    size,
    type,
    uppercase
  } = props;

  const classNames = ['button'];
  size && classNames.push(size);
  type && classNames.push(type);
  uppercase && classNames.push('uppercase');

  return (
    <div className={classNames.join(' ')}>
      { props.children }
    </div>
  );
};

export default Button;
