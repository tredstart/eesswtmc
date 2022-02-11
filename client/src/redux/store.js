import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import {userReducer} from './reducers/userReducer'
import {clubsReducer} from './reducers/clubsReducer'
import {sportsReducer} from './reducers/sportsReducer'

const reducer = combineReducers({
    user: userReducer,
    clubs: clubsReducer,
    sports: sportsReducer
})

const middleware = [thunk]

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store