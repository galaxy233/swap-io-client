import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Callback from './components/Callback/Callback';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import NewItem from './components/Items/NewItem';
import Items from './components/Items/Items';

import Auth from './services/auth';

import './style.css'

const auth = new Auth();

const App = () => {
  return (
      <BrowserRouter>
        <div>
          <Route path="/" render={ (props) => <Navigation auth={ auth } {...props} /> } />
          <Route path="/home" component={ Home }/>
          <Route path="/callback" render={ (props) => <Callback auth={ auth } {...props} /> } />
          <Route path="/profile" component={ Profile } />
          <Route path="/items/new" component={ NewItem }/>
          <Route exact path="/items" component={ Items }/>
        </div>
      </BrowserRouter>
      )
}

export default App;
