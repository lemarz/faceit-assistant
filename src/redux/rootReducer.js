import { combineReducers } from 'redux'

import userInfoReducer from '../redux/userInfo/userInfo.slice'

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
})

export default rootReducer
