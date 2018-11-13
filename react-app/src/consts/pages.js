import React from 'react';
import MyNotesView from 'views/MyNotesView';

const HOME = 'HOME';
const MY_NOTES = 'MY_NOTES';
const SHARED_NOTES = 'SHARED_NOTES';
const TRASH = 'TRASH';

export const PAGES = {
  HOME,
  MY_NOTES,
  SHARED_NOTES,
  TRASH
};

export const VIEWS = {
  [MY_NOTES]: <MyNotesView/>
};
