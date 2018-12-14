import React from 'react';
import * as ROUTES from 'consts/routes';
import orderItems, * as ORDERINGS from 'consts/orderings';
import Card from 'components/Card';
import Section from 'components/Section';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';

import './FolderDirectory.css';
import GrayFolderIcon from 'icons/folder-gray.svg';
import PurpleFolderIcon from 'icons/folder-purple.svg';

const FolderDirectory = (props) => {
  const { context, ordering, orderingDirection } = props;

  const {
    showingSelected, selected, updateSelected,
    folder, updateFolder,
  } = context;

  const { folders } = folder;
  let orderedFolders = orderItems(ordering, folders, orderingDirection);
  orderedFolders = orderedFolders.filter(note => note);
  let validFolderCount = 0;

  const cards = orderedFolders.map((folder) => {
    if (!folder) return null;
    const isSelected = showingSelected && selected && folder._id === selected.item._id;
    const icon = isSelected ? PurpleFolderIcon : GrayFolderIcon;

    validFolderCount += 1;

    return (
      <Card
        key={folder._id}
        onClick={() => { updateSelected('folder', folder, true) }}
        onDoubleClick={() => {
          window.browserHistory.push(`${ROUTES.FOLDER}/${folder._id}`);
        }}
        onRightClick={() => { updateSelected('folder', folder, true, true) }}
        className={isSelected ? 'selected' : null}
        dropdown={
          <Dropdown buttonType="transparent" buttonSize="small">
            <Button icon="share-gray">Collaborate</Button>
            <Button icon="edit-gray">Rename</Button>
            <Button icon="trash-gray"
              onClick={() => {
                window
                  .emit('folder#deleteOne', { query: { _id: folder._id } })
                  .then((result) => { updateFolder() });
              }}
            >Delete</Button>
          </Dropdown>
        }
      >
        <div className="flex-row">
          <div className="icon icon-24"
            style={{ backgroundImage: `url(${icon})` }}
          ></div>
          <div className="name">{ folder.name }</div>
        </div>
      </Card>
    );
  });

  return (
    <Section title={
      <div className="directory-header">
        <h4 className="title">Folders</h4>
        <h6 className="subtitle">( {validFolderCount} )</h6>
      </div>
    } className="folder-directory">
      <div className="flex-row">{ cards }</div>
    </Section>
  );
};

export default FolderDirectory;
