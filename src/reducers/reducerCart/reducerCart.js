import { cloneDeep } from 'lodash';
import axios from 'axios';

//Action Types Here
export const NEW_ITEM_ADDED = 'NEW_ITEM_ADDED';
export const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

//Intial State Here
const initState = {
    cart: [],
}

//Reducer State Logic Here
export default (state = initState, action) => {
    switch (action.type) {
        case NEW_ITEM_ADDED:
            state = cloneDeep(state);
            let foundItem = state.cart.filter(item => item.itemID === action.payload.product.itemID)
            if (foundItem.length > 0) {
                let newCart = cloneDeep(state.cart.filter(product => product.itemID !== foundItem[0].itemID))
                foundItem[0].Quantity = foundItem[0].Quantity + 1
                newCart.push(foundItem[0])
                state.cart = newCart
            }
            else {
                state.cart.push(action.payload.product);
            }
            return state;
        case DELETE_ITEM_FROM_CART:
            debugger
            state = cloneDeep(state);
            let newCart = state.cart.filter(product => product.itemID !== action.payload.product.itemID)
            state.cart = newCart
            return state;
        case CLEAR_CART:
            state = cloneDeep(state);
            state.cart = [];
            return state;
        case UPDATE_ITEM_QUANTITY:
            state = cloneDeep(state);
            let foundItem1 = state.cart.filter(item => item.itemID === action.payload.product.itemID)
            if (foundItem1.length > 0) {
                let newCart = cloneDeep(state.cart.filter(product => product.itemID !== foundItem1[0].itemID))
                foundItem1[0].Quantity = foundItem1[0].Quantity - 1
               
                debugger
                if (!foundItem1[0].Quantity === 0) {
                    newCart.push(foundItem1[0])
                } 
            }
            else {
                state.cart.push(action.payload.product);
            }
            return state;
        default:
            return state;
    }
};

//Action Creators Here

export const actionAddProductToCart = product => ({
    type: NEW_ITEM_ADDED,
    payload: { product },
});

export const actionDeleteItemFromCart = product => ({
    type: DELETE_ITEM_FROM_CART,
    payload: { product },
});

export const actionClearCart = () => ({
    type: CLEAR_CART,
});

export const actionUpdateQuantity = product => ({
    type: UPDATE_ITEM_QUANTITY,
    payload: { product },
});

export const thunkAddItemToCart = (product) => (dispatch, getState) => {
    dispatch(actionAddProductToCart(product));
    // You can aslo dispatch to this and do extra logic and fire off actions like this 
    //possibly fire off even more actions
}
