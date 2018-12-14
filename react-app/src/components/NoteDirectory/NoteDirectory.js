import React from 'react';
import * as ROUTES from 'consts/routes';
import orderItems, * as ORDERINGS from 'consts/orderings';
import CATEGORIES, { DARK_CATEGORIES, LIGHT_CATEGORIES } from 'consts/categories';
import Card from 'components/Card';
import Section from 'components/Section';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';

import './NoteDirectory.css';
import GrayNoteIcon from 'icons/note-gray.svg';
import PurpleNoteIcon from 'icons/note-purple.svg';

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const CategoryNoteDirectory = (props) => {
  const { context, ordering, orderingDirection, category } = props;

  const {
    showingSelected, selected, updateSelected,
    folder, updateFolder,
  } = context;

  const { notes } = folder;

  let orderedNotes = orderItems(ordering, notes, orderingDirection);
  orderedNotes = orderedNotes.filter((note) => {
    if (!note) return false;
    if (category && category !== 'NONE') {
      return note.categories && note.categories.includes(category);
    }
    else if (category === 'NONE') {
      return note.categories && note.categories.length === 0;
    }
    return true;
  });

  let validNoteCount = 0;

  const cards = orderedNotes.map((note) => {
    const isSelected = showingSelected && selected && note._id === selected.item._id;
    const icon = isSelected ? PurpleNoteIcon : GrayNoteIcon;
    const cardClassnames = [
      isSelected ? 'selected' : '',
      category ? 'category-' + category.toLowerCase() : ''
    ]
    validNoteCount += 1;
    let style = {};

    if (category && category !== 'NONE') {
      const darkHex = hexToRgb(DARK_CATEGORIES[category]);
      const categoryStyle = {
        color: DARK_CATEGORIES[category], backgroundColor: LIGHT_CATEGORIES[category],
        boxShadow: `0 3px 6px rgba(${darkHex.r}, ${darkHex.g}, ${darkHex.b}, 0.08),
          0 3px 6px rgba(${darkHex.r}, ${darkHex.g}, ${darkHex.b}, 0.12)`
      };
      Object.assign(style, categoryStyle);
    }

    return (
      <Card
        key={note._id}
        onClick={() => { updateSelected('note', note, true) }}
        onDoubleClick={() => {
          window.open(`${ROUTES.NOTE}/${note._id}`, '_blank').focus();
        }}
        onRightClick={() => { updateSelected('note', note, true, true) }}
        className={cardClassnames.join(' ')}
        style={style}
        dropdown={
          <Dropdown buttonType="transparent" buttonSize="small">
            <Button icon="share-gray">Collaborate</Button>
            <Button icon="copy-gray">Make a copy</Button>
            <Button icon="edit-gray">Rename</Button>
            <Button icon="trash-gray"
              onClick={() => {
                window
                  .emit('note#deleteOne', { query: {
                    _id: note._id,
                    parent: folder._id
                  } })
                  .then(() => { updateFolder() });
              }}
            >Delete</Button>
          </Dropdown>
        }
      >
        <div className="flex-row">
          <div className="icon icon-24"
            style={{ backgroundImage: `url(${icon})` }}
          ></div>
          <div className="name">{ note.name }</div>
        </div>
      </Card>
    );
  });

  if (validNoteCount === 0) return null;

  let title = 'Notes';
  if (category && category !== 'NONE') {
    title = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  }
  else if (category === 'NONE') {
    title = 'No category';
  }

  return (
    <Section title={
      <div className="directory-header">
        <h4 className="title">{ title }</h4>
        <h6 className="subtitle">( {validNoteCount} )</h6>
      </div>
    } className="note-directory">
      <div className="flex-row">{ cards }</div>
    </Section>
  );
};

const NoteDirectory = (props) => {
  const { orderingCategories } = props;

  if (orderingCategories) {
    const sections = [<CategoryNoteDirectory {...props} key="NONE" category="NONE"/>];
    for (const category of Object.keys(CATEGORIES)) {
      sections.push(<CategoryNoteDirectory {...props} key={category} category={category}/>)
    }
    return sections;
  }
  else {
    return (
      <CategoryNoteDirectory {...props}/>
    );
  }
};

export default NoteDirectory;
