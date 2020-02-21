import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './checkoutsummary.css';

const checkoutsummary = (props) =>{
    return <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes good</h1>
        <div style = {{width : '100%', margin : 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <div>
            <Button btnType="Danger" clicked={props.cancelButton}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueButton}>CONTINUE</Button>
        </div>
    </div>
}

export default checkoutsummary;