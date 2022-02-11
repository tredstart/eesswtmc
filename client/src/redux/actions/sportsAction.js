import * as actionTypes from '../constants/sportsConstants'
import axios from 'axios';

export const getSports = () => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_SPORTS_REQUST})

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const {data} = await axios.get("/api/sports/", config)

        dispatch({type: actionTypes.GET_SPORTS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: actionTypes.GET_SPORTS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}