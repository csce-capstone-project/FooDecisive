import React from 'react'
import { Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';

export function HomeNavBar() {
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
                <Button href="/login" style={{ color: '#FFF', margin:'10px'}}>Login</Button>
                <Button href="/register" style={{ color: '#FFF' }}>Register</Button>
            </Navbar.Collapse>
        </Navbar>
      );
  }
