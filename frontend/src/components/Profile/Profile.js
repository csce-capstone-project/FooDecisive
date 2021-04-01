import React, {useState, useEffect} from 'react';
import {authFetch} from "../../services/authentication";
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { yelpBusID } from '../../services/yelp';
import Rating from '@material-ui/lab/Rating';

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
            for(let i = 0; i < res.length; i++) {
                review_bus.push(res[i]['business_id'])
            }
            console.log(review_bus)
            if (review_bus !== undefined) {
                let bus = []   
                for(let j = 0; j < review_bus.length; j++) {
                  bus.push(yelpBusID.searchByID(review_bus[j]))
                }  
                Promise.all(bus).then((res) => {
                    console.log(res)
                  return res
                }).then((business) => {
                    console.log(business)
                  let review_businesses = business
                  console.log(review_businesses)
                  for(let k = 0; k < res.length; k++) {
                        res[k]['business_name'] = review_businesses[k]['name']
                    }
                    setReviews(res)
                })
            }
        })
        // .then((review_b, resp) => {
        //     for(let k = 0; k < resp.length; k++) {
        //         resp[k]['business_name'] = review_b[k]['name']
        //     }
        //     setReviews(resp)
        //     // console.log(reviews)
        // })

        return function cleanup() {
            abortController.abort()
          }
      }, [])

    return (
        <div className="Profile">
            <Grid container spacing={0} style={{ color: 'white', backgroundColor: 'Orange' }}>
                <Grid item xs={12} style={{margin: 'auto'}}>
                    <Typography variant='h3'>Profile</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={3} style={{'padding-top':'50px'}}>
                    <Avatar style={{ height: '125px', width: '125px', fontSize: '50px', margin:'auto' }}>
                        {String(localStorage.getItem('user'))[0]}
                    </Avatar>
                    <Typography variant='h6' style={{ 'padding-top': '10px'}}>{username}</Typography>
                </Grid>
                <Grid item xs={8} style={{'padding-top':'30px'}}>
                    <Paper style={{'border-style': 'double'}}>
                        <Typography variant='h3' style={{ 'padding-top': '10px', 'border-bottom-style':'solid'}}>Review History</Typography>
                        <Grid container direction={'column'} spacing={0}>
                            {
                                reviews.map(review => {
                                    return <Box style={{ 'padding-top': '10px', 'padding-bottom': '10px'}} border={1}>
                                        <Typography variant='h5' display="inline">{review.business_name}</Typography>
                                        <br></br>
                                        <Rating name="read-only" value={review.rating} readOnly />
                                        <br></br>
                                        <Typography variant='p' display="inline">"{review.text}"</Typography>
                                    </Box>
                                })
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}