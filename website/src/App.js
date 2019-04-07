import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Main from './components/main';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
