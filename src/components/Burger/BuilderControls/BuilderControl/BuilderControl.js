import React from 'react';
import classes from './BuilderControl.css'

const builderControl = (props)=> (
    <div 
    className={classes.BuilderControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled ={props.disable}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
);

export default builderControl;