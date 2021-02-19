import React, {useState} from 'react';
import './Detail.css';
import Card from '@material-ui/core/Card';
import { CardActionArea } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";


export function Detail(props) {
    const [businessID, setBusinessID] = useState('')

    return (
        <div className='Business'>
          <Link className='link' to="/">
            <Card>
              <CardActionArea>
                <CardMedia 
                  className='media'
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
                    {props.business.city}, {props.business.state}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
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

