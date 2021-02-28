import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { BigSearchBar } from '../BigSearchBar/BigSearchBar'
import { yelpREST } from '../../services/yelp';
import { List } from '../RestaurantDetail/List'


const useStyles = makeStyles((theme) => ({
    about: {
        padding: theme.spacing(3),
        margin: '50px auto 10px',
        maxWidth: '40%',
        background: 'cyan'
    },
    content: {
        padding: theme.spacing(4),
        margin: '30px auto 10px',
        maxWidth: '40%',
        background: 'darkorchid'
    }
}));



export function Search() {
    
    const [results, setResults] = useState([]);

    function searchYelp(term, location, sortBy) {
        yelpREST.search(term, location, sortBy).then(businesses => {
            console.log(businesses)
            setResults(businesses)
          })
        // yelpREST('business/search', { params : {
        //         term : term
        //     }
        // }).then(({ data }) => {
        //     console.log(data)
        //   })
    }

    

    const classes = useStyles();
    return(
        <div className="App" src="../../restaurant.jpg">
            <BigSearchBar searchYelp={searchYelp}/>
            <List businesses={results}/>
        </div>
    );
}