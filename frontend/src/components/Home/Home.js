import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, requirePropFactory } from '@material-ui/core';
import {authFetch, useAuth} from "../../services/authentication"
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import { spacing } from '@material-ui/system';
import CardContent from '@material-ui/core/CardContent';
import { shadows } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchImage from '../Home/photo/search.png';
import RateImage from '../Home/photo/rate.png';
import Chatbot from '../Home/photo/Chatbot.png';
import { useHistory } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';

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
    },
    Feature: {    
      padding: '70px',   
    },
}));


export function Home() {
    const classes = useStyles();
    const [currentMessage, setMessage] = useState();
    const [username, setUser] = useState("");
    const [logged] = useAuth();
    const history = useHistory();
 
   
    // const { user } = props.location;

    // Basically like the old componentDidMount method. Like a constructor.
    // useEffect(() => {
    //     // setUser(JSON.parse(localStorage.getItem('all_users')))
    //     // fetch('/test').then(res => res.json()).then(data => {
    //     //   setMessage(data.message);
    //     // });

    //   }, []);

    // NOTE: autoFetch() uses Bearer token authorization. It's a macro for fetch().
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

    return(
      <Fade>
        <div className="App" src="../../restaurant.jpg">
            {/*<header className="App-header">
                <p>{currentMessage}</p>
            </header> */}
            {logged ? 
               <Box style={{backgroundColor: 'Orange', paddingBottom: '100px'}} boxShadow={4}>
                 <Container style={{paddingTop: '100px'}}>
                <Typography variant="h2" align="center" gutterBottom>
                Welcome to FooDecisive, {username}!
                </Typography>
                </Container>
                </Box> :
                
                <Box style={{backgroundColor: 'Orange', paddingBottom: '100px'}} boxShadow={4}>
                  <Container style={{paddingTop: '100px'}}>
                <Typography variant="h2" align="center" gutterBottom>
                Welcome to FooDecisive!
                </Typography>
                </Container>
                </Box> 
            }

        <Container maxWidth="lg" className={classes.Feature} >
        <Typography variant="h4" align="center" gutterBottom>
                About FooDecisive
                </Typography>
                <Container maxWidth="md" style={{paddingBottom: '100px'}}>
                <Typography variant="body3" align="left">
                Thanks for stopping by! FooDecisive is a user-centric platform that was designed to give users the best experience possible in helping them
                choose where to eat! Check out all the services we offer below!
                </Typography>
                {!logged ? 
                <Container maxWidth="md" align="center" style={{paddingTop: '50px'}}>
                <Button variant="contained" style={{backgroundColor: "Orange", marginRight: '5%'}} onClick={() => {history.push('/login')}}>
                    Log in
                </Button>
                <Button variant="contained" onClick={() => {history.push('/register')}}>Sign Up</Button>
                </Container> :
                <div></div>
                }
            </Container> 
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Zoom>
              <Container maxWidth="md">
              <Typography variant="h4" gutterBottom>
                Quick search for restautants
                </Typography>
                <Typography variant="body1" paragraph="True" gutterBottom>
                Search for any restaurant filtered by best match, high rated, or most reviewed! Effectively provides top 20 search results in a specified location or from users' current location.
                </Typography>
                <Button variant="outlined" color="primary" onClick={() => {history.push('/search')}}>
                Go to Search
                  </Button>
              </Container>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Bounce right>
            <Box boxShadow={4}>
              <CardMedia
              
                className={classes.media}
                component='img'
                height='400'
                image = {SearchImage}
              /></Box>
              </Bounce>
            </Grid>

          </Grid>
        </Container>
        
        <Container maxWidth="lg" className={classes.Feature}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Bounce left>
            <Box boxShadow={4}>
            <CardMedia
                className={classes.media}
                component='img'
                height='360'
                image= {Chatbot}
              /></Box>
              </Bounce>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Zoom>
              <Container maxWidth="md">
              <Typography variant="h4" gutterBottom>
                Talk to Jesse, our Chatbot!
                </Typography>
                <Typography variant="body1" paragraph="True" gutterBottom>
                Jesse is our conversational chatbot to increase interactivity with the users. You no longer have to make your restaurant choices alone! Jesse
                can help you find restaurants in the local area and respond to your preferences! You may even get a meme response every now and then! Sign up now to 
                talk to Jesse!
                </Typography>
                {logged ? 
                <Button variant="outlined" color="primary">
                Talk to Jesse
                  </Button> :
                  <div></div>
                }
              </Container>
              </Zoom>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg" className={classes.Feature} >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Zoom>
              <Container maxWidth="md">
              <Typography variant="h4" gutterBottom>
                Rate and Favorite
                </Typography>
                <Typography variant="body1" paragraph="True" gutterBottom>
                Our platform allows you to rate and review your favorite restaurants on scale 1 to 5 and can save your favorites for later access. 
                Additionally, a Google Map is embedded into the UI to provide for a seamless experience for the user to navigate to restaurants! The ratings mechanism
                  plays an enormous role in determining user likings, so make sure to tell us about your experiences at restaurants by rating them! Sign up now to start rating!
                </Typography>
              </Container>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Bounce right>
            <Box boxShadow={4}>
              <CardMedia
              
                className={classes.media}
                component='img'
                height='500'
                image = {RateImage}
              /></Box>
              </Bounce>
            </Grid>

          </Grid>
        </Container>


        <Container maxWidth="lg" className={classes.Feature}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Bounce left>
            <Box boxShadow={4}>
            <CardMedia
                className={classes.media}
                component='img'
                height='350'
                //image= {searchImage}
              /></Box>
              </Bounce>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Zoom>
              <Container maxWidth="md">
              <Typography variant="h4" gutterBottom>
                Personalized Recommendations
                </Typography>
                <Typography variant='body1' paragraph='True' gutterBottom>
                  Utilize our Collaborative Filtering based recommendation engine to get personalized restaurant recommendations! We 
                  use the holistic taste preferences of similar users to recommend the top 10 best restaurants for the user. Sign up now to 
                  get recommendations personalized to you!
                </Typography>
                {logged ? 
                <Button variant="outlined" color="primary">
                Get your recommendations
                </Button> :
                <div></div>
                }
              </Container>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
        <Box bgcolor="text.secondary" boxShadow={4}>
        <Typography variant="body1" align="center" color="white" component="h2">
          Capstone 2021: Created by Team 4
        </Typography>
        
        </Box>
    
      </div>
      </Fade>
    );
}
