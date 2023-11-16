const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload }

    case 'SET_CURRENT_PLAYERS_ID':
      return { ...state, currentPlayersId: action.payload }

    case 'SET_COMMON_MATCHES':
      return {
        ...state,
        commonMatchesStates: {
          ...state.commonMatchesStates,
          commonMatches: action.payload,
        },
      }

    case 'SET_NICKNAME_ONE_ERROR':
      return {
        ...state,
        commonMatchesStates: {
          ...state.commonMatchesStates,
          nicknameOneError: action.payload,
        },
      }

    case 'SET_NICKNAME_TWO_ERROR':
      return {
        ...state,
        commonMatchesStates: {
          ...state.commonMatchesStates,
          nicknameTwoError: action.payload,
        },
      }

    case 'SET_IS_PRELOADER_ACTIVE':
      return {
        ...state,
        commonMatchesStates: {
          ...state.commonMatchesStates,
          isPreloaderActive: action.payload,
        },
      }

    case 'SET_NO_COMMON_MATCHES':
      return {
        ...state,
        commonMatchesStates: {
          ...state.commonMatchesStates,
          noCommonMatches: action.payload,
        },
      }

    default:
      return state
  }
}

export default reducer
