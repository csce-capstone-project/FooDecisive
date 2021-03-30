import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {authFetch} from "../../services/authentication";
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import { yelpBusID } from '../../services/yelp';
import {FavoritesList} from './FavoritesList';
import Typography from '@material-ui/core/Typography';

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
    const abortController = new AbortController()
    const signal = abortController.signal

    authFetch("/api/get_favorites", { signal: signal }).then(res => {
        return res.json()
    }).then(res => {
        console.log(res['businesses'])
        let businesses = res['businesses']
        
        if (businesses !== undefined) {
          let bus = []   
          for(let i = 0; i < businesses.length; i++) {
            bus.push(yelpBusID.searchByID(businesses[i][0]))
          }  

          Promise.all(bus).then((res) => {
            return res
          }).then((business) => {
            setResults(business)
          })
        }

    })


    return function cleanup() {
      abortController.abort()
    }

  }, [])

  return(
    <div>
      {results.length != 0  ? <FavoritesList businesses={results} />
      : <Typography gutterBottom variant="body2" component="p">No favorites found.</Typography>}
    </div>
  );
    
}
      