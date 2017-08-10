import React from 'react';
import { Grid, Col, Row, Jumbotron, Button } from 'react-bootstrap';
import Header from '../shared/Header';
import find from '../../assets/find.png';
import bball from '../../assets/bball.png';
import swap from '../../assets/swap.png';
import './style.css';

const Home = () => {
  return (
    <div>
      <section className="landing-intro">
        <Grid fluid>
          <Row>
            <Jumbotron>
              <div>
                <h1>Welcome to Swap.IO</h1>
                <p>Trade, swap, barter...this is the place.</p>
                <p><Button bsStyle="primary">Get started</Button></p>
              </div>
            </Jumbotron>
          </Row>
          <Row className="grid-divider">
            <Col lg={4}>
              <LogoBox
                image_url={find}
                text="SEARCH"
              />
              <div className="seperator"></div>
            </Col>
            <Col lg={4}>
              <LogoBox
                image_url={bball}
                text="OFFER"
              />
              <div className="seperator"></div>
              </Col>
              <Col lg={4}>
              <LogoBox
                image_url={swap}
                text="SWAP"
              />
              </Col>
          </Row>
        </Grid>
      </section>
      <section className="featured">
        <Grid>
          <Row>
            <Header name="Featured Items"/>
          </Row>
          <Row>
            <Col lg={4}>
              <FeaturedItem/>
            </Col>
            <Col lg={4}>
              <FeaturedItem/>
            </Col>
            <Col lg={4}>
              <FeaturedItem/>
            </Col>
          </Row>
        </Grid>
      </section>
      <section className="landing-search">
        <div className="container-fluid">
          <div className="landing-search-intro">
            <h2>What are you looking for?</h2>
          </div>
          <div className="landing-search-box">
            <input type="text"/>
            <Button bsStyle="primary">Search</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const FeaturedItem = () => (
  <div className="featured-item">

  </div>
)

const LogoBox = ({ image_url, text }) => (
  <div className="logo-box">
      <img src={ image_url }/>
      <div>{ text }</div>
  </div>
)

export default Home;
