import * as actionTypes from '../constants/sportsConstants'

export const sportsReducer = (state = {sportsItem: []}, action) => {
    switch (action.type) {
        case actionTypes.GET_SPORTS_REQUST:
            return {
                loading: true
            }

        case actionTypes.GET_SPORTS_SUCCESS:
            return {
                loading: false,
                sportsItem: action.payload
            }

        case actionTypes.GET_SPORTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}