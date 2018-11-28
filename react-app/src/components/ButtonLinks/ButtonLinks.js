import React, { PureComponent, Children } from 'react';

import './ButtonLinks.css';

class ButtonLinks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: undefined
    };
  }

  render() {
    const { children } = this.props;

    return (
      <div className="button-links">
        {
          Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              className: index
            });
          })
        }
      </div>
    );
  }
}

export default ButtonLinks;
