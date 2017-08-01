import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Display from './Display/Display';

import './Dashboard.css';

const sidebarContent = (
  <div>
    <h1>Dashboard</h1>
    <div>
      Inventory
    </div>
    <div>
      Trades
    </div>
    <div>
      Account
    </div>
  </div>
)

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="dashboard">
        <Sidebar sidebarContent={sidebarContent} />
        <Display />
      </div>
    )
  }
}

export default Dashboard;
