import React, { Component } from 'react';
import Navigation from './navigation';
import '../css/createContact.css';
class CreateContact extends Component {
    constructor(props){
        super(props);
        this.state = {
          fname:'',
          lname:'',
          year:'',
          month:'',
          day:'',
          gender: '',
        }
    }

  handleYear = (event)=>{
    this.setState({
      year:event.target.value
    })
  }  
  handleMonth = (event)=>{
    this.setState({
      month:event.target.value.padStart(2,'0')
    })
  }
  handleDay = (event)=>{
    this.setState({
      day:event.target.value.padStart(2,'0')
    })
  }
  handleFirstName = (event) =>{
    this.setState({
      fname: event.target.value
    })
  };  
  handleLastName = (event) =>{
    this.setState({
      lname: event.target.value
    })
  };  
  handleGender = (event) => {
    this.setState({
      gender: event.target.value
    })
  };
  
  handleSubmit = ()=>{
    console.log(this.state.year, this.state.month, this.state.day);
    fetch('http://localhost:4000/create',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        "year":this.state.year,
        "month":this.state.month,
        "day":this.state.day,
        "fname": this.state.fname,
        "lname": this.state.lname,
        "gender":this.state.gender,
      })
    })
    alert("Contact Created");
  };
  render() {
    return (
      <div>
        <Navigation/>
        <div className="CreateContact">
          <h1>Create A Contact</h1>
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <label>First Name</label><br/>
              <input type="text" onChange={this.handleFirstName}/><br/>
              <label>Last Name</label><br/>
              <input type="text" onChange={this.handleLastName}/><br/>
              <label>Gender</label>
              <select value={this.state.gender} onChange={this.handleGender}>
                <option value="None">None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select><br/>
              <label>Birthday</label>
              <input type="number" min="0" placeholder="YYYY" onChange={this.handleYear}/>
              <input type="number"  min="1" max="12" placeholder="MM" onChange={this.handleMonth}/>
              <input type="number" min="1" max="31" placeholder="DD" onChange={this.handleDay}/><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default CreateContact;
