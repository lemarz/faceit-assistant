export const selectCurrentPlayersId = ({ commonMatches }) =>
  commonMatches.currentPlayersId

export const selectCommonMatches = ({ commonMatches }) =>
  commonMatches.commonMatches

export const selectNoCommonMatches = ({ commonMatches }) =>
  commonMatches.noCommonMatches

export const selectNicknameOneError = ({ commonMatches }) =>
  commonMatches.nicknameOneError

export const selectNicknameTwoError = ({ commonMatches }) =>
  commonMatches.nicknameTwoError

export const selectIsCommonMatchesPreloaderActive = ({ commonMatches }) =>
  commonMatches.isPreloaderActive
