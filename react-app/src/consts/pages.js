import React from 'react';
import Directory from 'components/Directory';

const HOME = 'HOME';
const DIRECTORY = 'DIRECTORY';

export const PAGES = {
  HOME,
  DIRECTORY
};

export const VIEWS = {
  [DIRECTORY]: <Directory/>
};
