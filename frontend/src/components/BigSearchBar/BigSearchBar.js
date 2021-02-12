import React, {useState, useEffect} from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from '@material-ui/core';
import { UsernameContext } from '../../App';
import {login, authFetch, useAuth, logout} from "../../services/authentication"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { init } from 'ityped'

import './BigSearchBar.css';



const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);


export function BigSearchBar() {


    const [term, setTerm] = useState('')
    const [location, setLocation] = useState('')
    const [sortBy, setSortBy] = useState('best_match')
    // this.state = {
    //   term: '',
    //   location: '',
    //   sortBy: 'best_match'
    // };

    // this.handleSortByChange = this.handleSortByChange.bind(this);
    // this.handleTermChange = this.handleTermChange.bind(this);
    // this.handleLocationChange = this.handleLocationChange.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);

    useEffect(() => {
      const myElement = document.querySelector('#myElement')
      init(myElement, { showCursor: false, strings: ['Welcome to Search!!', 'Yeah!' ] })
    }, [])

    let sortByOptions = {
        'Best Match': 'best_match',
        'Highly Rated': 'rating',
        'Nearest': 'distance'
    }

    function getSortByClass(sortByOption) {
          if(sortBy === sortByOption) {
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
      this.props.searchYelp(term, location, sortBy);
      e.preventDefault();
    }



  // function renderSortByOptions() {
  //   return Object.keys(this.sortByOptions).map(sortByOption => {
  //       let sortByOptionValue = this.sortByOptions[sortByOption];
  //       return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)}
  //       onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
  //     });
  // }

    return (
      <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <WhiteTextTypography variant="h2" align="center" id="myElement" gutterBottom>
              
        </WhiteTextTypography>
        <ul>
          {/* {renderSortByOptions()} */}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Find" onChange={handleTermChange}/>
        <input placeholder="Near" onChange={handleLocationChange}/>
      </div>
      <div className="SearchBar-submit">
        <a onClick={handleSearch}>Search</a>
      </div>
      </div>
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

