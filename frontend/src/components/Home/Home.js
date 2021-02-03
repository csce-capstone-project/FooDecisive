import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { BigSearchBar } from '../BigSearchBar/BigSearchBar'
import { Typography, Paper, Grid } from '@material-ui/core';

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

export function Home() {
    const classes = useStyles();
    const [currentMessage, setMessage] = useState(0);

    // Basically like the old componentDidMount method. Like a constructor.
    useEffect(() => {
        fetch('/test').then(res => res.json()).then(data => {
          setMessage(data.message);
        });
      }, []);

    return(
        <div className="App" src="../../restaurant.jpg">
            <header className="App-header">
                <p>{currentMessage}</p>
            </header>
            <Typography variant="h2" align="center" gutterBottom>
              Welcome to FooDecisive!
            </Typography>
            <BigSearchBar/>
            <Paper className={classes.about}>
                <Grid container>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant='h6' display='inline-block' align='right' gutterBottom>
                                    Have trouble deciding?
                                </Typography>
                                <Typography variant='body1' paragraph='True' gutterBottom>
                                    "Where to eat?" seems to a big question that we can easily get caught up in. FooDecisive looks to answer that question almost instantly.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={classes.content}>
                <Grid container>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant='h6' display='inline-block' style={ {color:'white'} } gutterBottom>
                                    Services
                                </Typography>
                                <Typography variant='body1' paragraph='True' style={ {color:'white'} } gutterBottom>
                                    <ul>
                                        <li>Search system</li>
                                        <li>Saving of recommended lists</li>
                                        <li>Interaction with ChatBot</li>
                                    </ul>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
