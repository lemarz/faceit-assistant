import { combineReducers } from 'redux'
import { authorizationReducer } from './authorization/authorization.slice'

const rootReducer = combineReducers({
  authorization: authorizationReducer,
})

export default rootReducer
