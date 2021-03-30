import React, {useState, useEffect} from 'react';
import {authFetch} from "../../services/authentication";
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export function Profile() {
    const [username, setUser] = useState("");
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("/test").then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
        })
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

    // Retrieve reviews

    return (
        <div className="Profile">
            <Grid container spacing={3} style={{ color: 'white', backgroundColor: '#e91e63' }}>
                <Grid item xs={1} style={{'padding-left': '50px'}}>
                    <Avatar style={{ height: '70px', width: '70px', fontSize: '40px' }}>{String(localStorage.getItem('user'))[0]}</Avatar>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h3' style={{ 'padding-top': '10px'}}>{username}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant='h3' style={{ 'padding-top': '10px'}}>Top Categories</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Paper>
                        <Typography variant='h3' style={{ 'padding-top': '10px', 'border-bottom-style':'solid'}}>Review History</Typography>
                        <Paper>
                            First review
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}