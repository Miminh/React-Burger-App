import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './contactdata.css';
import axios from '../../../order-instance';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        customer : {
            name : {
                elementType:'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Name',
                    },
                    value : ' ',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
            },
            street : {
                elementType:'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Street Name',
                    },
                    value : ' ',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
            },
            city  : {
                elementType:'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'City Name',
                    },
                    value : ' ',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
            },
            zipCode : {
                elementType:'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Zip Code',
                    },
                    value : ' ',
                    validation : {
                        required : true,
                        minLength :5,
                        maxLength : 5
                    },
                    valid : false,
                    touched : false
            },
            country : {
                elementType:'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Country',
                    },
                    value : ' ',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
            },
            email : {
                elementType:'input',
                elementConfig: {
                    type : 'email',
                    placeholder : 'E-Mail',
                    },
                    value : ' ',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
            },
            delivery : {
                elementType:'select',
                elementConfig: {
                    options :[
                        {value : 'fastest', displayValue : 'Fastest'},
                        {value : 'cheapest', displayValue : 'Cheapest'}
                    ]
                    },
                    value : ' ',
                    validation : {},
                    valid : true
            }
        },
        formIsValid: false,
        loading :false
    }
    
    checkIfValid(value, element){
        let isValid = true;
        if(element.required)
            isValid = value.trim() !== '' && isValid;
        
        if(element.minLength)
            isValid = (value.length >= element.minLength) && isValid;
            
        if(element.maxLength)
            isValid = (value.length <=element.maxLength) && isValid;

        return isValid;
    }

    onOrder = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        let customerData = {};
        for(let identifier in this.state.customer){
            customerData[identifier] = this.state.customer[identifier].value;
        }
        const order = {
            ingredients : {...this.props.ings},
            price : this.props.price,
            customer : customerData
        }
        console.log(order);
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading : false});
                console.log(this.props);
                this.props.history.push('/');
            }).catch(error => {
                this.setState({loading : false})
            });
    }

    inputChangeHandler(event, inputElement){
        const updatedForm = {...this.state.customer};
        const updatedElement = {...this.state.customer[inputElement]};
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkIfValid(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[inputElement] = updatedElement;
        let isValid = true;
        for(let element in updatedForm){
            isValid = updatedForm[element].valid && isValid;
        }
        this.setState({customer : updatedForm, formIsValid : isValid});
        console.log(this.state.customer);
    }

    render(){
        let formData = [];
        for(let key in this.state.customer){
            formData.push({
                id:key,
                config : this.state.customer[key]
            });
        }

        return(
            <div className={classes.ContactForm}>
                <form onSubmit={this.onOrder}>
                    <h3>Enter your Contact details</h3>
                    {formData.map((data)=>{
                        return <Input key={data.id} 
                        elementType={data.config.elementType} 
                        elementConfig={data.config.elementConfig}
                        value={data.config.value}
                        changed ={(event) => this.inputChangeHandler(event, data.id)}
                        invalid={!data.config.valid}
                        notFirst={data.config.touched}
                        necessary={data.config.validation}
                        />
                    })}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { ings : state.ingredients,
             price : state.totalPrice};
}

export default connect(mapStateToProps)(ContactData);