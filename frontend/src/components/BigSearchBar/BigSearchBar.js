import React from 'react'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import './BigSearchBar.css';


export class BigSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword: ''};
  }

  handleChange(e) {
    this.setState({keyword: e.target.value});
    console.log(this.state.keyword);
  }

  render() {
    return (
        <Paper component="form" className='root'>
          <InputBase
            className='input'
            placeholder="Search restaurant"
            inputProps={{ 'aria-label': 'big-search' }}
            onChange={(e) => this.handleChange(e)}
          />
          <IconButton type="submit" className='iconButton' aria-label="search" href='/search'>
            <SearchIcon />
          </IconButton>
        </Paper>
    );
  }
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

