import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { NavBar } from './components/NavBar/NavBar'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' component={Home}/>
        <Route path='/search'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
