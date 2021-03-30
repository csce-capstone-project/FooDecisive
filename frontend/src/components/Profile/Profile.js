import React, {useState, useEffect} from 'react';
import {authFetch} from "../../services/authentication";
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { yelpBusID } from '../../services/yelp';

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

        const abortController = new AbortController()
        const signal = abortController.signal

        authFetch("api/get_reviews", { signal: signal }).then(response => {
            return response.json()
        }).then(res => {
            console.log(res)
            let review_bus = []
            for(let i = 0; i < review_bus.length; i++) {
                let bus_name = yelpBusID.searchByID(res[i]['business_id']).city
                res[i]['business_name'] = bus_name
            }
            // Promise.all(bus).then((res) => {
            //     return res
            //   }).then((business) => {
            //     setResults(business)
            //   })
            setReviews(res)
        })
      }, [])

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
                        {
                            reviews.map(review => {
                                return <Paper style={{ 'padding-top': '10px' }}>
                                    <Typography variant='p' display="inline">{review.rating}, {review.text}</Typography>
                                </Paper>
                            })
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}