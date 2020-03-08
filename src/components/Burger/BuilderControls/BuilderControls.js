import React from 'react';
import BuilderControl from './BuilderControl/BuilderControl'
import classes from './BuilderControls.css'

const controls = [
    {label : 'Meat', type : 'meat'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Salad', type: 'salad'}
]

const builderControls = (props) => (
    <div className={classes.BuilderControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrls => (
            <BuilderControl 
                key={ctrls.type} 
                label={ctrls.label}
                added={() => props.addedIngredient(ctrls.type)}
                removed={() => props.removedIngredient(ctrls.type)}
                disable = {props.disabled[ctrls.type]}/>
        ))}
        <button className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered} >{props.isAuth?"ORDER NOW" : "SIGN UP TO ORDER"}</button>
    </div>
);

export default builderControls;