import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { API_URL, TIMEOUT_DURATION } from 'consts/api';
import {
  BrowserRouter as Router,
  // Route,
  // Link
} from 'react-router-dom';
import App from 'components/App';
import registerServiceWorker from './registerServiceWorker';

import './normalize.css';
import './index.css';

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
  });
};

ReactDOM.render(
  (
    <Router>
      <App/>
    </Router>
  ),
  document.getElementById('root')
);

registerServiceWorker();
