import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import {login, authFetch, useAuth, logout} from "../../services/authentication"
import './NavBar.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
        <nav className="topnav">
          <ul className="links">
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/search">Search</Link>
            </li>

            {logged ?
            <div className="topnav-logged">
            <li>
              <Link className="link" to="/recs">Recommendations</Link>
            </li>
            <li>
              <Link className="link" to="/favs">Favorites</Link>
            </li>
            <li><Link className="link" to="/ChatBot">ChatBot</Link></li>
            <li>
            <div id="log" className={classes.root}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={onClick}>
             <Avatar>{localStorage.getItem('user').toString().toUpperCase()[0]}</Avatar>
             </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={() => handleClick()}>Logout</MenuItem>
                </Menu>
            </div>
              {/*<Link className="link" id="log" onClick={() => handleClick()}>Logout</Link> */}
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
