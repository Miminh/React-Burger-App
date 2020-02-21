import React from 'react';
import Aux from '../../../hoc/Hoc/Auxillary';
import Button  from '../../UI/Button/Button'



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
            <Button clicked={props.purchaseCancel} btnType='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType='Success'>Continue</Button>
        </Aux>
    );
}

export default orderSummary;