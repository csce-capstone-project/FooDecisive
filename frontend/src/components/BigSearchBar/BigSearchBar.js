import React, {useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';

import './BigSearchBar.css';



const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);


export function BigSearchBar(props) {


    const [term, setTerm] = useState('')
    const [location, setLocation] = useState('')
    const [sortBy, setSortBy] = useState('best_match')


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
      props.searchYelp(term, location, sortBy);
      e.preventDefault();
    }



  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map(sortByOption => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return (<li key={sortByOptionValue} className={getSortByClass(sortByOptionValue)}
        onClick={() => handleSortByChange(sortByOptionValue)}>{sortByOption}</li>);
      });
  }

    return (
      <div className="SearchBar">   
      <div className="SearchBar-sort-options">
      <WhiteTextTypography variant="h2" align="center" id="myElement" gutterBottom>
              Welcome to Search!
      </WhiteTextTypography>
        <ul>
            {renderSortByOptions()}
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

