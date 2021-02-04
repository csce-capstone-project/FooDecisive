import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { HomeNavBar } from './components/NavBar/NavBar'
import { Rate } from './components/Rate/Rate'
import { Login } from './components/Login/Login'
import { Search } from './components/BigSearchBar/Search'
import { Register } from './components/Register/Register'

function App() {
  return (
    <BrowserRouter>
    <div>
      <HomeNavBar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route path='/rate' component={Rate}/>
        <Route path='/login' component={Login}/>
        <Route path='/search' component={Search}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

// Turn App into class (state-based implementation?)

export default App;
