import React from 'react';
import { Route } from 'react-router-dom';

import Trades from './Trades/Trades';
import Inventory from './Inventory/Inventory';

import './Display.css';

const Display = () => {
  return (
    <div className="display">
      <Route path="/dashboard/inventory" component={ Inventory }/>
      <Route path="/dashboard/trades" component={ Trades }/>
    </div>
  )
}

export default Display;
