import { applyMiddleware, bindActionCreators, createStore } from 'redux'
import reducer from './reducer'
import * as actions from './actions'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  userInfo: localUserInfo,
  currentPlayersId: {},
  commonMatchesStates: {
    commonMatches: [],
    nicknameOneError: '',
    nicknameTwoError: '',
    isPreloaderActive: false,
    noCommonMatches: false,
  },
}

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export const {
  setUserInfo: setUserInfoDispatch,
  setCommonMatches: setCommonMatchesDispatch,
  setCurrentPlayersId: setCurrentPlayersIdDispatch,
  setNicknameOneError: setNicknameOneErrorDispatch,
  setNicknameTwoError: setNicknameTwoErrorDispatch,
  setIsPreloaderActive: setIsPreloaderActiveDispatch,
  setNoCommonMatches: setNoCommonMatchesDispatch,
} = bindActionCreators(actions, store.dispatch)
