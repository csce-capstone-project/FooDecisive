import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { HomeNavBar } from './components/NavBar/NavBar'
import { Login } from './components/Login/Login'
import { Search } from './components/BigSearchBar/Search'
import { Register } from './components/Register/Register'
import { ChatBot } from './components/ChatBot/ChatBot'
import { Favorites } from './components/Favorites/Favorites'
export const UsernameContext = React.createContext('');



export default function App() {
  return (
    <Router>
      <div>
        <HomeNavBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/favs">
            <Favorites />
          </Route>
        <Route path="/search">
          <Search />
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
          <Route path ="/ChatBot">
            <ChatBot/>
          </Route>
          <Route path="/businessid">
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
