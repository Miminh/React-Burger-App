import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
            <NavigationItems/>
            </nav>
        </header>
    );
}

export default toolbar;