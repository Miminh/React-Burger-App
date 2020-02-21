import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    let ingredients = [];

    for(let iname in props.ingredients){
        ingredients.push({
            name : iname,
            amount : props.ingredients[iname]
        })
    }

    let iOutput = ingredients.map(ig => {
        return(<span key={ig.name}
        style={{
            display:'inline-block',
            margin : '0 8px',
            border : '1px solid #ccc'
        }}>{ig.name} ({ig.amount})</span>)
    });

    return <div className={classes.Order}>
        <p>Ingredients : {iOutput}</p>
        <p>Price : <strong>INR {props.price}</strong></p>
    </div>
}

export default Order;