import propertyReducer from './slice/propslice'
import { combineReducers } from 'redux'
import userReducer from './slice/userslice'

const rootreducer = combineReducers({
    propertyReducer,
    userReducer
})

export default rootreducer;