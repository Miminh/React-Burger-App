import React, {Component} from 'react';
import Aux from '../../hoc/Hoc/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../order-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/action';
import {connect} from 'react-redux';



class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state =
    // }

    state = {
        purchasing : false,
        loading : false,
        error : null
    }

    componentDidMount(){
        // axios.get('https://reac-mimin-2-burger.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients : response.data});
        //     }).catch((error) =>{
        //         this.setState({error : error})
        //     });
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
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () =>{
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
           
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} 
                backdropClicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {this.state.error? this.state.error.message : burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {ings : state.ingredients,
            price : state.totalPrice};
}

const mapDispatchToProps = dispatch =>{
    return {
        onAddIngredients : (ingName) => dispatch({type : actionTypes.ADD_INGREDIENT, ingredientName : ingName }),
        onRemoveIngredients : (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENT, ingredientName : ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));