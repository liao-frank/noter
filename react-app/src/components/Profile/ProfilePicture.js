import React from 'react';

import './ProfilePicture.css';

const ProfilePicture = (props) => {
  const {
    size,
    imageName,
    style,
    tooltip
  } = props;

  const sizeNumber = parseInt(size, 10);

  const styles = {
    backgroundImage: `url(images/${imageName})`,
    width: sizeNumber + 'px',
    height: sizeNumber + 'px'
  };
  style && Object.assign(styles, style);

  return (
    <div
      className="profile"
      style={styles}
    >
      { tooltip &&
        <div className="tooltip">{ tooltip }</div>
      }
    </div>
  );
};

export default ProfilePicture;
