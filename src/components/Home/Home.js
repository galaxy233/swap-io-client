import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Col, Row, Jumbotron, Button, Thumbnail, Image } from 'react-bootstrap';
import zipcodes from 'zipcodes';
import { fetchFeaturedItems } from '../../services/item';
import { getImageResized } from '../../services/image';
import { getZipcode } from '../../services/user';
import Header from '../shared/Header';
import Loader from '../shared/Loader';
import find from '../../assets/find.png';
import bball from '../../assets/bball.png';
import swap from '../../assets/swap.png';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      zipcode: localStorage.getItem("zipcode"),
      query:'',
      search: false
    }
  }

  getFeaturedItems() {
    fetchFeaturedItems(this.state.zipcode)
    .then(items => {
      this.setState({items})
    })
  }

  componentDidMount() {
    if (this.state.zipcode) {
      this.getFeaturedItems()
    } else {
      getZipcode.then(zipcode => {
        this.setState({zipcode})
        this.getFeaturedItems()
      })
    }
  }

  render() {
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
              <Col lg={4} md={4} sm={4}>
                <LogoBox
                  image_url={find}
                  text="SEARCH"
                  text2="Find items nearby using our custom search"
                />
                <div className="seperator"></div>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <LogoBox
                  image_url={bball}
                  text="OFFER"
                  text2="Find items nearby using our custom search"
                />
                <div className="seperator"></div>
                </Col>
                <Col lg={4} md={4} sm={4}>
                <LogoBox
                  image_url={swap}
                  text="SWAP"
                  text2="Find items nearby using our custom search"
                />
                </Col>
            </Row>
          </Grid>
        </section>
        <section className="featured">
          <Grid>
              {
                this.state.zipcode
                ?
                <div>
                  <h1>Featured items near { zipcodes.lookup(this.state.zipcode).city }</h1>
                  <FeaturedItems items={ this.state.items }/>
                </div>
                :
                <div>
                  <h1>Finding items nearby...</h1>
                  <Loader/>
                </div>
              }
          </Grid>
        </section>
        <section className="landing-search">
          <div className="container-fluid">
            <div className="landing-search-intro">
              <h2>What are you looking for?</h2>
            </div>
            <div className="landing-search-box">
              <input type="text" onChange={ (e) => this.setState({query:e.target.value}) }/>
              <Button onClick={ () => this.setState({search:true}) } bsStyle="primary">Search</Button>
              { this.state.search &&
                <Redirect to={`/search/${this.state.query}`}/> }
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const FeaturedItems = ({ items }) => (
  <Row>
    { items.map(item => <FeaturedItem item={ item } />) }
  </Row>
)

const FeaturedItem = ({ item }) => {
  return (
    <Col lg={4} md={4} sm={4}>
      <div className="featured-item">
        <div style={
          {
            backgroundImage: `url('${getImageResized(400,400,item.image1)}')`,
            backgroundPosition: 'center'
          }
        }>
        </div>
        <div>
          <h2>{ item.name }</h2>
          <h5>{ item.zipcode }</h5>
        </div>
      </div>
    </Col>
  )
}

const LogoBox = ({ image_url, text, text2 }) => (
  <div className="logo-box">
      <img src={ image_url }/>
      <div>{ text }</div>
      <p>{ text2 }</p>
  </div>
)

export default Home;
