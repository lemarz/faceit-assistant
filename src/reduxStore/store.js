import { bindActionCreators, createStore } from 'redux'
import reducer from './reducer'
import * as actions from './actions'
import { composeWithDevTools } from '@redux-devtools/extension'

const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  userInfo: localUserInfo,
  commonMatches: null,
  currentPlayersId: null,
}

export const store = createStore(reducer, initialState, composeWithDevTools())

export const {
  setUserInfo: setUserInfoDispatch,
  setCommonMatches: setCommonMatchesDispatch,
  setCurrentPlayersId: setCurrentPlayersIdDispatch,
} = bindActionCreators(actions, store.dispatch)
