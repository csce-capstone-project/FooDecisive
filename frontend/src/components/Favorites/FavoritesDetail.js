import React, {useState, useEffect} from 'react';
import './FavoritesDetail.css';
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
import Map from '../RestaurantDetail/map'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function FavoritesDetail(props) {
    const [businessID, setBusinessID] = useState('')
    const [review, setReview] = useState('')
    const [rate, setRate] = useState('')

    const [open, setOpen] = React.useState(false);
    const [openRate, setOpenRate] = React.useState(false);
    const fullWidth = true;

    const [logged] = useAuth();
    const [username, setUser] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [initfavorite, setInitFavorite] = useState(false);

    const [selected, setSelected] = useState(false);

    const classes = useStyles();

    const handleOpen = (e) => {
      setOpen(true);
      console.log(props.business.id)
      setBusinessID(props.business.id)
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
        'businessid': props.business.id,
        'rating': rate,
        'review': review
      }
      console.log(opts)

      authFetch('/api/rate', {
        method: 'post',
        body: JSON.stringify(opts)
      }).then(r => r.json())
      .then(data => console.log(data))


      handleClose();
    }

    const onFavoriteClick = (e) => {
      e.preventDefault();
      if (favorite === false) {
        setFavorite(true)

        let opts = {
          'businessid': props.business.id,
          'addFavorite': 'add'
        }
        console.log(opts);

        authFetch('/api/favorites', {
          method: 'post',
          body: JSON.stringify(opts)
        }).then(r => r.json())
        .then(data => {
          // setFavorite(data.favorite)
          console.log("Added to favorites!")
        });
      }
      else {
        setFavorite(false)
        let opts = {
          'businessid': props.business.id,
          'addFavorite': 'delete'
        }
        console.log(opts);
        authFetch('/api/favorites', {
          method: 'post',
          body: JSON.stringify(opts)
        }).then(r => r.json())
        
        console.log('Deleted from favorites');
        window.location.reload();
      }  
    }

    // Check whether card is already a favorite
      useEffect(() => {
      authFetch(`/api/favorites?business_id=${props.business.id}`)
      .then(response => response.json())
      .then(data => setFavorite(data.favorite));
      }, [])


      return (
        <div className='Business'>
          <Card height='100px'>
            <CardActionArea onClick={(e) => handleOpen(e)}>
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
                <Button size="small" variant="contained" color="secondary" onClick={handleRate}>
                  Rate
                </Button>
                {!favorite ? <IconButton onClick={onFavoriteClick}>
                  <StarBorderIcon style={{ color: '#fdd835' }} />
                </IconButton>
                : <IconButton onClick={onFavoriteClick}>
                <StarIcon style={{ color: '#fdd835' }} />
                </IconButton>}
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
                  <Button size="small" variant="contained" color="secondary" onClick={handleRate}>
                    Rate
                  </Button>
                  {!favorite ? <IconButton onClick={onFavoriteClick}>
                    <StarBorderIcon style={{ color: '#fdd835' }} />
                  </IconButton>
                  : <IconButton onClick={onFavoriteClick}>
                  <StarIcon style={{ color: '#fdd835' }} />
                  </IconButton>}
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
                 <Grid item xs={6} justify-content='center'><img src={props.business.imageSrc} height='200px'/></Grid>
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
      );
  }
      

    // return (
    //     <div className='Business'>
    //       <Card height='100px'>
    //         <CardActionArea onClick={(e) => handleOpen(e)}>
    //           <CardMedia
    //             component='img'
    //             height='140'
    //             src={props.business.imageSrc}
    //           />
    //           <CardContent>
    //             <Typography gutterBottom variant="h2" component="h2">
    //               {props.business.name}
    //             </Typography>
    //             <Typography gutterBottom variant="body2" component="p">
    //               {props.business.address}
    //             </Typography>
    //             <Typography gutterBottom variant="body2" component="p">
    //               {props.business.city}, {props.business.state} {props.business.zipCode}
    //             </Typography>
    //           </CardContent>
    //         </CardActionArea>
    //           {logged ?
    //           <div>
    //             <CardActions>
    //             <Button size="small" color="secondary" onClick={handleRate}>
    //               Rate
    //             </Button>
    //             {!favorite ? <Button size="small" color='primary' onClick={handleFavorite}>
    //               Add Favorite
    //             </Button>
    //             : <Button size="small" color='primary' variant='outlined' onClick={handleFavorite}
    //             >Favorite
    //             </Button>}
    //             </CardActions>
    //           </div>
    //           : <div></div>}
    //       </Card>
    //       <Dialog
    //         open={open}
    //         onClose={handleClose}
    //         aria-labelledby="business name"
    //         fullWidth={fullWidth}
    //         className='custom-modal-style'
    //       >
    //         <DialogTitle id="simple-dialog-title">
    //         <Box display="flex" alignItems="center">
    //             <Box flexGrow={1} >{props.business.name}</Box>
    //             <Box>
    //             {logged ? <div>
    //               <Button size="small" color="primary" onClick={handleRate}>
    //                 Rate
    //               </Button>
    //               <IconButton>
    //                 <StarOutlineIcon />
    //               </IconButton>
    //               <IconButton onClick={handleClose}>
    //                 <CloseIcon />
    //               </IconButton>
    //               </div> : 
    //               <IconButton onClick={handleClose}>
    //                 <CloseIcon />
    //               </IconButton>
    //             }
    //             </Box>
    //         </Box>
    //         </DialogTitle>
    //         <DialogContent>
    //           <div className={classes.root}>
    //             <Grid container spacing={3}>
    //              <Grid item xs={12}>
    //               <Typography gutterBottom variant="body2" component="p" className={classes.text}>
    //                 {props.business.address}, {props.business.city}, {props.business.state} {props.business.zipCode}
    //               </Typography>
    //              </Grid>
    //              <Grid item xs={6}>
    //               <DialogContentText>
    //                 Average rating: {props.business.rating}/5
    //               </DialogContentText>
    //               <DialogContentText>
    //                 Genre: {props.business.category}
    //               </DialogContentText>
    //              </Grid>
    //              <Grid item xs={6} justify-content='center'><img src={props.business.imageSrc} height='200px'/></Grid>
    //              <Grid item xs={12}>(Google Maps API goes here)</Grid>
    //             </Grid>
    //           </div>
    //         </DialogContent>
    //       </Dialog>
    //       <Dialog
    //         open={openRate}
    //         onClose={handleClose}
    //         aria-labelledby="business name"
    //         fullWidth={fullWidth}
    //         className='custom-modal-style'
    //       >
    //         <DialogTitle id="simple-dialog-title">
    //         <Box display="flex" alignItems="center">
    //             <Box flexGrow={1} >{props.business.name}</Box>
    //             <Box>
    //               <IconButton onClick={handleClose}>
    //                 <CloseIcon />
    //               </IconButton>
    //             </Box>
    //         </Box>
    //         </DialogTitle>
    //         <DialogContent>
    //           <div className={classes.root}>
    //             <Grid container spacing={3}>
    //              <Grid item xs={12}>
    //               <Typography gutterBottom variant="body2" component="p" className={classes.text}>
    //                 {props.business.address}, {props.business.city}, {props.business.state} {props.business.zipCode}
    //               </Typography>
    //              </Grid>
    //              <Grid item xs={6}>
    //               <DialogContent>
    //                 <Form onSubmit={onSubmitClick}>
    //                   <Form.Group controlId="rate">
    //                     <Form.Label>Rate</Form.Label>
    //                     {['radio'].map((type) =>(
    //                       <div key={`inline-${type}`} className="mb-3">
    //                         <Form.Check inline value="1" label="1" type={type} name="radio" id={`inline-${type}-1`} onChange={handleRateChange} />
    //                         <Form.Check inline value="2" label="2" type={type} name="radio" id={`inline-${type}-2`} onChange={handleRateChange} />
    //                         <Form.Check inline value="3" label="3" type={type} name="radio" id={`inline-${type}-3`} onChange={handleRateChange} />
    //                         <Form.Check inline value="4" label="4" type={type} name="radio" id={`inline-${type}-4`} onChange={handleRateChange} />
    //                         <Form.Check inline value="5" label="5" type={type} name="radio" id={`inline-${type}-5`} onChange={handleRateChange} />
    //                       </div>
    //                     ))}
    //                   </Form.Group>
    //                   <Form.Group controlId="review">
    //                     <Form.Label>Review</Form.Label>
    //                     <Form.Control autoFocus type="text" placeholder="Review (100 characters)" value={review} onChange={handleReviewChange} />
    //                   </Form.Group>
    //                   <Button type="submit" disabled={!validate()}>
    //                     Submit
    //                   </Button>
    //                 </Form>
    //               </DialogContent>
    //              </Grid>
    //              <Grid item xs={6} justify-content='center'><img src={props.business.imageSrc} height='200px'/></Grid>
    //             </Grid>
    //           </div>
    //         </DialogContent>
    //       </Dialog>
    //     </div>
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
        // );
