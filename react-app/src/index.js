import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  // Route,
  // Link
} from 'react-router-dom';
import App from 'components/App';
import registerServiceWorker from './registerServiceWorker';

import './normalize.css';
import './index.css';

ReactDOM.render(
  (
    <Router>
      <App/>
    </Router>
  ),
  document.getElementById('root')
);

registerServiceWorker();
