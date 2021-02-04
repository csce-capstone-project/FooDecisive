import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    margin: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export function BigSearchBar() {
  const classes = useStyles();
  const [entry, setEntry] = useState("");

  function validate(){
    return entry.length > 0;
  }

  function handleSubmit(){
    console.log(entry);
  }

  function onKeyUp(event) {
    if (event.charCode === 13) {
      this.setState({ inputValue: event.target.value });
    }
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Search restaurant"
        inputProps={{ 'aria-label': 'big-search' }}
        onKeyPress={onKeyUp}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" href='/search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
