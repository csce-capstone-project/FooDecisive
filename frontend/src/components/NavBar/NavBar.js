import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import {authFetch, useAuth, logout} from "../../services/authentication"
import './NavBar.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Navbar, Nav} from 'react-bootstrap';
import FastfoodIcon from '@material-ui/icons/Fastfood';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export function HomeNavBar() {
  const classes = useStyles();
  const history = useHistory();
  const [logged] = useAuth();
  const [username, setUser] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


    const handleClick = (e) => {
      logout()
      history.push('/login')
      setAnchorEl(false)
    }


    useEffect(() => {
      authFetch("/api/protected").then(response => {
        if (response.status === 401){
          setUser("Sorry you aren't authorized!")
          return null
        }
        return response.json()
      }).then(response => {
        if (response && response.message){
          setUser(response.message)
        }
      })
    }, [])

      return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{width:'100%'}} className="topnav">
    <FastfoodIcon style={{fontSize: '50px', color: 'Orange', paddingRight: '10px'}}/>
    <Navbar.Brand href="#home" style={{fontSize: '30px'}}>FooDecisive</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/" style={{fontSize: '25px'}}>Home</Nav.Link>
      <Nav.Link href="/search" style={{fontSize: '25px'}}>Search</Nav.Link>
      {logged ? <Nav.Link href="/recs" style={{fontSize: '25px'}}>Recommendations</Nav.Link> : <div></div>}
      {logged ? <Nav.Link href="/favs" style={{fontSize: '25px'}}>Favorites</Nav.Link> : <div></div>}
      {logged ? <Nav.Link href="/chatbot" style={{fontSize: '25px'}}>Chatbot</Nav.Link> : <div></div>}
    </Nav>
    <Nav inline>
    {!logged ? <Nav.Link href="/register" style={{fontSize: '25px'}}>Register</Nav.Link> : <div></div>}
    {!logged ? <Nav.Link href="/login" style={{fontSize: '25px'}}>Login</Nav.Link> : <div></div>}
    {logged ? <div id="log" className={classes.root}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={onClick}>
             <Avatar>{String(localStorage.getItem('user'))[0]}</Avatar>
             </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to='/profile'>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={() => handleClick()}>Logout</MenuItem>
                </Menu>
            </div> : <div></div>}
    </Nav>
    </Navbar.Collapse>
  </Navbar>
        // <nav className="topnav">
        //   <ul className="links">
        //     <li>
        //       <Link className="link" to="/">Home</Link>
        //     </li>
        //     <li>
        //       <Link className="link" to="/search">Search</Link>
        //     </li>

        //     {logged ?
        //     <div className="topnav-logged">
        //     <li>
        //       <Link className="link" to="/recs">Recommendations</Link>
        //     </li>
        //     <li>
        //       <Link className="link" to="/favs">Favorites</Link>
        //     </li>
        //     <li><Link className="link" to="/ChatBot">ChatBot</Link></li>
        //     <li>
        //     <div id="log" className={classes.root}>
        //     <Button aria-controls="simple-menu" aria-haspopup="true" onClick={onClick}>
        //      <Avatar>{String(localStorage.getItem('user'))[0]}</Avatar>
        //      </Button>
        //         <Menu
        //           id="simple-menu"
        //           anchorEl={anchorEl}
        //           keepMounted
        //           open={Boolean(anchorEl)}
        //           onClose={handleClose}
        //         >
        //           <MenuItem component={Link} to='/profile'>Profile</MenuItem>
        //           <MenuItem onClick={handleClose}>Settings</MenuItem>
        //           <MenuItem onClick={() => handleClick()}>Logout</MenuItem>
        //         </Menu>
        //     </div>
        //       {/*<Link className="link" id="log" onClick={() => handleClick()}>Logout</Link> */}
        //     </li>
        //     </div> :
        //     <div className="topnav-right">
        //     <li>
        //       <Link className="link" id="log" to="/login">Login</Link>
        //     </li>
        //     <li>
        //       <Link className="link" id="reg" to="/register">Register</Link>
        //     </li>
        //     </div>}
        //   </ul>
        // </nav>
      );




  }
