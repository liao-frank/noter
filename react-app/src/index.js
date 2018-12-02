import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { API_URL, TIMEOUT_DURATION } from 'consts/api';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from 'components/App';
import registerServiceWorker from './registerServiceWorker';

import './normalize.css';
import './index.css';

window.browserHistory = createBrowserHistory();

window.emit = (modelAction, data) => {
  const segments = modelAction.split('#');
  const model = segments[0];
  const action = segments[1];
  const socket = io.connect(API_URL + model.toLowerCase());

  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      socket.on(action, (result) => {
        if (!result || result.error) {
          reject(result);
        }
        else {
          resolve(result);
        }
        socket.disconnect();
      });
      socket.emit(action, data);

      setTimeout(() => {
        if (socket.connected) {
          console.log(`${modelAction} request timed out`);
          socket.disconnect();
        }
      }, TIMEOUT_DURATION);
    });
  }).catch((error) => {
    console.log(modelAction + ' request failed', error);
  });
};

ReactDOM.render(
  (
    <Router history={window.browserHistory}>
      <App/>
    </Router>
  ),
  document.getElementById('root')
);

registerServiceWorker();
