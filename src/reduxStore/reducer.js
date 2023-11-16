const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload }
    case 'SET_COMMON_MATCHES':
      return { ...state, commonMatches: action.payload }
    case 'SET_CURRENT_PLAYERS_ID':
      return { ...state, currentPlayersId: action.payload }
    default:
      return state
  }
}

export default reducer
