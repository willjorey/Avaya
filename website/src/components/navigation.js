import React from "react";
import '../css/navigation.css'
import { NavLink } from 'react-router-dom';


const Navigation = (props) => {
		return(
			<nav className="navbar navbar-expand-lg" style={{backgroundColor: 'black'}}>
				<div className="container">
					<div className="navbar-header">
						<ul className="nav navbar-nav">
							<li><NavLink to="/">Home</NavLink></li>
							<li><NavLink to="/create">Create Contact</NavLink></li>
						</ul>
					</div>
				</div>
			</nav>
			);
};

export default Navigation;