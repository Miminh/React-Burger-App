import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutsummary';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    cancelbuttonHandler = () => {
        this.props.history.goBack();
    }

    continuebuttonHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(<div>
            <CheckoutSummary ingredients={this.props.ings}
            cancelButton={this.cancelbuttonHandler}
            continueButton={this.continuebuttonHandler}/>
            <Route 
            path={this.props.match.path + '/contact-data'} 
            component={ContactData}
            /> 
        </div>)
    }
}

const mapStateToProps = state =>{
    return { ings : state.ingredients}
}

export default connect(mapStateToProps)(Checkout);