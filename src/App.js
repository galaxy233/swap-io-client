import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Callback from './components/Callback/Callback';
import Home from './components/Home/Home';
import {Inventory, Search, Detail, Trades, TradeDetail} from './components';

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
          <Route path="/inventory" component={ Inventory }/>
          <Route path="/trades" component={ Trades }/>
          <Route path="/trade/:id" component={ TradeDetail }/>
          <Route path="/search" component={ Search }/>
          <Route path="/item/:id" component={ Detail }/>
        </div>
      </BrowserRouter>
      )
}

export default App;
