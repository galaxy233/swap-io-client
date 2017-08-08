import React, { Component } from 'react';
import { Grid, Col, Row, Alert } from 'react-bootstrap';
import { Header } from '../shared';
import { fetchTrade, acceptTrade, cancelTrade, completeTrade } from '../../services/trade';
import { fetchItem } from '../../services/item';
import swap from '../../assets/swap.png';

class TradeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trade: {},
      trading: null,
      receiving: null
    }
    this.acceptTrade = this.acceptTrade.bind(this)
    this.cancelTrade = this.cancelTrade.bind(this)
    this.completeTrade = this.completeTrade.bind(this)
  }

  componentDidMount() {
    fetchTrade(this.props.match.params.id)
    .then(trade => {
      Promise.all([fetchItem(trade.trading),fetchItem(trade.receiving)])
      .then(items => {
        this.setState({
          trade: trade,
          trading: items[0],
          receiving: items[1]
        })
      })
    })
  }

  acceptTrade() {
    acceptTrade(this.props.match.params.id)
    .then(trade => this.setState({trade}));
  }

  cancelTrade() {
    cancelTrade(this.props.match.params.id)
    .then(trade => this.setState({trade}));
  }

  completeTrade() {
    completeTrade(this.props.match.params.id)
    .then(trade => this.setState({trade}));
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Header name="Trades"/>
        </Row>
        <Row>
          {
            this.state.trade.id &&
            <TradeDetailBox
              trade={this.state.trade}
              trading={this.state.trading}
              receiving={this.state.receiving}
              acceptTrade={this.acceptTrade}
              cancelTrade={this.cancelTrade}
              completeTrade={this.completeTrade}
            />
          }
        </Row>
      </Grid>
    )
  }
}

const TradeDetailBox = ({ trade, trading, receiving, acceptTrade, cancelTrade, completeTrade }) => {
  return (
    <div className="trade-detail-box">
      <TradeDisplay
        trading={trading}
        receiving={receiving}
      />
      <TradeOptions
        trade={trade}
        acceptTrade={acceptTrade}
        cancelTrade={cancelTrade}
        completeTrade={completeTrade}
      />
    </div>
  )
}

const TradeDisplay = ({ trading, receiving }) => {
  return (
    <div className="trade-display">
      <TradeImage image_url={ trading.image1 }/>
      <div>
        <img src={ swap }/>
      </div>
      <TradeImage image_url={ receiving.image1 }/>
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

// Trade options component will have different options depending on the state
// of the trade.

const TradeOptions = ({ trade, acceptTrade, cancelTrade, completeTrade }) => {
  return (
    <div>
      {
        trade.status === 'pending'
        ?
        <Pending
          user_init={trade.user_init}
          acceptTrade={acceptTrade}
          cancelTrade={cancelTrade}
        />
        :
        trade.status === 'accepted'
        ?
        <Accepted
          user_complete={trade.user_complete}
          cancelTrade={cancelTrade}
          completeTrade={completeTrade}
        />
        :
        trade.status === 'complete'
        ?
        <Alert bsStyle="success">
          Trade completed!
        </Alert>
        :
        trade.status === 'cancelled'
        ?
        <Alert bsStyle="danger">
          Trade cancelled.
        </Alert>
        :
        null
      }
    </div>
  )
}

const Pending = ({ user_init, acceptTrade, cancelTrade }) => {
    return (
      <div>
        <Alert bsStyle="warning">
          <strong>Pending</strong>
          {
            user_init
            ?
            " Waiting for other user to accept the trade."
            :
            " Please accept the trade to continue."
          }
        </Alert>
        <div className="trade-options">
          <div onClick={ cancelTrade } className="options-yellow">Cancel</div>
          { !user_init &&
            <div onClick={ () => acceptTrade() } className="options-green">Accept</div>
          }
        </div>
      </div>
    )
}

const Accepted = ({ user_complete, cancelTrade, completeTrade }) => {
  return (
    <div>
      <Alert bsStyle={ user_complete ? "success" : "warning" }>
        {
          user_complete
          ?
          " Waiting for other user to complete trade."
          :
          " Please complete the trade to continue."
        }
      </Alert>
      <div className="trade-options">
        <div onClick={ cancelTrade } className="options-yellow">Cancel</div>
        { !user_complete &&
          <div onClick={ completeTrade } className="options-green">Complete</div>
        }
      </div>
    </div>
  )
}

export default TradeDetail;
