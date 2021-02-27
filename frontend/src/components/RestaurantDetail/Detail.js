import React, {useState, useEffect} from 'react';
import './Detail.css';
import Card from '@material-ui/core/Card';
import { CardActionArea, DialogContent, Button } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
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
import {login, authFetch, useAuth, logout} from "../../services/authentication";
import Form from "react-bootstrap/Form";

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
    const [businessID, setBusinessID] = useState('')
    const [review, setReview] = useState('')
    const [rate, setRate] = useState('')

    const [open, setOpen] = React.useState(false);
    const [openRate, setOpenRate] = React.useState(false);
    const fullWidth = true;

    const [logged] = useAuth();
    const [username, setUser] = useState("");
    const [favorite, setFavorite] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setOpenRate(false);
    };

    const handleRate = () => {
      setOpen(false);
      setOpenRate(true);
    }

    const handleReviewChange = (e) => {
      setReview(e.target.value);
    }

    const handleRateChange = (e) => {
      setRate(e.target.value);
    }

    function validate(){
      return rate.length > 0 && review.length > 0 && review.length < 101;
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
    }, [])

    const onSubmitClick = (e) => {
      e.preventDefault();
      console.log("You pressed submit");
      console.log(`Rate: ${rate}`);
      console.log(`Review: ${review}`);
      setRate('');
      setReview('');

      console.log("You pressed login")

      let opts = {
        'rating': rate,
        'password': review
      }
      console.log(opts)
      fetch('/api/rate', {
        method: 'post',
        body: JSON.stringify(opts)
      }).then(r => console.log(r.json()))


      handleClose();
    }

    // const onFavoriteClick = (e) => {
    //   e.preventDefault();
    //   console.log('Added to favorites');
    //   let opts = {
    //     'business_id': props.business.id,
    //     'user_id': username
    //   }
    //   console.log(opts);
    //   fetch('/api/favorites', {
    //     method: 'post',
    //     body: JSON.stringify(opts)
    //   }).then(r => console.log(r.json()));
    // }

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
              {logged ?
              <div>
                <CardActions>
                <Button size="small" color="primary" onClick={handleRate}>
                  Rate
                </Button>
                <IconButton>
                  <StarOutlineIcon />
                </IconButton>
                </CardActions>
              </div>
              : <div></div>}
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
                {logged ? <div>
                  <Button size="small" color="primary" onClick={handleRate}>
                    Rate
                  </Button>
                  <IconButton>
                    <StarOutlineIcon />
                  </IconButton>
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                  </div> : 
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                }
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
                 <Grid item xs={6} justify-content='center'><img src={props.business.imageSrc} height='200px'/></Grid>
                 <Grid item xs={12}>(Google Maps API goes here)</Grid>
                </Grid>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openRate}
            onClose={handleClose}
            aria-labelledby="business name"
            fullWidth={fullWidth}
            className='custom-modal-style'
          >
            <DialogTitle id="simple-dialog-title">
            <Box display="flex" alignItems="center">
                <Box flexGrow={1} >{props.business.name}</Box>
                <Box>
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
                  <DialogContent>
                    <Form onSubmit={onSubmitClick}>
                      <Form.Group controlId="rate">
                        <Form.Label>Rate</Form.Label>
                        {['radio'].map((type) =>(
                          <div key={`inline-${type}`} className="mb-3">
                            <Form.Check inline value="1" label="1" type={type} name="radio" id={`inline-${type}-1`} onChange={handleRateChange} />
                            <Form.Check inline value="2" label="2" type={type} name="radio" id={`inline-${type}-2`} onChange={handleRateChange} />
                            <Form.Check inline value="3" label="3" type={type} name="radio" id={`inline-${type}-3`} onChange={handleRateChange} />
                            <Form.Check inline value="4" label="4" type={type} name="radio" id={`inline-${type}-4`} onChange={handleRateChange} />
                            <Form.Check inline value="5" label="5" type={type} name="radio" id={`inline-${type}-5`} onChange={handleRateChange} />
                          </div>
                        ))}
                      </Form.Group>
                      <Form.Group controlId="review">
                        <Form.Label>Review</Form.Label>
                        <Form.Control autoFocus type="text" placeholder="Review (100 characters)" value={review} onChange={handleReviewChange} />
                      </Form.Group>
                      <Button type="submit" disabled={!validate()}>
                        Submit
                      </Button>
                    </Form>
                  </DialogContent>
                 </Grid>
                 <Grid item xs={6} justify-content='center'><img src={props.business.imageSrc} height='200px'/></Grid>
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
