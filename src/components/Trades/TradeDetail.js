import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { Header } from '../shared';
import trade from './trade.json';
import item1 from './item1.json';
import item2 from './item2.json';
import swap from '../../assets/swap.png';

class TradeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Header name="Trades"/>
        </Row>
        <Row>
          {/* <Col lg={12}> */}
            <TradeDetailBox
              trade={trade}
              item1={item1}
              item2={item2}
            />
          {/* </Col> */}
        </Row>
      </Grid>
    )
  }
}

const TradeDetailBox = ({ trade, item1, item2 }) => {
  return (
    <div className="trade-detail-box">
      <TradeDisplay
        item1={item1}
        item2={item2}
      />
      <TradeOptions
        trade={trade}
      />
    </div>
  )
}

const TradeDisplay = ({ item1, item2 }) => {
  return (
    <div className="trade-display">
      <TradeImage image_url={ item1.image1 }/>
      <div>
        <img src={ swap }/>
      </div>
      <TradeImage image_url={ item2.image1 }/>
    </div>
  )
}

const TradeImage = ({ image_url }) => {
  return (
    <div className="trade-image">
      <img src={ image_url }/>
    </div>
  )
}

const TradeOptions = (props) => {
  return (
    <div className="trade-options">
      <div className="options-yellow"/>
      <div className="options-green"/>
    </div>
  )
}

export default TradeDetail;
