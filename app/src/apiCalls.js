import axios from "axios";
import {API_URL} from "./config"

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try{
        const res = await axios.post(`${API_URL}/auth/login`, userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({type: "LOGIN_FAILURE", payload: err });
    }
}

export const logoutCall = async (dispatch) => {
    dispatch ({type: "LOGOUT"});
}

