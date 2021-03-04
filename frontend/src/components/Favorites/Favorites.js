import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import { CardActionArea, DialogContent, Button } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import DialogContentText from '@material-ui/core/DialogContentText';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {authFetch, useAuth} from "../../services/authentication";
import Form from "react-bootstrap/Form";
import AddIcon from '@material-ui/icons/Add';

import { yelpBusID } from '../../services/yelp';
import {FavoritesList} from './FavoritesList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export function Favorites() {
  const [results, setResults] = useState([]);


  useEffect(() => {
    authFetch("/api/get_favorites").then(res => {
        return res.json()
    }).then(res => {
        console.log(res['businesses'])
        let businesses = res['businesses']
        return businesses

    }).then((businesses) => {
      let bus = []   
      for(let i = 0; i < businesses.length; i++) {
        yelpBusID.searchByID(businesses[i][0]).then(business => {
          console.log(business)
          bus.push(business)
          setResults(bus)
          console.log(results)
        })
      }  
    })
  }, [])

  return(<FavoritesList businesses={results} />);
    
}
      