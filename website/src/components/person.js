import React, { Component } from 'react';
import Navigation from './navigation';
class Person extends Component {
    constructor(props){
        super(props);
        this.id = this.props.match.params.id;
        console.log(this.id);
        this.state = {
            person: {},
            name: '',
            birthday: '',
        }
    }

    // Fetch the persons information given this.id
    async componentDidMount(){
        var response = await fetch('http://localhost:4000/people/' + this.id);
        var json = await response.json();
        var person = json.person;
        this.setState({
            person:person,
            name: person.names[0].displayName,
            birthday: person.birthdays[0].text
        });
        console.log(person);
    }

  render() {
    return (
      <div className="Person">
        <Navigation/>
        <p>My name is:</p>
        <h3>{this.state.name}</h3>
        <p>My Birthday is:</p>
        <h3>{this.state.birthday}</h3>

      </div>
    );
  }
}

export default Person;
