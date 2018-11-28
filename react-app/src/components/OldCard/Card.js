import React from 'react';

import './Card.css';

const Card = (props) => {
  const {
    flex,
    onClick,
    style,
    className
  } = props;

  const classNames = ['card'];
  flex && classNames.push('flex');
  onClick && classNames.push('clickable');
  className && classNames.push(className);

  return (
    <div
      style={style}
      className={classNames.join(' ')}
      onClick={onClick}
    >
      { props.children }
    </div>
  );
};

export default Card;
