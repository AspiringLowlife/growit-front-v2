import { cloneDeep } from 'lodash';
import { toast } from 'react-toastify';
import AxiosService from '../../API/AxiosService';

//Action Types Here
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

//Intial State Here
const initState = {
    username: "",
    role: "",
    token: "",
    expiration: ""
}

//Reducer State Logic Here
export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            state = cloneDeep(state);
            // state.username = action.payload.data.username
            // state.role=action.payload.data.role
            state = action.payload.data
            return state;
        case LOGOUT:
            state = cloneDeep(state);
            debugger
            state = {
                username: "",
                role: "",
                token: "",
                expiration: ""
            }
            return state;
        default:
            return state;
    }
};

//Action Creators Here

export const actionLogin = data => ({
    type: LOGIN,
    payload: { data },
});

export const actionLogOut = () => ({
    type: LOGOUT,
});

export const thunkLogin = (data) => (dispatch, getState) => {
    AxiosService.login(data)
        .then(function (response) {
            localStorage.setItem("token", response.data.token)
            toast.success(data.username + " has signed in")
            dispatch(actionLogin(response.data));
        })
        .catch(function (error) {
            toast.error("Incorrect Username or password")
        })
}

    // You can aslo dispatch to this and do extra logic and fire off actions like this
    //possibly fire off even more actions

