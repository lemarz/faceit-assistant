import {
  setNicknameOneErrorDispatch,
  setNicknameTwoErrorDispatch,
} from './store'
import { getCrossingsV2, getId } from './utils'
import {
  setCommonMatches,
  setCurrentPlayersId,
  setIsPreloaderActive,
  setNoCommonMatches,
} from './actions'

export const setCommonMatchesThunk =
  (nicknameOne, nicknameTwo) => async (dispatch) => {
    try {
      const playerId1 = await getId(nicknameOne, setNicknameOneErrorDispatch)
      const playerId2 = await getId(nicknameTwo, setNicknameTwoErrorDispatch)

      if (!playerId1 || !playerId2) {
        throw new Error('Игроки не найдены')
      }

      const currentPlayers = {
        playerOne: { nickname: nicknameOne, id: playerId1 },
        playerTwo: { nickname: nicknameTwo, id: playerId2 },
      }
      dispatch(setCurrentPlayersId(currentPlayers))

      const uniqueCommonMatches = await getCrossingsV2(currentPlayers)

      if (!uniqueCommonMatches.length) {
        dispatch(setNoCommonMatches(true))
      } else {
        dispatch(setCommonMatches(uniqueCommonMatches))
      }
      dispatch(setIsPreloaderActive(false))
    } catch (err) {
      console.error(err)
      dispatch(setIsPreloaderActive(false))
    }
  }
