import React from 'react';

import './Sidebar.css';

const Sidebar = (props) => {
  const classNames = ['sidebar'];
  // props.dark && classNames.push('dark');
  props.right && classNames.push('right');
  props.background && classNames.push('background');
  props.className && classNames.push(props.className);
  props.hidden && classNames.push('hidden');

  const style = {
    flexBasis: parseInt(props.width, 10) + 'px'
  };
  props.style && Object.assign(style, props.style);
  const contentStyle = {
    width: parseInt(props.width, 10) + 'px'
  };

  return (
    <div
      className={classNames.join(' ')}
      style={style}
    >
      <div className="content" style={contentStyle}>
        { props.children }
      </div>
    </div>
  );
};

export default Sidebar;
