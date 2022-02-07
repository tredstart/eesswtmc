import * as actionTypes from '../constants/userConstants'

export const userReducer = (state = {userItem: {}}, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_REQUST:
            return {
                isAuth: false,
                loading: true
            }

        case actionTypes.GET_USER_SUCCESS:
            return {
                loading: false,
                isAuth: true,
                userItem: action.payload
            }

        case actionTypes.GET_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case actionTypes.GET_USER_RESET:
            return {
                isAuth: false,
                userItem: {}
            }
        
        default:
            return state
    }
}