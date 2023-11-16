import { api } from '../utils/Api'
import { setIsPreloaderActiveDispatch } from './store'

export const getId = async (nickname, dispatchCallback) => {
  try {
    return await api.getPlayerId(nickname)
  } catch (err) {
    dispatchCallback('Игрок не найден. Проверьте ник.')
    setIsPreloaderActiveDispatch(false)
    console.error(err)
    new Error(`Игрок ${nickname} не найден.`)
  }
}

export const getMatches = async (id) => {
  try {
    return api.getAllPlayerMatches(id)
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

export const getCrossings = (matchesArr, targetId) =>
  matchesArr.filter((match) =>
    match.playing_players.some((id) => id === targetId)
  )

export const getCrossingsV2 = async ({ playerOne, playerTwo }) => {
  const matchesArr1 = await getMatches(playerOne.id)
  const matchesArr2 = await getMatches(playerTwo.id)

  const crossingArr1 = matchesArr1.filter((match) =>
    match.playing_players.some((id) => id === playerTwo.id)
  )

  const crossingArr2 = matchesArr2.filter((match) =>
    match.playing_players.some((id) => id === playerOne.id)
  )

  const allMatchesArr = [...crossingArr1, ...crossingArr2]

  return allMatchesArr.filter(
    (match, index, arr) =>
      arr.findIndex((item) => item.match_id === match.match_id) === index
  )
}
