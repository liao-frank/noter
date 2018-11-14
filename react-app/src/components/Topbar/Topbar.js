import React from 'react';

import './Topbar.css';

const Topbar = (props) => {
  return (
    <div className="topbar">
      { props.children }
    </div>
  );
};

export default Topbar;
