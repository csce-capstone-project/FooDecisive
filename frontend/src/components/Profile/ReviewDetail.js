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
import Map from '../RestaurantDetail/map'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    text: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export function ReviewDetail(props) {

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [text, setText] = useState(props.review.text);
    const [rate, setRate] = useState(`${props.review.rating}`);
    const [rate1, setRate1] = useState(false);
    const [rate2, setRate2] = useState(false);
    const [rate3, setRate3] = useState(false);
    const [rate4, setRate4] = useState(false);
    const [rate5, setRate5] = useState(false);

    const classes = useStyles();

    const handleClose = () => {
        setOpenConfirm(false)
        setOpenEdit(false)
        setRate1(false);
        setRate2(false);
        setRate3(false);
        setRate4(false);
        setRate5(false);
    }

    const handleOpenConfirm = () => {
        setOpenConfirm(true)
    }

    const handleOpenEdit = () => {
        setOpenEdit(true);
        handleInitRate();
    }

    const onDelete = () => {
        let opts = {
            'review_id': props.review.review_id
        }
        console.log(opts)

        authFetch('/api/delete_review', {
            method: 'post',
            body: JSON.stringify(opts)
        }).then(r => r.json())
        .then(data => console.log(data))

        handleClose();
        window.location.reload()
    }

    const handleReviewChange = (e) => {
        setText(e.target.value);
      }
  
    const handleRateChange = (e) => {
        setRate(e.target.value);
        switch (e.target.value) {
            case '1':
                setRate1(true);
                setRate2(false);
                setRate3(false);
                setRate4(false);
                setRate5(false);
                break;
            case '2':
                setRate1(false);
                setRate2(true);
                setRate3(false);
                setRate4(false);
                setRate5(false);
                break;
            case '3':
                setRate1(false);
                setRate2(false);
                setRate3(true);
                setRate4(false);
                setRate5(false);
                break;
            case '4':
                setRate1(false);
                setRate2(false);
                setRate3(false);
                setRate4(true);
                setRate5(false);
                break;
            case '5':
                setRate1(false);
                setRate2(false);
                setRate3(false);
                setRate4(false);
                setRate5(true);
                break;
        }
    }

    const handleInitRate = () => {
        switch (props.review.rating) {
            case 1:
                setRate1(true);
                break;
            case 2:
                setRate2(true);
                break;
            case 3:
                setRate3(true);
                break;
            case 4:
                setRate4(true);
                break;
            case 5:
                setRate5(true);
                break;
        }
    }

    const validate = () => {
        return rate.length > 0 && text.length > 0 && text.length < 101 && !(props.review.rating == rate && props.review.text == text);
    }

    const onEdit = (e) => {
        e.preventDefault();
        let opts = {
            'review_id': props.review.review_id,
            'rating': rate,
            'review': text
        }

        authFetch('/api/edit_review', {
            method: 'post',
            body: JSON.stringify(opts)
        }).then(r => r.json())
        .then(data => console.log(data))

        handleClose();
        window.location.reload()
    }

    const fullWidth = true;

    return (
        <div>
            <Grid container style={{ 'padding-top': '10px', 'padding-bottom': '10px'}} border={1}>
                <Grid item xs={11}>
                    <Typography variant='h5' display="inline">{props.review.business_name}</Typography>
                    <br></br>
                    <Rating name="read-only" value={props.review.rating} readOnly />
                    <br></br>
                    <Typography variant='p' display="inline">"{props.review.text}"</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={handleOpenEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleOpenConfirm}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="business name"
                fullWidth={fullWidth}
                className='custom-modal-style'
                disableBackdropClick
            >
                <DialogTitle id='simple-dialog-title'>
                    <Typography>Are you sure about deleting this review?</Typography>
                </DialogTitle>
                <DialogContent>
                    <Button size='small' variant='contained' color='secondary' style={{'margin-right': '20px'}} onClick={onDelete}>YES</Button>
                    <Button size='small' variant='outlined' color='secondary' onClick={handleClose}>NO</Button>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openEdit}
                onClose={handleClose}
                aria-labelledby='review name'
                fullWidth={fullWidth}
                className='custom-modal-style'
                disableBackdropClick
            >
                <DialogTitle id="simple-dialog-title">
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1} >{props.review.business_name}</Box>
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
                        {props.review.address}, {props.review.city}, {props.review.state} {props.review.zipCode}
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <DialogContent>
                        <Form onSubmit={onEdit}>
                        <Form.Group controlId="rate">
                            <Form.Label>Rate</Form.Label>
                            {['radio'].map((type) =>(
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline value="1" label="1" type={type} name="radio" id={`inline-${type}-1`} onChange={handleRateChange} checked={rate1} />
                                <Form.Check inline value="2" label="2" type={type} name="radio" id={`inline-${type}-2`} onChange={handleRateChange} checked={rate2} />
                                <Form.Check inline value="3" label="3" type={type} name="radio" id={`inline-${type}-3`} onChange={handleRateChange} checked={rate3} />
                                <Form.Check inline value="4" label="4" type={type} name="radio" id={`inline-${type}-4`} onChange={handleRateChange} checked={rate4} />
                                <Form.Check inline value="5" label="5" type={type} name="radio" id={`inline-${type}-5`} onChange={handleRateChange} checked={rate5} />
                            </div>
                            ))}
                        </Form.Group>
                        <Form.Group controlId="review">
                            <Form.Label>Review</Form.Label>
                            <Form.Control autoFocus type="text" placeholder="Review (100 characters)" value={text} onChange={handleReviewChange} />
                        </Form.Group>
                        <Button type="submit" disabled={!validate()}>
                            Submit
                        </Button>
                        </Form>
                    </DialogContent>
                    </Grid>
                    <Grid item xs={6} justify-content='center'><img src={props.review.imageSrc} height='200px'/></Grid>
                    </Grid>
                </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}