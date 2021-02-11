import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Redirect} from 'react-router'
import { useHistory, Link } from "react-router-dom";
import {login, authFetch, useAuth, logout} from "../../services/authentication"
import './NavBar.css'


export function HomeNavBar() {

  const history = useHistory();
  const [logged] = useAuth();


      return (
        <nav className="topnav">
          <ul className="links">
            <li>
              <Link className="link" to="/">Home</Link>
            </li>

            {logged ? 
            <div className="topnav-logged">
            <li>
              <Link className="link" to="/recs">Recommendations</Link>
            </li>
            <li>
              <Link className="link" to="/favs">Favorites</Link>
            </li>
            <li>
              <Link className="link" id="log" onClick={() => logout()}>Logout</Link>
            </li> 
            </div> :
            <div className="topnav-right">
            <li>
              <Link className="link" id="log" to="/login">Login</Link>
            </li>
            <li>
              <Link className="link" id="reg" to="/register">Register</Link>
            </li>
            </div>}
          </ul>
        </nav>
      );
  }

