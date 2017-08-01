import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../shared/Header/Header';
import DashboardList from '../shared/DashboardList/DashboardList';
import InventoryDetail from './InventoryDetail/InventoryDetail';
import { fetchItems } from '../../../../ducks/actions';
import { connect } from 'react-redux';

class Inventory extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <Grid fluid style={{"padding": "0px"}}>
        <Row className="show-grid">
          <Col lg={12}>
            <Header name="Inventory"/>
          </Col>

        </Row>
        <Row className="show-grid">
          <Col md={4} lg={4}>
            <DashboardList isFetching={ this.props.isFetching } items={ this.props.items }>
              <div className="dashboard-list-item">
                +
              </div>
            </DashboardList>
          </Col>
          {/* <Col md={8} lg={8}>
            <InventoryDetail selectedItem={ this.props.items[0] }/>
          </Col> */}
        </Row>
      </Grid>
    )
  }
}

export default connect(state => state, { fetchItems })(Inventory);
