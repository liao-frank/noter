import React, { PureComponent } from 'react';
import Button from 'components/Button';
import Modal from 'components/Modal';
import TextInput from 'components/TextInput';
import Dropdown from 'components/Dropdown';
import { AppConsumer } from 'components/App';

import './CreateMenu.css';

const FOLDER = 'FOLDER';
const NOTE = 'NOTE';

class CreateMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.confirmNew = this.confirmNew.bind(this);
    this.menuNode = undefined;
  }

  render() {
    const { open } = this.state;
    // const menuClassNames = ['create-menu'];
    // open && menuClassNames.push('open');

    return (
      <div className="create-button">
        <Button
          type="purple"
          align="center"
          uppercase
          onClick={this.open}
        >
          New
        </Button>
        <AppConsumer>
          { (context) => {
            return (
              <Dropdown
                open={open} top="0" left="0"
                getRef={(node) => { this.menuNode = node }}
              >
                <Button
                  type="transparent"
                  icon="folder-gray"
                  onClick={() => { this.confirmNew(FOLDER, context) }}
                >Folder</Button>
                <Button
                  type="transparent"
                  icon="note-gray"
                  onClick={() => { this.confirmNew(NOTE, context) }}
                >Note</Button>
              </Dropdown>
            );
          } }
        </AppConsumer>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  open() {
    const { open } = this.state;
    if (!open) {
      this.setState({ open: true });
    }
  }

  close() {
    const { open } = this.state;
    if (open) {
      this.setState({ open: false });
    }
  }

  handleClick(e) {
    const { menuNode } = this;
    if (menuNode) {
      if (menuNode.contains(e.target)) {
        return;
      }
      else {
        this.close();
      }
    }
  }

  confirmNew(type, context) {
    const { user, folder, updateFolder, updateModal } = context;

    const title = 'New ' + type.toLowerCase();
    const inputId = 'create-name';
    const ModalComponent = <Modal
      title={title}
      onCancel={() => {}}
      onConfirm={(modalNode) => {
        const name = modalNode.querySelector('#' + inputId).value;

        if (name) {
          const query = { doc: {
            parent: folder._id,
            owner: user._id,
            name
          } };

          window.emit(type + '#create', query)
            .then((result) => {
              updateFolder();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }}
    >
      <TextInput
        id={inputId} autofocus
        defaultValue={'Untitled ' + type.toLowerCase()}
        placeholder="Choose a name.."
      />
    </Modal>;

    this.close();
    updateModal(ModalComponent);
  }
}

export default CreateMenu;
