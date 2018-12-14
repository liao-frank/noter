import React, { PureComponent } from 'react';
import uuidv4 from 'uuid/v4';
import Modal from 'components/Modal';
import TextInput from 'components/TextInput';

import './LoginModal.css';

class LoginModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      invalidCredentials: false,
    };
  }

  render() {
    const { updateModal, showing } = this.props;
    const { invalidCredentials } = this.state;

    return (
      <Modal
        className="login-modal" requireAction={true} showing={showing}
        title={
          <div>
            <div className="logo logo-noter"></div>
            <h3 className="title">Log In</h3>
          </div>
        }
        onConfirm={modalNode => this.login(modalNode)}
        onConfirmLabel="Log In"
        onKeyPress={(e, modalNode) => {
          if (e.key === 'Enter') {
            this
              .login(modalNode)
              .then((success) => {
                if (success) {
                  updateModal();
                }
              });
          }
        }}
      >
        <TextInput id="email" autofocus placeholder="Email"/>
        <TextInput id="password" type="password" placeholder="Password"/>
        { invalidCredentials &&
          <div key={uuidv4()} className="error animated flash">
            Username or password incorrect.
          </div>
        }
      </Modal>
    );
  }

  login(node) {
    const { updateUser } = this.props;

    const email = node.querySelector('#email').value;
    const password = node.querySelector('#password').value;

    const query = { email, password };

    return updateUser(query)
      .then((success) => {
        if (success) {
          window.localStorage.setItem('user', JSON.stringify(query));
        }
        else {
          this.setState({ invalidCredentials: true });
          this.forceUpdate();
        }
        return success;
      });
  }
}

export default LoginModal;
