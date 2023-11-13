import { bindActionCreators, createStore } from 'redux'
import reducer from './reducer'
import * as actions from './actions'

const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  userInfo: localUserInfo,
}

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const { setUserInfoDispatch } = bindActionCreators(
  actions,
  store.dispatch
)
