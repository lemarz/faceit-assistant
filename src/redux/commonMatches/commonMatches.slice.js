import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPlayersId: {},
  commonMatches: [],
  noCommonMatches: false,
  nicknameOneError: '',
  nicknameTwoError: '',
  isPreloaderActive: false,
}

export const slice = createSlice({
  name: 'commonMatches',
  initialState,
  reducers: {
    setCurrentPlayersId: (state, { payload }) => {
      state.currentPlayersId = payload
    },

    setCommonMatches: (state, { payload }) => {
      state.commonMatches = payload
    },

    setNoCommonMatches: (state, { payload }) => {
      state.noCommonMatches = payload
    },

    setNicknameOneError: (state, { payload }) => {
      state.nicknameOneError = payload
    },

    setNicknameTwoError: (state, { payload }) => {
      state.nicknameTwoError = payload
    },

    setIsCommonMatchesPreloaderActive: (state, { payload }) => {
      state.isPreloaderActive = payload
    },
  },
})

export const { reducer: commonMatchesReducer } = slice

export const {
  setCurrentPlayersId,
  setCommonMatches,
  setNoCommonMatches,
  setNicknameOneError,
  setNicknameTwoError,
  setIsCommonMatchesPreloaderActive,
} = slice.actions
