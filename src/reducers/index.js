import { combineReducers } from "redux";
import reducerCart from "./reducerCart/reducerCart";
import reducerLogin from "./reducerLogin/reducerLogin";

const reducers = combineReducers({
    reducerCart,
    reducerLogin,
});

export default reducers;
