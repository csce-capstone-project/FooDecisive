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
               <Box bgcolor="success.main" boxShadow={4}>
                <Typography variant="h2" align="center" gutterBottom>
                Welcome to FooDecisive {username}!
                </Typography>
                <Typography variant="h4" align="center" gutterBottom>
                About FooDecisive
                </Typography>
                <Container maxWidth="md">
                <Typography variant="body3" align="left" >
                Effectively provide list of restaurants to users based on their preferences​. Improved recommender system to consider additional preferences​. Complemented with map containing pinned restaurants​. Give users the option to view and save multiple lists​. Requires authentication​. Interactive website
                </Typography>
                </Container>
                </Box> :
                
                <Box bgcolor="success.main" boxShadow={4}>
                <Typography variant="h2" align="center" gutterBottom>
                Welcome to FooDecisive {username}!
                </Typography>
                <Typography variant="h4" align="center" gutterBottom>
                About FooDecisive
                </Typography>
                <Container maxWidth="md">
                <Typography variant="body3" align="left" >
                Effectively provide list of restaurants to users based on their preferences​. Improved recommender system to consider additional preferences​. Complemented with map containing pinned restaurants​. Give users the option to view and save multiple lists​. Requires authentication​. Interactive website
                </Typography>
                
                </Container>
                <Container maxWidth="md" align="right">
                <Button variant="contained" color="primary">
                    Log in
                </Button>
                <Button variant="contained">Sign Up</Button>
                </Container>
                </Box> 
            }

        <Container maxWidth="lg" className={classes.Feature} >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Zoom>
              <Container maxWidth="md">
              <Typography variant="h4" gutterBottom>
                Quick search for restautants
                </Typography>
                <Typography variant="body1" paragraph="True" gutterBottom>
                Yelp Fusion API.
                Search for best match, high rated, Most reviewed restaurant in your areas.Effectively provide list of restaurants to users based on their preferences. 
                </Typography>
                <Button variant="outlined" color="primary">
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
                Talks to our Chat bot - Jessie
                </Typography>
                <Typography variant="body1" paragraph="True" gutterBottom>
                Conversational chatbot to ​increase interactivity​ using Wit AI (https://wit.ai/)​.Example query: "Show me ​restaurants in Arkansas"​. Intent: search​. Parameters​. Search query: restaurants​. Location: Arkansas
                </Typography>
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
                Rate and save your favorite restaurant
                </Typography>
                <Typography variant="body1" paragraph="True" gutterBottom>
                Our platform help you rate, review your favorite restaurant on scale 1 to 5 and help you save your favorite for later access. 
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
                Machines learning recommender systems
                </Typography>
                <Typography variant='body1' paragraph='True' gutterBottom>
                                    <ul>
                                        <li>Collaborative Filtering using Distributive Computing</li>
                                        <li>Will utilize Databricks and Apache Spark (Connect via JDBC)​</li>
                                        <li>Matrix Factorization Algorithm </li>
                                        <ul>
                                          <li>W = XY where X is user matrix and Y is ratings matrix​ </li>
                                          <li>Using user ratings for restaurants </li>
                                          <li>Alternating Least Squares (ALS)</li>
                                          <li>Model will predict user ratings for restaurants </li>
                                        </ul>
                                        <li>Commit recommendations to DB with user id (via JDBC)​</li>
                                    </ul>
                                </Typography>
              </Container>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
        <Box bgcolor="text.secondary" boxShadow={4}>
        <Typography variant="body1" align="center" color="white" component="h2">
          Made by team 4
        </Typography>
        
        </Box>
    
      </div>
      </Fade>
    );
}
