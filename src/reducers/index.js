import { combineReducers } from "redux";
import reducerCart from "./reducerCart/reducerCart";
import reducerLogin from "./reducerLogin/reducerLogin";
import reducerSelectedProduct from "./reducerSelectedProduct/reducerSelectedProduct";

const reducers = combineReducers({
    reducerCart,
    reducerLogin,
    reducerSelectedProduct,
});

export default reducers;
