import React from 'react';

import './Card.css';

const Card = (props) => {
  const {
    flex,
    onClick,
    style
  } = props;

  const classNames = ['card'];
  flex && classNames.push('flex');
  onClick && classNames.push('clickable');

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
