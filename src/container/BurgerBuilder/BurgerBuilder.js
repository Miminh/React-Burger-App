import React, {Component} from 'react';
import Aux from '../../hoc/Hoc/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../order-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';
import {connect} from 'react-redux';



class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state =
    // }

    state = {
        purchasing : false,
        
    }

    componentDidMount(){
        this.props.onFetchIngredients();
    }

    updatePurchasableState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum+el;
        },0);
        return sum>0;
    }

    
    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
            this.setState({purchasing : true});
        }
        else{
            this.props.redirectAuth();
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () =>{
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render ()  { 
        console.log(this.props.ings);
        const disabledInfo ={...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        let orderSummary = null;

        let burger = <Spinner/>

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                <BuilderControls 
                isAuth = {this.props.isAuthenticated}
                addedIngredient = {this.props.onAddIngredients}
                removedIngredient = {this.props.onRemoveIngredients}
                disabled = {disabledInfo}
                price = {this.props.price}
                purchasable = {this.updatePurchasableState(this.props.ings)}
                ordered = {this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = (<OrderSummary 
                ingredients= {this.props.ings}
                price={this.props.price}
                purchaseCancel ={this.purchaseCancelHandler}
                purchaseContinue = {this.purchaseContinueHandler}/>);
        }
           
        return (
            <Aux>
                <Modal show={this.state.purchasing} 
                backdropClicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {this.props.error? this.props.error.message : burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token!=null
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onAddIngredients : (ingName) => dispatch(actionCreator.addIngredient(ingName)),
        onRemoveIngredients : (ingName) => dispatch(actionCreator.removeIngredient(ingName)),
        onFetchIngredients : ()=>dispatch(actionCreator.fetchIngredients()),
        onPurchaseInit : () => dispatch(actionCreator.purchaseInit()),
        redirectAuth : ()=> dispatch(actionCreator.authRedirect())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));