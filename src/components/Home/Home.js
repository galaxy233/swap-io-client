import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './style.css'

const Home = () => {
  return (
    <Jumbotron>
      <div>
        <h1>Welcome to Swap.IO</h1>
        <p>Trade, swap, barter...this is the place.</p>
        <p><Button bsStyle="primary">Get started</Button></p>
      </div>
    </Jumbotron>
  )
}

export default Home;
