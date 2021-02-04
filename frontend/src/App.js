import React, { useState } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { HomeNavBar } from './components/NavBar/NavBar'
import {NavBarLoggedIn} from './components/NavBar/NavBarLoggedIn'
import { Rate } from './components/Rate/Rate'
import { Register } from './components/Register/Register'
import { Login } from './components/Login/Login'
export const UsernameContext = React.createContext('');



function App() {
  const [username, setUsername] = useState(""); 


  // onUsernameChange = (username) => {
  //   setUsername(username)
  // }

  return (
    <BrowserRouter>
    <div>
    <HomeNavBar />
      <Switch>
      {/* {localStorage.getItem('all_users') ?
        <NavBarLoggedIn /> :
        <HomeNavBar />
      } */}
        <Route exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route path='/rate' component={Rate}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

// Turn App into class (state-based implementation?)

export default App;
