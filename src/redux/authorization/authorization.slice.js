import { createSlice } from '@reduxjs/toolkit'

const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  userInfo: localUserInfo,
  isAuth: false,
  isAuthorizationPreloaderActive: false,
  isAuthorizationConfirmModalOpen: false,
}

export const slice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
    setIsAuth: (state, { payload }) => {
      state.isAuth = payload
    },
    setIsAuthorizationPreloaderActive: (state, { payload }) => {
      state.isAuthorizationPreloaderActive = payload
    },
    setIsAuthorizationConfirmModalOpen: (state, { payload }) => {
      state.isAuthorizationConfirmModalOpen = payload
    },
  },
})

export const { reducer: authorizationReducer } = slice

export const {
  setUserInfo,
  setIsAuth,
  setIsAuthorizationPreloaderActive,
  setIsAuthorizationConfirmModalOpen,
} = slice.actions
