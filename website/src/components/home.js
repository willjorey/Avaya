import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Navigation from './navigation';
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            connections: []
          }
    }


  onGetConnections = async ()=>{
    var response = await fetch('http://localhost:4000/connections');
    var json = await response.json();
    var connections = json.connections;
    this.setState({connections});
    console.log(connections);
  }
  
  render() {
    var columns = [{
      dataField:'names[0].displayName',
      text: 'Name',
      sort: true
    },
    {
      dataField: 'birthdays[0].text',
      text:'Birthday',
      sort: true
    },
    {
      dataField: 'genders[0].formattedValue',
      text:'Gender',
      sort: true
    }
    ];
    var rowEvents={
      onClick: (e, row, rowIndex)=>{
        console.log('EVENT', e);
        console.log('ROW', row);
        console.log('INDEX', rowIndex);
        this.props.history.push('/' + row.resourceName);
      }
    }
    return (
      <div className="Home">
        <Navigation/>
        <button onClick={() => this.onGetConnections()}>
          Get Connections
        </button>
        <div>
          <BootstrapTable keyField='resourceName' data={this.state.connections} columns={columns} rowEvents={ rowEvents } striped hover condensed />
        </div>
      </div>
    );
  }
}

export default Home;
