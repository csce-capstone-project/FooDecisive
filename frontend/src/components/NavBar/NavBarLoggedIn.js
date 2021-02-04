import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { useHistory } from "react-router-dom";


export function NavBarLoggedIn() {
  const history = useHistory();


  function logout() {

    fetch('/api/logout', {
      method: 'POST',
      headers: {
          'Accept': 'application/json; charset=UTF-8',
          'Content-Type': 'application/json',
      },
      })

        localStorage.removeItem('all_users');
        history.push('/login');

  }


      return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">FooDecisive</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/rate">Rate</Nav.Link>
                  <Nav.Link href="/recommendations">Recommendations</Nav.Link>
                  <Nav.Link href="/favs">Favorites</Nav.Link>
                  <Nav.Link href="/bot">Talk to a Bot!</Nav.Link>
                </Nav>
                <Nav.Link style={{ color: '#FFF'}} onClick={logout}>Logout</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
      );
  }
