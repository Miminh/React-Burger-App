import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../order-instance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onOrderLoad(this.props.token, this.props.userId);
  }

  render() {
    let orders = this.props.orders.map((order) => (
      <Order
        ingredients={order.ingredients}
        price={order.price}
        key={order.id}
      />
    ));
    if (!orders) {
      return (
        <div style={{ margin: "auto" }}>
          <h1> No Orders Yet</h1>
        </div>
      );
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderLoad: (token, userId) => {
      dispatch(actions.loadOrder(token, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
