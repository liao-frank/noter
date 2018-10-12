import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './normalize.css';
import './index.css';

import Notes from 'components/Notes';

ReactDOM.render(
  (
    <Router>
      <Notes/>
    </Router>
  ),
  document.getElementById('root')
);

registerServiceWorker();
