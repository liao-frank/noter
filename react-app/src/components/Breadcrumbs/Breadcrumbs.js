import React from 'react';

import './Breadcrumbs.css';

const Breadcrumbs = (props) => {
  const { items } = props;

  const content = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    content.push(
      <h3
        className="header"
        key={item}
      >
        { item }
      </h3>
    );

    if (i < items.length - 1) {
      content.push(
        <div
          key={'separator: ' + item}
          className="icon icon-16 icon-right-arrow unselectable"
        ></div>
      );
    }
  }

  return (
    <div className="breadcrumbs flex-row">
      { content }
    </div>
  );
};

export default Breadcrumbs;
