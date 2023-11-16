export const selectUserInfo = (store) => store.userInfo

export const selectCommonMatches = (store) =>
  store.commonMatchesStates.commonMatches

export const selectCurrentPlayersId = (store) =>
  store.commonMatchesStates.currentPlayersId

export const selectNicknameOneError = (store) =>
  store.commonMatchesStates.nicknameOneError

export const selectNicknameTwoError = (store) =>
  store.commonMatchesStates.nicknameTwoError

export const selectIsPreloaderActive = (store) =>
  store.commonMatchesStates.isPreloaderActive

export const selectNoCommonMatches = (store) =>
  store.commonMatchesStates.noCommonMatches
