import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

import styles from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component{
    state = {
        controls : {
            email : {
                elementType:'input',
                elementConfig: {
                    type : 'email',
                    placeholder : 'Email',
                    },
                    value : '',
                    validation : {
                        required : true,
                        isEmail : true
                    },
                    valid : false,
                    touched : false
            },
            password : {
                elementType:'input',
                elementConfig: {
                    type : 'password',
                    placeholder : 'Password',
                    },
                    value : '',
                    validation : {
                        required : true,
                        minLength : 6
                    },
                    valid : false,
                    touched : false
            }
        },
        isSignUp : true
    }

    checkIfValid(value, element){
        let isValid = true;
        if(element.required)
            isValid = value.trim() !== '' && isValid;
        
        if(element.minLength)
            isValid = (value.length >= element.minLength) && isValid;
            
        if(element.maxLength)
            isValid = (value.length <=element.maxLength) && isValid;

        if(element.isEmail){
            const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }


    inputChangeHandler =(event, controlName)=> {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkIfValid(event.target.value, this.state.controls[controlName].validation),
                touched : true
            } 
        }
        this.setState({controls : updatedControls});
    }

    onSubmitHandler =(event) =>  {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    onSwitchHandler = () =>{
        this.setState( prevState => {
            return {isSignUp : !prevState.isSignUp}
        });
    }

    componentDidMount(){
        if(this.props.ingredients!=null){
            this.props.onRedirect(this.props.ingredients);
        }
    }
    render(){
        let formData = [];
        for(let key in this.state.controls){
            formData.push({
                id:key,
                config : this.state.controls[key]
            });
        }

        let errorMessage = null;

        if(this.props.error){
        errorMessage = <p>{this.props.error.message}</p>
        }

        let form = formData.map( formElement =>{
            return <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed ={(event) => this.inputChangeHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    notFirst={formElement.config.touched}
                    necessary={formElement.config.validation}/>
        })

        let redirect = null;
        if(this.props.isAuthenticated){
            redirect = <Redirect to={this.props.authRedirect}/>
        }

        if(this.props.loading){
            form = <Spinner/>
        }

        return <div className={styles.Auth}>
            <form onSubmit={this.onSubmitHandler}>
                {redirect}
                {errorMessage}
                {form}
                <Button btnType= "Success">Submit</Button>
                </form>
            <Button btnType = "Danger" clicked={this.onSwitchHandler}>Switch to {this.state.isSignUp? "Sign In" : "Sign Up"}</Button>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token != null,
        authRedirect : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onAuth : (email, password, isSignUp) =>{dispatch(actions.auth(email, password, isSignUp))},
        onRedirect : () => { dispatch(actions.authRedirect())}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
