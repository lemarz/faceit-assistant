export const selectUserInfo = ({ authorization }) => authorization.userInfo

export const selectIsAuth = ({ authorization }) => authorization.isAuth

export const selectIsAuthorizationPreloaderActive = ({ authorization }) =>
  authorization.isAuthorizationPreloaderActive

export const selectIsAuthorizationConfirmModalOpen = ({ authorization }) =>
  authorization.isAuthorizationConfirmModalOpen
