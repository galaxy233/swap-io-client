import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Callback from './components/Callback/Callback';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

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
          <Route path="/dashboard" component={ Dashboard }/>
        </div>
      </BrowserRouter>
      )
}

export default App;