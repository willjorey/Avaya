import React, { Component } from 'react';
import Navigation from './navigation';
class CreateContact extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

  render() {
    return (
      <div className="CreateContact">
        <Navigation/>
        <h1>Create A Contact</h1>
      </div>
    );
  }
}

export default CreateContact;
