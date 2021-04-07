import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fade from 'react-reveal/Fade';

import './BigSearchBar.css';
import Map from '../RestaurantDetail/map'

require('dotenv').config()
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
const API_KEY = REACT_APP_GOOGLE_MAPS_API_KEY


const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);


const google = window.google;

export function BigSearchBar(props) {



  
  const [term, setTerm] = useState('')
  const [location, setLocation] = useState('')
  const [sortBy, setSortBy] = useState('best_match')
  //getCurrentLocation()
  

    // useEffect(() => {
    //   const myElement = document.querySelector('#myElement')
    //   init(myElement, { showCursor: false, strings: ['Welcome to Search!!', 'Yeah!' ] })
    // }, [])

    let sortByOptions = {
        'Best Match': 'best_match',
        'Highly Rated': 'rating',
        'Most Reviewed': 'review_count'
    }


  //Get user location
  const [lat, setLat] = useState('latitude')
  const [lng, setLng] = useState('longitude')
  //Get user location
  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + API_KEY)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE' + JSON.stringify(responseJson.results[0].formatted_address))

            setLocation(JSON.stringify(responseJson.results[0].formatted_address));
          })
          
      },

      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  };
  

  // let sortByOptions = {
  //   'Best Match': 'best_match',
  //   'Highly Rated': 'rating',
  //   'Most Reviewed': 'review_count'
  // }

  function getSortByClass(sortByOption) {
    if (sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  function handleSortByChange(sortByOption) {
    setSortBy(sortByOption)
  }

  function handleTermChange(e) {
    setTerm(e.target.value)
  }

  function handleLocationChange(e) {
    setLocation(e.target.value)
  }

  function handleSearch(e) {
    props.searchYelp(term, location, sortBy);
    e.preventDefault();
  }

    function validate() {
      return term.length > 0 && location.length > 0;
    }



  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (<li key={sortByOptionValue} className={getSortByClass(sortByOptionValue)}
        onClick={() => handleSortByChange(sortByOptionValue)}>{sortByOption}</li>);
    });
  }



  return (
    <Fade>
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <WhiteTextTypography variant="h2" align="center" id="myElement" gutterBottom>
          Welcome to Search!
      </WhiteTextTypography>
        <ul>
          {renderSortByOptions()}
        </ul>
        <div className="SearchBar-fields">
        <input placeholder="Find" onChange={handleTermChange} />
        <input placeholder="Near" value={location} onChange={handleLocationChange} />
      </div>
      <div className="SearchBar-submit">
        {/* <button style={{}} onClick={handleSearch} disabled={!validate()}>Search</button>
        <button onClick={getCurrentLocation}> Current location</button> */}
        <Button onClick={getCurrentLocation}>Set As Current location</Button> <br></br> <br></br>
        <Button color="primary" onClick={handleSearch} disabled={!validate()}>Search</Button>
      </div>
      </div>
    </div>
    </Fade>
  );
}

// export function BigSearchBar() {
//   const classes = useStyles();
//   const [entry, setEntry] = useState("");

//   function validate(){
//     return entry.length > 0;
//   }

//   function handleSubmit(){
//     console.log(entry);
//   }

//   function onKeyUp(event) {
//     if (event.charCode === 13) {
//       this.setState({ inputValue: event.target.value });
//     }
//   }

//   return (
//     <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
//       <InputBase
//         className={classes.input}
//         placeholder="Search restaurant"
//         inputProps={{ 'aria-label': 'big-search' }}
//         onKeyPress={onKeyUp}
//       />
//       <IconButton type="submit" className={classes.iconButton} aria-label="search" href='/search'>
//         <SearchIcon />
//       </IconButton>
//     </Paper>
//   );
// }

