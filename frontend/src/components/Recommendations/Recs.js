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
import Fade from 'react-reveal/Fade';


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
      {results.length != 0  ? <Fade><Container><Typography variant="h2" align="center">
          Your generated Recommendations!
      </Typography><RecsList businesses={results} /></Container></Fade>
      : <Container style={{margin: '0 auto', position: 'absolute', top: '50%', left: '50%'}}>
        <CircularProgress style={{color: 'orange'}}/>
        </Container>}
    </div>
  );
    
}
      