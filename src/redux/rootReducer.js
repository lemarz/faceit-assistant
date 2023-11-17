import { combineReducers } from 'redux'
import { authorizationReducer } from './authorization/authorization.slice'
import { commonMatchesReducer } from './commonMatches/commonMatches.slice'

const rootReducer = combineReducers({
  authorization: authorizationReducer,
  commonMatches: commonMatchesReducer,
})

export default rootReducer
