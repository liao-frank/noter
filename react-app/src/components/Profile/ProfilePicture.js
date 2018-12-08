import React from 'react';
import CATEGORIES from 'consts/categories';

import './ProfilePicture.css';

const baseColors = Object.values(CATEGORIES);

const ProfilePicture = (props) => {
  const {
    size,
    imageName,
    defaultChar,
    style,
    tooltip
  } = props;

  const sizeNumber = parseInt(size, 10);

  const styles = {
    width: sizeNumber + 'px',
    height: sizeNumber + 'px'
  };

  style && Object.assign(styles, style);

  return (
    <div className="profile" style={styles}>
      <div className="base" style={{ backgroundColor: getColor(imageName) }}>
        <h3 className="header">
          { (defaultChar || imageName.charAt(0)).toUpperCase() }
        </h3>
      </div>
      <div className="profile-image" style={{
        backgroundImage: `url(/images/${imageName})`
      }}></div>
      { tooltip &&
        <div className="tooltip">{ tooltip }</div>
      }
    </div>
  );
};

const getColor = (key) => {
  let value = 0;

  for (let i = 0; i < key.length; i++) {
    const char = key.charAt(i);
    value = ((value << 5) - value) + char;
    value |= 0;
  }

  return baseColors[value % baseColors.length];
}

export default ProfilePicture;
