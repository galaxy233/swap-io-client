import Nav from '../Navigation/Navigation';
import { Route } from 'react-router-dom';
import React from 'react';

import {
  Inventory,
  Search,
  Detail,
  Trades,
  TradeDetail,
  Callback,
  Home
} from '../';

const Layout = (props) => (
  <div className="layout">
    <Nav history={props.history}/>
      <Route exact path="/" component={ Home }/>
      <Route path="/callback" component={ Callback }/>
      <Route path="/inventory" component={ Inventory }/>
      <Route path="/trades" component={ Trades }/>
      <Route path="/trade/:id" component={ TradeDetail }/>
      <Route exact path="/search" component={ Search }/>
      <Route path="/search/:query" component={ Search }/>
      <Route path="/item/:id" component={ Detail }/>
    <footer className="footer"></footer>
  </div>
)

export default Layout;
