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

window.emit = (modelAction, data, socket, timeout=TIMEOUT_DURATION) => {
  const segments = modelAction.split('#');
  const model = segments[0];
  const action = segments[1];
  if (socket) {
    socket.emit(action, data);
    return;
  }

  socket = io.connect(API_URL + model.toLowerCase());

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
      if (!timeout) {
        resolve(undefined);
        return;
      }
      setTimeout(() => {
        if (socket.connected) {
          console.log(`${modelAction} request timed out`);
          socket.disconnect();
        }
      }, timeout);
    });
  }).catch((error) => {
    console.log(modelAction + ' request failed', error);
  });
};

window.listen = (modelAction, callback) => {
  const segments = modelAction.split('#');
  const model = segments[0];
  const action = segments[1];
  const socket = io.connect(API_URL + model.toLowerCase());

  if (Array.isArray(callback)) {
    for (const cb of callback) {
      socket.on(action, cb);
    }
  }
  else if (typeof callback === 'function') {
    socket.on(action, callback);
  }

  return socket;
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
