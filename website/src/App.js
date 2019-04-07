import React, { Component } from 'react';
import './App.css';
class App extends Component {
  state={
    connections: []
  }

  onGetConnections = async ()=>{
    var response = await fetch('http://localhost:4000/connections');
    var json = await response.json();
    var connections = json.connections;
    this.setState({connections});
    console.log(connections)
  }
  
  render() {
    return (
      <div className="App">
        <p>
          This is the Home Page
        </p>
        <button onClick={() => this.onGetConnections()}>
          Get Connections
        </button>
      </div>
    );
  }
}

export default App;
