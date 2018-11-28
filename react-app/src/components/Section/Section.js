import React from 'react';
import { kebabCase } from 'lodash';

import './Section.css';

const Section = (props) => {
  const {
    title,
    subtitle,
    className
  } = props;

  const classNames = ['section'];
  title && classNames.push(kebabCase(title));
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
