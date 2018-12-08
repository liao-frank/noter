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
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  render() {
    const {
      className,
      title, onKeyPress,
      onConfirm, onConfirmLabel,
      onCancel, onCancelLabel
    } = this.props;
    const { showing } = this.state;

    const backgroundClassNames = [ 'modal-background' ];
    showing && backgroundClassNames.push('visible');

    const modalClassNames = [ className, 'modal' ];
    showing && modalClassNames.push('visible');

    return (
      <div className={backgroundClassNames.join(' ')}>
        <div
          className={modalClassNames.join(' ')}
          ref={(node) => { this.node = node }}
          onKeyPress={(e) => { onKeyPress(e, this.node) }}
        >
          <Section>
            { (typeof title === 'string') ?
              <h3 className="title">{title}</h3> :
              title
            }
            { this.props.children }
            <AppConsumer>
              { (context) => {
                  const { updateModal } = context;
                  this.updateModal = updateModal;

                  return <div className="actions">
                    { onCancel &&
                      <Button type="transparent" size="small"
                        onClick={() => {
                          const promise = onCancel();
                          if (!promise) {
                            updateModal();
                          }
                          else {
                            promise.then((success) => {
                              if (success) {
                                updateModal();
                              }
                            });
                          }
                        }}
                      >{ onCancelLabel || 'Cancel' }</Button>
                    }
                    { onConfirm &&
                      <Button type="purple" size="small"
                        onClick={this.handleConfirm}
                      >{ onConfirmLabel || 'Confirm' }</Button>
                    }
                  </div>
              } }
            </AppConsumer>
          </Section>
        </div>
      </div>
    );
  }

  handleConfirm() {
    const promise = this.props.onConfirm(this.node);
    if (!promise) {
      this.updateModal();
    }
    else {
      promise.then((success) => {
        if (success) {
          this.updateModal();
        }
      });
    }
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

  // componentDidUpdate() {
  //   if (this.props.showing === false) {
  //     this.setState({ showing: false });
  //   }
  // }

  handleClick(e) {
    const { requireAction } = this.props;
    const { node } = this;
    if (node && !requireAction) {
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
