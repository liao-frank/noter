import React from 'react';

import './Section.css';

const Section = (props) => {
  const {
    title,
    subtitle,
    className
  } = props;

  const classNames = ['section'];
  title && classNames.push(title.toLowerCase());
  className && classNames.push(className);

  return (
    <div className={classNames.join(' ')}>
      { title && (
        <h4 className="title">{ title }</h4>
      ) }
      { subtitle && (
        <h5 className="subtitle">{ subtitle }</h5>
      ) }
      { props.children }
    </div>
  );
};

export default Section;
