import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import {
  Inventory,
  Search,
  Detail,
  Trades,
  TradeDetail,
  Layout,
  Callback,
  Home
} from './components';

import './style.css'

const App = () => (
  <BrowserRouter>
    <Route path="/" component={ Layout }/>
  </BrowserRouter>
)

export default App;
