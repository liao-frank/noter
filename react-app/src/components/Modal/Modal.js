import React, { PureComponent } from 'react';
import Section from 'components/Section';
import Button from 'components/Button';
import { AppConsumer } from 'components/App';

import './Modal.css';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showing: false };
    this.node = undefined;
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { title, onConfirm, onCancel } = this.props;
    const { showing } = this.state;

    const backgroundClassNames = ['modal-background'];
    showing && backgroundClassNames.push('visible');

    const modalClassNames = ['modal'];
    showing && modalClassNames.push('visible');

    return (
      <div className={backgroundClassNames.join(' ')}>
        <div
          className={modalClassNames.join(' ')}
          ref={(node) => { this.node = node }}
        >
          <Section>
            <h3 className="title">{title}</h3>
            { this.props.children }
            <AppConsumer>
              { (context) => {
                  const { updateModal } = context;
                  this.updateModal = updateModal;

                  return <div className="actions">
                    { onCancel &&
                      <Button type="transparent" size="small"
                        onClick={() => {
                          onCancel();
                          updateModal();
                        }}
                      >Cancel</Button>
                    }
                    { onConfirm &&
                      <Button type="purple" size="small"
                        onClick={() => {
                          onConfirm(this.node);
                          updateModal();
                        }}
                      >Confirm</Button>
                    }
                  </div>
              } }
            </AppConsumer>
          </Section>
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
    setTimeout(() => {
      this.setState({ showing: true });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  componentDidUpdate() {
    if (!this.props.showing) {
      this.setState({ showing: false });
    }
  }

  handleClick(e) {
    const { node } = this;
    if (node) {
      if (node.contains(e.target)) {
        return;
      }
      else if (this.updateModal) {
        this.updateModal();
      }
    }
  }
}

export default Modal;
