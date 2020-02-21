import React,{useEffect} from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {
    useEffect(()=>{console.log("[Bacdrop] rendered")});
    return (props.show? <div className={classes.Backdrop} onClick = {props.clicked}></div> : null
    );}


export default backdrop;