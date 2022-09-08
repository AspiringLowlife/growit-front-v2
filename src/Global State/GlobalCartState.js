import { cloneDeep } from "lodash";

export const initialCartItems = []
export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM_TO_CART":
            state = cloneDeep(state)
            state.push(action.payload)
            return state
    }

}