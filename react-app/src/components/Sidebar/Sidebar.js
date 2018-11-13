import React from 'react';

import './Sidebar.css';

const Sidebar = (props) => {
  const classNames = ['sidebar'];
  // props.dark && classNames.push('dark');
  props.right && classNames.push('right');
  props.background && classNames.push('background');
  props.className && classNames.push(props.className);

  const style = {
    flexBasis: parseInt(props.width, 10) + 'px'
  };

  return (
    <div
      className={classNames.join(' ')}
      style={style}
    >
      { props.children }
    </div>
  );
};

export default Sidebar;
