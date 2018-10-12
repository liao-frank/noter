import React, { Component } from 'react';

import './Paper.css';

const exampleState = {
  plan: {
    questions: {
      1: '',
      2: '',
      3: ''
    },
  },
  interview: {
    intervieweeId: '',
    answers: {
      1: '',
      2: '',
      3: ''
    },
    categories: {

    }
  }
};

class Paper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="paper">

      </div>
    );
  }
}

export default Paper;
