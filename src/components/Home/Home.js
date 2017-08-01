import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import './style.css'

const Home = () => {
  return (
    <div>
      <Sidebar/>
      <Jumbotron>
        <div>
          <h1>Welcome to Swap.IO</h1>
          <p>Trade, swap, barter...this is the place.</p>
          <p><Button bsStyle="primary">Get started</Button></p>
        </div>
      </Jumbotron>
    </div>
  )
}

export default Home;