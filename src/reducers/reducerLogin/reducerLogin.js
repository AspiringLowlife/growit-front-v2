import { cloneDeep } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosService from '../../API/AxiosService';

//Action Types Here
export const LOGIN = 'LOGIN';

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
            state.username = action.payload.data.username
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

export const thunkLogin = (data) => (dispatch, getState) => {
    debugger
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