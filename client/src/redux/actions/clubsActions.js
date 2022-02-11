import * as actionTypes from '../constants/clubsConstants'
import axios from 'axios'

export const getClubs = (sport) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_CLUBS_REQUST})

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const {data} = await axios.get(`/api/pick-club?sport=${sport}`, config)

        dispatch({type: actionTypes.GET_CLUBS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: actionTypes.GET_CLUBS_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}

export const resetClubs = () => async (dispatch) => {
    dispatch({type: actionTypes.GET_CLUBS_RESET})
}