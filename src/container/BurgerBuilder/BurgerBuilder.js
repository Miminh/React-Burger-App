import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuilderControls/BuilderControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE = {
    meat:1.3,
    bacon:0.7,
    salad:0.5,
    cheese:0.6
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state =
    // }

    state = {
        ingredients : {
            bacon : 0,
            cheese : 0,
            salad : 0,
            meat : 0
        },
        totalPrice :4.0,
        purchasable : false,
        purchasing : false
    }

    updatePurchasableState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum+el;
        },0);

        this.setState({
            purchasable:sum>0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]  = oldCount + 1;
        const addedPrice = INGREDIENTS_PRICE[type];
        const newPrice = this.state.totalPrice + addedPrice;
        this.setState(
            {totalPrice:newPrice, ingredients:updatedIngredients}
        );
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        if(oldCount <= 0){
            return;
        }
        updatedIngredients[type]  = oldCount - 1;
        const addedPrice = INGREDIENTS_PRICE[type];
        const newPrice = this.state.totalPrice -addedPrice;
        this.setState(
            {totalPrice:newPrice, ingredients:updatedIngredients}
        );
        this.updatePurchasableState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () =>{
        alert('You Continued');
    }

    render ()  {
        const disabledInfo ={...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} 
                backdropClicked={this.purchaseCancelHandler}
                purchaseCancel ={this.purchaseCancelHandler}
                purchaseContinue = {this.purchaseContinueHandler}>
                    <OrderSummary ingredients= {this.state.ingredients}
                    price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls 
                addedIngredient = {this.addIngredientHandler}
                removedIngredient = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.updatePurchasableState}
                ordered = {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;