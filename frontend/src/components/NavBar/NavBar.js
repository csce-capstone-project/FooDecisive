import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

export function NavBar() {
      return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">FooDecisive</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search">Rate</Nav.Link>
                <Nav.Link href="/recommendations">Recommendations</Nav.Link>
                <Nav.Link href="/favs">Favorites</Nav.Link>
                <Nav.Link href="/bot">Talk to a Bot!</Nav.Link>
                </Nav>
                <Nav.Link href="/login" style={{ color: '#FFF'}}>Login</Nav.Link>
                <Nav.Link href="/register" style={{ color: '#FFF' }}>Register</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
      );
  }
