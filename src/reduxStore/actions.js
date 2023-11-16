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
