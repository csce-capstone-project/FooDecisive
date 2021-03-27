import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {authFetch} from "../../services/authentication";
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import { yelpBusID } from '../../services/yelp';
import {RecsList} from './RecsList';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    padding: '10px',
    margin: 'auto'
  },
  text: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export function Recs() {
  const [results, setResults] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    authFetch("/api/recs", { signal: signal }).then(res => {
        return res.json()
    }).then(res => {
        console.log(res['recs'])
        let businesses = res['recs']
        
        if (businesses !== undefined) {
          let bus = []   
          for(let i = 4; i < 7; i++) {
            bus.push(yelpBusID.searchByID(businesses[i]))
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
      {results.length != 0  ? <RecsList businesses={results} />
      : <Container style={{margin: '0', position: 'absolute', top: '50%', left: '50%'}}>
        <CircularProgress style={{color: 'orange'}}/>
        </Container>}
    </div>
  );
    
}
      