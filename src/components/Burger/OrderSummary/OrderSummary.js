import React from 'react';
import Aux from '../../../hoc/Auxillary';



const orderSummary = (props) => {
    const orderDetails = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}>{igKey} : {props.ingredients[igKey]}</li>;
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>A delicious burger with the following ingredients :</p>
            {orderDetails}
        </Aux>
    );
}

export default orderSummary;