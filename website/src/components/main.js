import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Home from './home';
import Person from './person';
import Create from './createContact';
class Main extends React.Component{

	render() {
		return(
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/people/:id" component={Person}/>
                        <Route exact path="/create" component={Create}/>
                    </Switch>
                </Router>
		);
	}
};


//Connect everything
export default Main;