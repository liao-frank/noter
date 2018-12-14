import React from 'react';
import Profile from 'components/Profile';

import './ProfileGroup.css';

const ProfileGroup = (props) => {
  const {
    size,
    imageNames,
    tooltips
  } = props;

  const newSize = parseInt(size, 10) + 8;  // includes border

  const groupStyle = {
    marginRight: newSize * 0.3 - 4 + 'px'
  };

  const containerStyle = {
    width: newSize * 0.7 + 'px',
    height: newSize + 'px',
  };

  const profileStyle = {
    boxShadow: 'none',
    border: `solid ${newSize / 18}px #fff`
  };

  const otherImageNames = [
    'arnav-agarwal.jpeg',
    'sarah-li.jpeg',
    'chris-henderson.jpeg',
    'warren-johnson.jpeg'
  ];

  const otherTooltips = [
    'Arnav Agarwal',
    'Sarah Li',
    'Chris Henderson',
    'Warren Johnson'
  ];

  const profiles = [ ...imageNames, ...otherImageNames ].map((name, index) => {
    return (
      <div
        key={name}
        className="container"
        style={containerStyle}
      >
        <Profile
          size={size}
          imageName={name}
          style={profileStyle}
          tooltip={tooltips && [ ...tooltips, ...otherTooltips ][index]}
        />
      </div>
    );
  });

  return (
    <div
      className="profile-group"
      style={groupStyle}>
      { profiles }
    </div>
  );
};

export default ProfileGroup;
