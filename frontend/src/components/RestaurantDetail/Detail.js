import React, { useState } from 'react';
import './Detail.css';
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
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Map from './map'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function Detail(props) {

  const [open, setOpen] = React.useState(false);
  const fullWidth = true;

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRate = () => {
    //
  }

  return (
    <div className='Business'>
      <Card height='100px'>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component='img'
            height='140'
            src={props.business.imageSrc}
          />
          <CardContent>
            <Typography gutterBottom variant="h2" component="h2">
              {props.business.name}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
              {props.business.address}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
              {props.business.city}, {props.business.state} {props.business.zipCode}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" >
            Rate
              </Button>
          <IconButton>
            <StarOutlineIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="business name"
        fullWidth={fullWidth}
        className='custom-modal-style'
      >
        <DialogTitle id="simple-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} >{props.business.name}</Box>
            <Box>
              <Button size="small" color="primary" >
                Rate
                  </Button>
              <IconButton>
                <StarOutlineIcon />
              </IconButton>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="body2" component="p" className={classes.text}>
                  {props.business.address}, {props.business.city}, {props.business.state} {props.business.zipCode}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <DialogContentText>
                  Average rating: {props.business.rating}/5
                  </DialogContentText>
                <DialogContentText>
                  Genre: {props.business.category}
                </DialogContentText>
              </Grid>
              <Grid item xs={6} justify-content='center'><img src={props.business.imageSrc} height='200px' /></Grid>
              <Grid item xs={12}>
                <Map
                  id="myMap"
                  options={{
                    center: { lat: parseFloat(props.business.latitude), lng: parseFloat(props.business.longitude) },
                    zoom: 14
                  }}
                  onMapLoad={map => {
                    var lat = parseFloat(props.business.latitude);
                    var long = parseFloat(props.business.longitude);
                    var marker = new window.google.maps.Marker({
                      position: { lat: lat, lng: long },
                      map: map,
                      title: 'Restaurant here',
                      setContent: 'Restaurant here'
                    });
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    // <div className="Business">
    //   <div className="image-container">
    //     <img src={props.business.imageSrc} alt=''/>
    //   </div>
    //   <h2>{props.business.name}</h2>
    //   <div className="Business-information">
    //     <div className="Business-address">
    //       <p>{props.business.address}</p>
    //       <p>{props.business.city}</p>
    //       <p>{props.business.state} {props.business.zipCode}</p>
    //     </div>
    //     <div className="Business-reviews">
    //       <h3>{props.business.category.toUpperCase()}</h3>
    //       <h3 className="rating">{props.business.rating} stars</h3>
    //       <p>{props.business.reviewCount} reviews</p>
    //     </div>
    //   </div>
    // </div>
  );
}

