import React from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxillary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../Button/Button'

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show = {props.show} clicked = {props.backdropClicked}/>
        <div className = {classes.Modal}
        style = {
            {
                transform : props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity : props.show? '1' : '0'
            }
        }>
            {props.children}
            <Button clicked={props.purchaseCancel} btnType='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType='Success'>Continue</Button>
        </div>
        </Aux>
    );
}

export default modal;