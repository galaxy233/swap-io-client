import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import { Header } from '../shared';

import './Trades.css';

import { fetchTrades } from '../../services/trade';

import trades from './trades.json';

class Trades extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trades: [],
      filter: 'pending'
    }
    this.changeFilter = this.changeFilter.bind(this)
  }

  componentDidMount() {
    fetchTrades().then(trades => {
      this.setState({trades})
    })
  }

  changeFilter(val) {
    this.setState({
      filter: val
    })
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Header name="Trades"/>
        </Row>
        <Row className="show-grid">
          <Col lg={12}>
            { this.state.trades.length &&
              <TradesBox
                filter={ this.state.filter }
                trades={ this.state.trades }
                changeFilter={ this.changeFilter }
              />
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}

const TradesBox = (props) => {
  let trades = props.trades.filter(trade => trade.status === props.filter)
  return (
    <div className="trades-box">
      <TradesFilter
        filter={props.filter}
        changeFilter={props.changeFilter}
      />
      <TradesList
        trades={trades}
      />
    </div>
  )
}

const TradesFilter = (props) => {
  return (
    <div className="trades-filter">
      <div
        onClick={ () => props.changeFilter('pending') }
        className={ props.filter === 'pending' ? 'selected' : '' }>
        Pending
      </div>
      <div
        onClick={ () => props.changeFilter('accepted') }
        className={ props.filter === 'accepted' ? 'selected' : '' }>
        Accepted
      </div>
      <div
        onClick={ () => props.changeFilter('cancelled') }
        className={ props.filter === 'cancelled' ? 'selected' : '' }>
        Cancelled
      </div>
    </div>
  )
}

const TradesList = (props) => {
  const items = props.trades.map(trade => <TradesItem receiving_name={trade.receiving_name} other_username={trade.other_username} id={trade.id}/>)
  return (
    <div className="trades-list">
      { items }
    </div>
  )
}

const TradesItem = (props) => {
  return (
    <div className="trades-item">
      { `${props.receiving_name} (${props.other_username})` }
    </div>
  )
}

export default Trades;
