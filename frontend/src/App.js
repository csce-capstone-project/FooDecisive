import React, { useState }from 'react'
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from 'react-router-dom'
import { Home } from './components/Home/Home'
import { HomeNavBar } from './components/NavBar/NavBar'
import { Login } from './components/Login/Login'
import { Search } from './components/BigSearchBar/Search'
import { Register } from './components/Register/Register'
import { Chat } from './components/Chat/Chat'
import { RestaurantContainer } from './components/RestaurantContainer/RestaurantContainer'
import { Favorites } from './components/Favorites/Favorites'
import { Recs } from './components/Recommendations/Recs'
import { useLocation } from "./Hooks/useLocation";
import Context from "./Context";
import { Profile } from './components/Profile/Profile'
// import {Transition, CSSTransition, TransitionGroup} from 'react-transition-group'
// import { play, exit } from './timelines'
// import { Container, Navbar, Nav } from 'react-bootstrap'
export const UsernameContext = React.createContext('');


export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const userLocation = useLocation();

  return (
    <Router>
      <div className="full-container">
        <HomeNavBar />
            <Route render={({location}) => (
                <Switch location={location}>
                <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/favs">
                    <Favorites />
                  </Route>
                  <Route path="/search">
                    <Search />
                  </Route>
                  <Route path="/recs">
                    <Recs />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/register">
                    <Register/>
                  </Route>
                  <Route path ="/ChatBot">
                    <Context.Provider value={{ userLocation, restaurants, setRestaurants }}>
                      <div className="app">
                      <Chat />
                      </div>
                    </Context.Provider>
                  </Route>
                  <Route path="/businessid">
                  </Route>
                </Switch>
            )} 
            />
      </div>
    </Router>
  );
}


// Turn App into class (state-based implementation?)

// export default App;
