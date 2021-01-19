import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { HomeNavBar } from './components/NavBar/NavBar'
import { Rate } from './components/Rate/Rate'

function App() {
  return (
    <BrowserRouter>
    <div>
      <HomeNavBar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/rate' component={Rate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

// Turn App into class (state-based implementation?)

export default App;
