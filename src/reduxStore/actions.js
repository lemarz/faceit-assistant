export const setUserInfo = (userInfo) => ({
  type: 'SET_USER_INFO',
  payload: userInfo,
})

export const setCommonMatches = (matches) => ({
  type: 'SET_COMMON_MATCHES',
  payload: matches,
})

export const setCurrentPlayersId = (ids) => ({
  type: 'SET_CURRENT_PLAYERS_ID',
  payload: ids,
})

export const setNicknameOneError = (err) => ({
  type: 'SET_NICKNAME_ONE_ERROR',
  payload: err,
})

export const setNicknameTwoError = (err) => ({
  type: 'SET_NICKNAME_TWO_ERROR',
  payload: err,
})

export const setIsPreloaderActive = (isActive) => ({
  type: 'SET_IS_PRELOADER_ACTIVE',
  payload: isActive,
})

export const setNoCommonMatches = (isNoCommonMatches) => ({
  type: 'SET_NO_COMMON_MATCHES',
  payload: isNoCommonMatches,
})
