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

    const handleClose = () => {
        setOpenConfirm(false)
    }

    const handleOpenConfirm = () => {
        setOpenConfirm(true)
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
                    <IconButton>
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
            >
                <DialogTitle id='simple-dialog-title'>
                    <Typography>Are you sure about deleting this review?</Typography>
                </DialogTitle>
                <DialogContent>
                    <Button size='small' variant='contained' color='secondary' style={{'margin-right': '20px'}} onClick={onDelete}>YES</Button>
                    <Button size='small' variant='outlined' color='secondary' onClick={handleClose}>NO</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}