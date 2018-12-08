import React from 'react';

import './Topbar.css';

const Topbar = (props) => {

  const classNames = ['topbar'];
  props.className && classNames.push(props.className);

  return (
    <div className={classNames.join(' ')}>
      { props.children }
    </div>
  );
};

export default Topbar;
