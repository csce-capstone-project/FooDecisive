import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { BigSearchBar } from '../BigSearchBar/BigSearchBar'
import { Typography, Paper, Grid } from '@material-ui/core';
import { UsernameContext } from '../../App';
import {login, authFetch, useAuth, logout} from "../../services/authentication"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { yelpREST } from '../../services/yelp';


const useStyles = makeStyles((theme) => ({
    about: {
        padding: theme.spacing(3),
        margin: '50px auto 10px',
        maxWidth: '40%',
        background: 'cyan'
    },
    content: {
        padding: theme.spacing(4),
        margin: '30px auto 10px',
        maxWidth: '40%',
        background: 'darkorchid'
    }
}));



export function Search() {
    const [results, setResults] = useState([]);

    function searchYelp(term, location, sortBy) {
        let endpoint = 'business/search';
        yelpREST(endpoint, { params : {
                term : term,
                location: location
            }
        }).then(({ data }) => {
            console.log(data);
          })
    }

    const classes = useStyles();
    return(
        <div className="App" src="../../restaurant.jpg">

            <BigSearchBar searchYelp={searchYelp}/>
        </div>
    );
}