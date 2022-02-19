import * as actionTypes from '../constants/clubsConstants'

export const clubsReducer = (state = {clubsItem: []}, action) => {
    switch (action.type) {
        case actionTypes.GET_CLUBS_REQUST:
            return {
                loading: true
            }

        case actionTypes.GET_CLUBS_SUCCESS:
            return {
                loading: false,
                clubsItem: action.payload
            }

        case actionTypes.GET_CLUBS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case actionTypes.GET_CLUBS_RESET:
            return {
                clubsItem: []
            }

        default:
            return state
    }
}