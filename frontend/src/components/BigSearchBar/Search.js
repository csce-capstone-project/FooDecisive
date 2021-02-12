import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { BigSearchBar } from '../BigSearchBar/BigSearchBar'
import { Typography, Paper, Grid } from '@material-ui/core';
import { UsernameContext } from '../../App';
import {login, authFetch, useAuth, logout} from "../../services/authentication"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'




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
    const classes = useStyles();
    return(
        <div className="App" src="../../restaurant.jpg">
                <Typography variant="h2" align="center" gutterBottom>
                Welcome to Search!
                </Typography>
            

            <BigSearchBar/>
        </div>
    );
}