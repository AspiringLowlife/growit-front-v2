import { cloneDeep } from 'lodash';
import axios from 'axios';

//Action Types Here
export const NEW_ITEM_ADDED = 'NEW_ITEM_ADDED';
export const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';

//Intial State Here
const initState = {
    cart: [],
 }


//Reducer State Logic Here
export default (state = initState, action) =>{
    switch (action.type) {
            case NEW_ITEM_ADDED:
                state = cloneDeep(state);
                state.cart.push(action.payload.product);
                return state;
            case DELETE_ITEM_FROM_CART:
                state = cloneDeep(state);
                state.cart.pop(action.payload.product);
                return state;
      default:
          return state;
    }
};

//Action Creators Here

export const actionAddProductToCart = product => ({
    type: NEW_ITEM_ADDED,
    payload: {product},
});

export const actionDeleteItemFromCart = product => ({
    type: DELETE_ITEM_FROM_CART,
    payload: {product},
});



export const thunkAddItemToCart = (product) => (dispatch, getState) =>{ 
    dispatch(actionAddProductToCart(product));
   // You can aslo dispatch to this and do extra logic and fire off actions like this 
   //possibly fire off even more actions
}

