import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
        this.props.resetOrder();
    }
    
    render(){
        return (<Redirect to="/"/>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.authLogoutHelper()),
        resetOrder : () => dispatch(actions.resetOrder())
    }
}

export default connect(null, mapDispatchToProps)(Logout);