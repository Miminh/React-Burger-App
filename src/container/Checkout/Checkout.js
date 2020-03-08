import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutsummary';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <h1>Nothing Here</h1>;
        if(this.props.ings != null){
            const purchaseSuccess = this.props.purchased? <Redirect to="/"/> : null;
            summary  = (
            <div>
                {purchaseSuccess}
                <CheckoutSummary ingredients={this.props.ings}
                cancelButton={this.cancelbuttonHandler}
                continueButton={this.continuebuttonHandler}/>
                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}
                /> 
            </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state =>{
    return { 
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);