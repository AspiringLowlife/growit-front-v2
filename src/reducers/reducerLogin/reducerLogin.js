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

export const thunkLogin = (data) => async (dispatch, getState) => {
    debugger
    const navigate = useNavigate()
    try {
        const response = await AxiosService.login(data)
        localStorage.setItem("token", response.data.token)
        navigate("/")
        //notification of success
        toast.success(data.username + " has signed in")
        dispatch(actionLogin(response.data));
    }
    catch (e) {
        toast.error("Incorrect Username or password")
    }

    // You can aslo dispatch to this and do extra logic and fire off actions like this 
    //possibly fire off even more actions
}
