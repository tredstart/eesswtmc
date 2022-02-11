import * as actionTypes from '../constants/clubsConstants'

export const clubsReducer = (state = {clubsItem: []}, action) => {
    switch (action.type) {
        case actionTypes.GET_CLUBS_REQUST:
            return {
                clubsLoading: true
            }

        case actionTypes.GET_CLUBS_SUCCESS:
            return {
                clubsLoading: false,
                clubsItem: action.payload
            }

        case actionTypes.GET_CLUBS_FAIL:
            return {
                clubsLoading: false,
                clubsError: action.payload
            }

        case actionTypes.GET_CLUBS_RESET:
            return {
                clubsItem: []
            }

        default:
            return state
    }
}