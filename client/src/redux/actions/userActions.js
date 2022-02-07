import * as actionTypes from '../constants/userConstants'
import axios from 'axios'
import Cookies from 'js-cookie'

export const getUser = () => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_USER_REQUST})

        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
        };

        const {data} = await axios.get("/api/private", config)
        console.log(data)
        dispatch({type: actionTypes.GET_USER_SUCCESS, payload: data.data})
        
    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER_FAIL, 
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}

export const removeUser = () => (dispatch) => {
    Cookies.remove("authToken")
    dispatch({type: actionTypes.GET_USER_RESET})
}