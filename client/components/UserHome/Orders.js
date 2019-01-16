import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/order';
import Order from './order';

const Orders = ({ orders, status }) => {
  let filteredOrders;

  if (status !== 'all') {
    filteredOrders = orders.filter(order => order.status === this.props.status);
  } else {
    filteredOrders = orders;
  }

  return (
    <div>
      <h4>Orders</h4>

      {filteredOrders.length === 0 && <div>You have no orders...</div>}

      {filteredOrders.map(order => (
        <Order order={order} key={order.id} />
      ))}
    </div>
  );
};

const mapState = state => {
  return {
    orders: state.orders,
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(
  mapState,
  mapDispatch
)(Orders);
