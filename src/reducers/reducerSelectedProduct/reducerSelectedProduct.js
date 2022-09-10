import { cloneDeep } from 'lodash';

//Action Types Here
export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';

//Intial State Here
const initState = {
    product: {
        
    },
}

//Reducer State Logic Here
export default (state = initState, action) => {
    switch (action.type) {
        case SET_SELECTED_PRODUCT:
            state = cloneDeep(state);
            state.product = action.payload.product;
            return state;
        default:
            return state;
    }
};

//Action Creators Here

export const actionSetSelectedProduct = product => ({
    type: SET_SELECTED_PRODUCT,
    payload: { product },
});

