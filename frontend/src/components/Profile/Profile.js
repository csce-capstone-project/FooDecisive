import React, {useState, useEffect} from 'react';
import {authFetch} from "../../services/authentication";
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Box, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { yelpBusID } from '../../services/yelp';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {ReviewDetail} from './ReviewDetail';
import Fade from 'react-reveal/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';



export function Profile() {
    const [username, setUser] = useState("");
    const [reviews, setReviews] = useState([])
    const [openConfirm, setOpenConfirm] = useState(false);

    const fullWidth = true;

    const handleClose = () => {
        setOpenConfirm(false)
    }

    const handleOpenConfirm = () => {
        setOpenConfirm(true)
    }

    function handleDeleteRev() {

    }

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
                        res[k]['address'] = review_businesses[k]['address']
                        res[k]['imageSrc'] = review_businesses[k]['imageSrc']
                        res[k]['city'] = review_businesses[k]['city']
                        res[k]['state'] = review_businesses[k]['state']
                        res[k]['zipCode'] = review_businesses[k]['zipCode']
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
        <Fade>
        <div className="Profile" style={{backgroundColor: 'Orange', height: '100%'}}>
            <Grid container spacing={0} style={{ color: 'white', backgroundColor: 'Orange' }}>
                {/* <Grid item xs={12} style={{margin: 'auto'}}>
                    <Typography variant='h3'>Profile</Typography>
                </Grid> */}
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={3} style={{'padding-top':'50px'}}>
                <Typography variant='h2' style={{ 'padding-top': '10px'}}><b>Profile</b></Typography> <br></br>
                    <Avatar style={{ height: '125px', width: '125px', fontSize: '50px', margin:'auto' }}>
                        {String(localStorage.getItem('user'))[0].toUpperCase()}
                    </Avatar>
                    <Typography variant='h6' style={{ 'padding-top': '10px'}}>{username}</Typography>
                </Grid>
                <Grid item xs={8} style={{'padding-top':'30px'}}>
                    <Paper style={{'border-style': 'double'}}>
                        <Typography variant='h3' style={{ 'padding-top': '10px', 'border-bottom-style':'solid'}}>Review History</Typography>
                        {reviews.length != 0 ? 
                        <Grid container direction={'column'} spacing={0}>
                            {
                                reviews.map(review => {
                                    return <div>
                                        <ReviewDetail review={review} key={review.business_id}/>
                                    </div>;
                                })
                            }
                        </Grid>:  
                        <CircularProgress style={{color: 'orange'}}/>
                    }
                    </Paper>
                </Grid>
            </Grid>
            {/*<Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="business name"
                fullWidth={fullWidth}
                className='custom-modal-style'
            >
                <DialogTitle id='simple-dialog-title'>
                    <Typography>Confirm review deletion</Typography>
                </DialogTitle>
                <DialogContent>
                    <Button size='small' variant='contained' color='secondary'>YES</Button>
                    <Button size='small' variant='outlined' color='secondary' onClick={handleClose}>NO</Button>
                </DialogContent>
            </Dialog>*/}
        </div>
        </Fade>
    );
}