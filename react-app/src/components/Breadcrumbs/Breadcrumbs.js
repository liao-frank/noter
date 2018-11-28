import React from 'react';

import './Breadcrumbs.css';

const Breadcrumbs = (props) => {
  const { items, keyer, renderer, onClick } = props;

  const content = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const isNotLast = i < items.length - 1;

    content.push(
      <h3
        key={keyer(item)}
        className={'header' + (isNotLast ? ' selectable' : '')}
        onClick={isNotLast ?
          () => {
            onClick(item);
          } : null
        }
      >
        { renderer(item) }
      </h3>
    );

    if (i < items.length - 1) {
      content.push(
        <div
          key={'separator: ' + keyer(item)}
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
