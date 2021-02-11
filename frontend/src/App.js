import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { HomeNavBar } from './components/NavBar/NavBar'
import { Rate } from './components/Rate/Rate'
import { Register } from './components/Register/Register'
import { Login } from './components/Login/Login'
import {login, authFetch, useAuth, logout} from "./services/authentication"



// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const [logged] = useAuth();

//   return <Route {...rest} render={(props) => (
//     logged
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// }


export default function App() {
  return (
    <Router>
      <div>
        <HomeNavBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/search">
          
        </Route>
          <Route path="/recs">

          </Route>
          <Route path="/favs">

          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


// Turn App into class (state-based implementation?)

// export default App;
