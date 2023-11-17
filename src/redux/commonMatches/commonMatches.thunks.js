import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  setCommonMatches,
  setCurrentPlayersId,
  setIsCommonMatchesPreloaderActive,
  setNicknameOneError,
  setNicknameTwoError,
  setNoCommonMatches,
} from './commonMatches.slice'
import { getCrossings, getId } from './commonMatches.utils'

export const setCommonMatchesAsync = createAsyncThunk(
  'commonMatches/setCommonMatchesAsync',
  async ({ nicknameOne, nicknameTwo }, { dispatch }) => {
    try {
      const playerId1 = await getId(nicknameOne, setNicknameOneError)
      const playerId2 = await getId(nicknameTwo, setNicknameTwoError)

      if (!playerId1 || !playerId2) {
        throw new Error('Игроки не найдены')
      }

      const currentPlayers = {
        playerOne: { nickname: nicknameOne, id: playerId1 },
        playerTwo: { nickname: nicknameTwo, id: playerId2 },
      }

      const uniqueCommonMatches = await getCrossings(currentPlayers)

      if (!uniqueCommonMatches.length) {
        dispatch(setNoCommonMatches(true))
      } else {
        dispatch(setCommonMatches(uniqueCommonMatches))
      }

      dispatch(setCurrentPlayersId(currentPlayers))
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(setIsCommonMatchesPreloaderActive(false))
    }
  }
)
